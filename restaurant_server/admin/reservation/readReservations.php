<?php
require_once __DIR__ . "/../../config.php";

$sql = "SELECT * FROM reservations ORDER BY created_at DESC";
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
