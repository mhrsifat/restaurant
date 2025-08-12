<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight OPTIONS request and exit
    http_response_code(200);
    exit();
}

require_once("../../config/Database.php");

// Get JSON input from request body
$data = json_decode(file_get_contents("php://input"));

// Validate input
if (!isset($data->email, $data->password)) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Please fill both the email and password fields!"]);
    exit();
}

$email = trim($data->email);
$passwordInput = trim($data->password);

// Prepare SQL query to prevent SQL injection
if ($stmt = $con->prepare('SELECT user_id, password, fullname, phone FROM user WHERE email = ?')) {
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($user_id, $hashedPassword, $fullname, $phone);
        $stmt->fetch();

        // Verify password
        if (password_verify($passwordInput, $hashedPassword)) {
            // Success
            http_response_code(200);
            $userInfo = [
                "user_id" => $user_id,
                "email" => $email,
                "fullname" => $fullname,
                "phone" => $phone
            ];
            echo json_encode($userInfo);
        } else {
            // Wrong password
            http_response_code(401); // Unauthorized
            echo json_encode(["error" => "Incorrect email or password!"]);
        }
    } else {
        // User not found
        http_response_code(401); // Unauthorized
        echo json_encode(["error" => "Incorrect email or password!"]);
    }

    $stmt->close();
} else {
    // SQL prepare failed
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Server error: could not prepare statement"]);
}
