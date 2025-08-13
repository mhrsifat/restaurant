<?php
require_once __DIR__ . "/../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) { http_response_code(400); echo json_encode(["error" => "Invalid JSON"]); exit; }

$id = $data['reservation_id'] ?? null;
$user_id = $data['user_id'] ?? null;
$date = $data['date'] ?? null;
$time = $data['time'] ?? null;
$num_of_persons = $data['num_of_persons'] ?? null;
$message = $data['message'] ?? "";

if (!$id || !$user_id || !$date || !$time || !$num_of_persons) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

$sql = "UPDATE reservations SET user_id=?, date=?, time=?, num_of_persons=?, message=? WHERE reservation_id=?";
if ($stmt = mysqli_prepare($link, $sql)) {
    mysqli_stmt_bind_param($stmt, "issisi", $user_id, $date, $time, $num_of_persons, $message, $id);
    if (mysqli_stmt_execute($stmt)) {
        if (mysqli_stmt_affected_rows($stmt) > 0) echo json_encode(["message" => "Reservation updated"]);
        else { http_response_code(404); echo json_encode(["error" => "Not found or no changes"]); }
    } else {
        http_response_code(500); echo json_encode(["error" => "Failed to update reservation"]);
    }
    mysqli_stmt_close($stmt);
} else {
    http_response_code(500); echo json_encode(["error" => "Prepare failed"]);
}
mysqli_close($link);
