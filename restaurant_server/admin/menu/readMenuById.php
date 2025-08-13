<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
require_once __DIR__ . "/../../config.php";

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing id"]);
    exit;
}

$id = intval($_GET['id']);
$sql = "SELECT * FROM menu WHERE food_id = ? LIMIT 1";

if ($stmt = mysqli_prepare($link, $sql)) {
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    if ($row = mysqli_fetch_assoc($res)) {
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Not found"]);
    }
    mysqli_stmt_close($stmt);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed"]);
}
mysqli_close($link);
