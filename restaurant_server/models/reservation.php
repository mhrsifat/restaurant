<?php 

class Reservation {   
  
    private $conn;
    private $table_name = "reservations";

    // object properties
    // public $reservation_id;
    public $user_id;
    public $date;
    public $time;
    public $numOfPerson;
    public $message;
    public $courses = array();
 
    // constructor with $db as database connection
    public function __construct($con){
        $this->conn = $con;
    }

////////////////////////////////////////////////////////////////////
// add new reservation
function create() {
    $this->conn->begin_transaction();

    try {
    
    // Insert booking info into reservations table
    // query to insert record
    $query = "INSERT INTO reservations (user_id, date, time, num_of_persons, message)
                VALUES (?, ?, ?, ?, ?)";

    // prepare query
    $stmt = $this->conn->prepare($query);

    // sanitize
    $this->user_id=htmlspecialchars(strip_tags($this->user_id));
    $this->date=htmlspecialchars(strip_tags($this->date));
    $this->time=htmlspecialchars(strip_tags($this->time));
    $this->numOfPerson=htmlspecialchars(strip_tags($this->numOfPerson));
    $this->message=htmlspecialchars(strip_tags($this->message));

    // bind values
    $stmt->bind_param('issis', $this->user_id, $this->date, $this->time, $this->numOfPerson, $this->message);

    // execute query
    $stmt->execute();

    $this->conn->query("SELECT @reservation_id:=MAX(reservation_id) FROM reservations;");

    // //////////////////////////
    // Insert courses choose to order table
    $query2 = "INSERT INTO orders VALUES (@reservation_id, ?)";

    foreach ($this->courses as $food_id) {
        $stmt = $this->conn->prepare($query2);

        $stmt->bind_param("i", $food_id);
        $stmt->execute();
    }


    $this->conn->commit();
    return true;

    } catch (mysqli_sql_exception $exception) {
        $mysqli->rollback();

        return false;
    }
}

function readByUser() {
     
    // select all query
    $query = "SELECT * FROM reservations WHERE user_id = ? ORDER BY created_at DESC";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);

    $stmt->bind_param("i", $this->user_id);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}


}



?>
