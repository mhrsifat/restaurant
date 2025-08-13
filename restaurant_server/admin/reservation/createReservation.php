<?php
require_once __DIR__ . "/../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

$user_id = $data['user_id'] ?? null;
$date = $data['date'] ?? null;
$time = $data['time'] ?? null;
$num_of_persons = $data['num_of_persons'] ?? null;
$message = $data['message'] ?? "";

if (!$user_id || !$date || !$time || !$num_of_persons) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

$sql = "INSERT INTO reservations (user_id, date, time, num_of_persons, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
if ($stmt = mysqli_prepare($link, $sql)) {
    mysqli_stmt_bind_param($stmt, "issis", $user_id, $date, $time, $num_of_persons, $message);
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(["message" => "Reservation created", "reservation_id" => mysqli_insert_id($link)]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to create reservation"]);
    }
    mysqli_stmt_close($stmt);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed"]);
}
mysqli_close($link);
