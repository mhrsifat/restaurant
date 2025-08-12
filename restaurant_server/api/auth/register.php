<?php 
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once("../../config/Database.php");

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));


// Now we check if the data was submitted, isset() function will check if the data exists.
if (!isset($data->email, $data->password, $data->confirmPassword, $data->fullname, $data->phone)) {
	// Could not get the data that should have been sent.
	exit('Please complete the registration form!');
}

$email = trim($data->email);
$password = trim($data->password);
$confirmPassword = trim($data->confirmPassword);
$fullname = trim($data->fullname);
$phone = trim($data->phone);

// Make sure the submitted registration values are not empty.
if (empty($email) || empty($password) || empty($confirmPassword) || empty($fullname) || empty($phone)) {
	// One or more values are empty.
	exit('Please complete the registration form');
}

// Validation

// Email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	exit('Email is not valid!');
}

// Password
if (strlen($password) > 20 || strlen($password) < 5) {
	exit('Password must be between 5 and 20 characters long!');
}

if ($password != $confirmPassword) {
	exit('Password do not match!');
}

// Full name
if (strlen($fullname) > 20 || strlen($fullname) < 5) {
	exit('Full name must be between 5 and 20 characters long!');
}

// Phone
if(preg_match('/^[0-9]{10}+$/', $phone) == 0) {
    exit('Invalid phone number');
}

// We need to check if the account with that username exists.
if ($stmt = $con->prepare('SELECT user_id, password FROM user WHERE email = ?')) {
	// Bind parameters (s = string, i = int, b = blob, etc), hash the password using the PHP password_hash function.
	$stmt->bind_param('s', $email);
	$stmt->execute();
	$stmt->store_result();
	// Store the result so we can check if the account exists in the database.
	if ($stmt->num_rows > 0) {
		// Username already exists
		echo 'Email exists, please choose another!';
	} else {
        // Username doesnt exists, insert new account
        if ($stmt = $con->prepare('INSERT INTO user (email, password, fullname, phone) VALUES (?, ?, ?, ?)')) {
            // We do not want to expose passwords in our database, so hash the password and use password_verify when a user logs in.
            $password = password_hash($password, PASSWORD_DEFAULT);
            $stmt->bind_param('ssss', $email, $password, $fullname, $phone);
            $stmt->execute();

			http_response_code(201);
            echo 'You have successfully registered, you can log in now!';
        } else {
            // Something is wrong with the sql statement, check to make sure accounts table exists with all 3 fields.
            echo 'Could not prepare statement!';
        }

	}
	$stmt->close();
} else {
	// Something is wrong with the sql statement, check to make sure accounts table exists with all 3 fields.
	echo 'Could not prepare statement!';
}

$con->close();

?>



