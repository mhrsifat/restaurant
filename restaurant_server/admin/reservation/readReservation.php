<?php
require_once __DIR__ . "/../../config.php";

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing id"]);
    exit;
}
$id = intval($_GET['id']);

$sql = "SELECT r.*, u.fullname, u.email, u.phone 
        FROM reservations r 
        LEFT JOIN user u ON r.user_id = u.user_id 
        WHERE reservation_id = ? LIMIT 1";

if ($stmt = mysqli_prepare($link, $sql)) {
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    if ($row = mysqli_fetch_assoc($res)) {
        // Additionally, get ordered food items if orders table exists
        $orders_sql = "SELECT o.*, m.food_name, m.img, m.price FROM orders o LEFT JOIN menu m ON o.food_id = m.food_id WHERE reservation_id = ?";
        if ($stmt2 = mysqli_prepare($link, $orders_sql)) {
            mysqli_stmt_bind_param($stmt2, "i", $id);
            mysqli_stmt_execute($stmt2);
            $orders_res = mysqli_stmt_get_result($stmt2);
            $food_arr = [];
            while ($f = mysqli_fetch_assoc($orders_res)) $food_arr[] = $f;
            $row['orders'] = $food_arr;
            mysqli_stmt_close($stmt2);
        }
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
