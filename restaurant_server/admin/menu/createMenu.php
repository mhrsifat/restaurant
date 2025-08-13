<?php
require_once __DIR__ . "/../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

$name = trim($data['food_name'] ?? "");
$desc = trim($data['description'] ?? "");
$img  = trim($data['img'] ?? "");
$price = $data['price'] ?? null;
$type  = trim($data['type'] ?? "");

if ($name === "" || $price === null || $type === "") {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

// Bind price as string (safer for DECIMAL) — adjust if you want integer
$sql = "INSERT INTO menu (food_name, description, img, price, type) VALUES (?, ?, ?, ?, ?)";
if ($stmt = mysqli_prepare($link, $sql)) {
    mysqli_stmt_bind_param($stmt, "sssss", $name, $desc, $img, strval($price), $type);
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(["message" => "Created", "food_id" => mysqli_insert_id($link)]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Insert failed"]);
    }
    mysqli_stmt_close($stmt);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed"]);
}
mysqli_close($link);
