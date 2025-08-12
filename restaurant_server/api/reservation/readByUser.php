<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/Database.php';
include_once '../../models/reservation.php';
 
 
// initialize object
$reservation = new Reservation($con);
 
$reservation->user_id = (isset($_GET['user_id']) ? $_GET['user_id'] : die());

// query products
$stmt = $reservation->readByUser();
$result = $stmt->get_result();

$numrows = mysqli_num_rows($result);

 
// check if more than 0 record found
if($numrows>0){
 
    // products array
    $reservation_arr = array();
    // $products_arr["records"]=array();
 
    // retrieve our table contents
    while ($row = mysqli_fetch_assoc($result)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        //add server url and image directory before image file name
        // $image_directory = "http://" . $_SERVER['SERVER_NAME'] . $database->port . $database->img_dir . '/' . $image;
 
        $reservation_item = array(
            "id" => $reservation_id,
            "date" => $date,
            "time" => $time,
            "numOfPerson" => $num_of_persons,
            "message" => $message,
            "createdAt" => $created_at
        );
 
        array_push($reservation_arr, $reservation_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($reservation_arr);
} 

// if no products were found

else{
 
    // set response code - 404 Not found
    http_response_code(201);
 
    // tell the user no products found
    echo json_encode("No reservation yet!");
}