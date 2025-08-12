<?php 

class Product {   
  
    private $conn;
    private $table_name = "menu";

    // object properties
    public $food_id;
    public $food_name;
    public $description;
    public $price;
    public $img;
    public $type;
 
    // constructor with $db as database connection
    public function __construct($con){
        $this->conn = $con;
    }

////////////////////////////////////////////////////////////////////
    // read products
function read() {
 
    // select all query
    $query = "SELECT * FROM menu";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}


function readType() {
 
    // select all query
    $query = "SELECT * FROM menu WHERE type = ?";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);

    $stmt->bind_param("i", $this->type);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

}

?>
