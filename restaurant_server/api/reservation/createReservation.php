<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../../config/Database.php';
include_once '../../models/reservation.php';
 
 
$reservation = new Reservation($con);

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));



    $user_id = $data->user_id;
    $date = $data->date;
    $time = $data->time;
    $numOfPerson = $data->num_of_person;
    $message = isset($data->message) ? $data->message : "";
    $courses = $data->courses;

     
    // make sure data is not empty
    if(!empty($date) && !empty($time) && !empty($numOfPerson)){
     
        // set product property values
        $reservation->user_id = $user_id;
        $reservation->date = $date;
        $reservation->time = $time;
        $reservation->numOfPerson = $numOfPerson;
        $reservation->message = $message;
        $reservation->courses = $courses;
        
     
        // create the product
        if($reservation->create()){
     
            // set response code - 201 created
            http_response_code(200);
     
            // tell the user
            echo json_encode("Your reservations has been sent. Contact us for detail request!");
        }
     
        // if unable to create the product, tell the user
        else{
     
            // set response code - 503 service unavailable
            http_response_code(201);
     
            // tell the user
            echo json_encode("Oops, try again later");
        }
    }
     
    // tell the user data is incomplete
    else{
     
        // set response code - 400 bad request
        http_response_code(201);
     
        // tell the user
        echo json_encode("Please complete the form");
    }



?>