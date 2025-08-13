<?php
require_once __DIR__ . "/../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

$id = $data['food_id'] ?? null;
$name = trim($data['food_name'] ?? "");
$desc = trim($data['description'] ?? "");
$img  = trim($data['img'] ?? "");
$price = $data['price'] ?? null;
$type  = trim($data['type'] ?? "");

if (!$id || $name === "" || $price === null || $type === "") {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

$sql = "UPDATE menu SET food_name=?, description=?, img=?, price=?, type=? WHERE food_id=?";
if ($stmt = mysqli_prepare($link, $sql)) {
    // types: all strings, last param id is int
    mysqli_stmt_bind_param($stmt, "sssssi", $name, $desc, strval($img), strval($price), $type, $id);
    if (mysqli_stmt_execute($stmt)) {
        if (mysqli_stmt_affected_rows($stmt) > 0) {
            echo json_encode(["message" => "Updated"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Not found or no change"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Update failed"]);
    }
    mysqli_stmt_close($stmt);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed"]);
}
mysqli_close($link);
