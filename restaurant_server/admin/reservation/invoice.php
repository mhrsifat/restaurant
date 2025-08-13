<?php
require_once __DIR__ . "/../../config.php";

$id = $_GET['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Missing reservation ID"]);
    exit;
}

// Join with `user` to get customer name
$sql = "SELECT r.reservation_id, r.date, r.time, r.num_of_persons, r.message, r.created_at, u.fullname AS customer_name
        FROM reservations r
        JOIN user u ON r.user_id = u.user_id
        WHERE r.reservation_id = ?";

if ($stmt = mysqli_prepare($link, $sql)) {
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        $row['invoice_number'] = "INV-" . str_pad($row['reservation_id'], 6, "0", STR_PAD_LEFT);

        // Example: calculate total as 500 per person (replace with your own logic if needed)
        $row['total'] = $row['num_of_persons'] * 500;

        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Reservation not found"]);
    }

    mysqli_stmt_close($stmt);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare SQL statement"]);
}

mysqli_close($link);
