<?php 

class Order {   
  
    private $conn;
    // private $table_name = "menu";

    // object properties
    public $reservation_id;
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

function readByReservation() {
 
    // select all query
    $query = "SELECT * FROM orders JOIN menu ON orders.food_id = menu.food_id WHERE reservation_id = ?;";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);

    $stmt->bind_param("i", $this->reservation_id);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

}

?>
