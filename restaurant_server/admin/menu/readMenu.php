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

$sql = "SELECT * FROM menu ORDER BY food_id DESC";
$result = mysqli_query($link, $sql);
$rows = [];

if ($result) {
    while ($r = mysqli_fetch_assoc($result)) $rows[] = $r;
    echo json_encode($rows);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Query failed"]);
}
mysqli_close($link);
