<?php
require_once __DIR__ . "/../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Missing id"]);
    exit;
}

$sql = "DELETE FROM menu WHERE food_id = ?";
if ($stmt = mysqli_prepare($link, $sql)) {
    mysqli_stmt_bind_param($stmt, "i", $id);
    if (mysqli_stmt_execute($stmt)) {
        if (mysqli_stmt_affected_rows($stmt) > 0) {
            echo json_encode(["message" => "Deleted"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Not found"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Delete failed"]);
    }
    mysqli_stmt_close($stmt);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed"]);
}
mysqli_close($link);
