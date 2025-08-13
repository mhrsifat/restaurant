<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../../config/Database.php");

// Start session for brute-force protection
session_start();

$ip = $_SERVER['REMOTE_ADDR'];
$maxAttempts = 500;
$lockoutTime = 15 * 60; // 15 minutes

if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = [];
}

// Clean expired attempts
foreach ($_SESSION['login_attempts'] as $attemptIp => $attempts) {
    $_SESSION['login_attempts'][$attemptIp] = array_filter($attempts, function($timestamp) use ($lockoutTime) {
        return ($timestamp + $lockoutTime) > time();
    });
}

if (isset($_SESSION['login_attempts'][$ip]) && count($_SESSION['login_attempts'][$ip]) >= $maxAttempts) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many login attempts. Please try again later.']);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email, $data->password)) {
    http_response_code(400);
    echo json_encode(["error" => "Please fill both the email and password fields!"]);
    exit();
}

// Validate and sanitize email
$email = filter_var(trim($data->email), FILTER_VALIDATE_EMAIL);
$passwordInput = trim($data->password);

if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

if ($stmt = $con->prepare('SELECT user_id, password, name, phone FROM `admin` WHERE email = ?')) {
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($user_id, $hashedPassword, $name, $phone);
        $stmt->fetch();

        if (password_verify($passwordInput, $hashedPassword)) {
            // Successful login - clear attempts for this IP
            $_SESSION['login_attempts'][$ip] = [];

            // Regenerate session ID for security
            session_regenerate_id(true);

            // Store user info in session (optional for backend use)
            $_SESSION['admin_user'] = [
                'user_id' => $user_id,
                'email' => $email,
                'name' => $name,
                'phone' => $phone
            ];

            http_response_code(200);
            echo json_encode([
                "user_id" => $user_id,
                "email" => $email,
                "name" => $name,
                "phone" => $phone
            ]);
        } else {
            // Wrong password - record failed attempt
            $_SESSION['login_attempts'][$ip][] = time();

            http_response_code(401);
            echo json_encode(["error" => "Incorrect email or password!"]);
        }
    } else {
        // User not found - record failed attempt
        $_SESSION['login_attempts'][$ip][] = time();

        http_response_code(401);
        echo json_encode(["error" => "Incorrect email or password!"]);
    }

    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(["error" => "Server error: could not prepare statement"]);
}

$con->close();
