<?php
// getReservations.php
header("Content-Type: application/json");
require_once __DIR__ . "/../../config/Database.php";

$sql = "SELECT * FROM reservations ORDER BY created_at DESC";
$result = mysqli_query($link, $sql);

$reservations = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $reservations[] = $row;
    }
    echo json_encode($reservations);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch reservations"]);
}
mysqli_close($link);
