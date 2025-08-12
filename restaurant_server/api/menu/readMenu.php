<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/Database.php';
include_once '../../models/menu.php';
 
 
// initialize object
$product = new Product($con);
 
$product->type = (isset($_GET['type']) ? $_GET['type'] : die());

// query products
$stmt = $product->readType();
$result = $stmt->get_result();

$numrows = mysqli_num_rows($result);

 
// check if more than 0 record found
if($numrows>0){
 
    // products array
    $products_arr = array();
    // $products_arr["records"]=array();
 
    // retrieve our table contents
    while ($row = mysqli_fetch_assoc($result)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        //add server url and image directory before image file name
        // $image_directory = "http://" . $_SERVER['SERVER_NAME'] . $database->port . $database->img_dir . '/' . $image;
 
        $product_item = array(
            "id" => $food_id,
            "food_name" => $food_name,
            "description" => html_entity_decode($description),
            "price" => $price,
            "img" => $img,
            "type" => $type
        );
 
        array_push($products_arr, $product_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($products_arr);
} 

// if no products were found

else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No products found.")
    );
}