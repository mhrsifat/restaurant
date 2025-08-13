<?php
// totaluser.php
require_once __DIR__ . "/../../config.php";  // Your common config file that includes DB connection and headers

// Query to count total users
$sql = "SELECT COUNT(*) AS total FROM user";

$result = $link->query($sql);

if ($result) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "total_users" => (int)$row['total']
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "error" => "Failed to fetch total users"
    ]);
}
?>
