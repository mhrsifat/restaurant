<?php
// config.php - common include for APIs

// Dev CORS - allow all origins for local development.
// In production restrict this to your front-end origin.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");

// Include DB
require_once __DIR__ . "/config/Database.php";

// Provide $link variable (many older files use $link)
if (!isset($link)) {
    $link = $con;
}
?>
