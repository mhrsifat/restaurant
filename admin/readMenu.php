<?php
// Check existence of id parameter before processing further
if(isset($_GET["id"]) && !empty(trim($_GET["id"]))){
    // Include config file
    require_once "config.php";
    
    // Prepare a select statement
    $sql = "SELECT * FROM menu WHERE food_id = ?";
    
    if($stmt = mysqli_prepare($link, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "i", $param_id);
        
        // Set parameters
        $param_id = trim($_GET["id"]);
        
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            $result = mysqli_stmt_get_result($stmt);
    
            if(mysqli_num_rows($result) == 1){
                /* Fetch result row as an associative array. Since the result set
                contains only one row, we don't need to use while loop */
                $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
                
                // Retrieve individual field value
                $name = $row["food_name"];
                $description = $row["description"];
                $price = $row["price"];
                $type = $row["type"];
            } else{
                // URL doesn't contain valid id parameter. Redirect to error page
                header("location: error.php");
                exit();
            }
            
        } else{
            echo "Oops! Something went wrong. Please try again later.";
        }
    }
     
    // Close statement
    mysqli_stmt_close($stmt);
    
    // Close connection
    mysqli_close($link);
} else{
    // URL doesn't contain id parameter. Redirect to error page
    header("location: error.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>View Record</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <style>
        .wrapper{
            width: 600px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<div class="flex">
        <div class="min-h-screen flex flex-row bg-gray-100">
        <div class="flex flex-col w-56 bg-white  overflow-hidden border-r">
            <div class="flex items-center justify-center py-10 px-5">
                    <img class="" src="logo2.png" alt="">
                </div>
                <ul class="flex flex-col py-4 px-4">
                    <li>
                        <a href="adminpage.php" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        
                        <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"> <i class='bx bxs-food-menu'></i></span>
                        
                        <span class="text-lg font-medium"> Menu</span>
                        </a>
                    </li>
                    <li>
                        <a href="reservation.php" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"> <i class='bx bx-table' ></i></span>
                        <span class="text-lg font-medium">Reservation</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

<div class="p-8 rounded border border-gray-200">
  <h1 class="font-medium text-3xl">Menu Item Detail</h1>
  <p class="text-gray-600 mt-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos dolorem vel cupiditate laudantium dicta.</p>

  <form>
    <div class="mt-8 space-y-6">
      <div>
        <img src="<?php echo $row["img"]; ?>"/>
      </div>

      <div>
        <label>Name</label>
        <p><b><?php echo $row["food_name"]; ?></b></p>
      </div>

      <div>
        <label>Type</label>
        <p><b><?php echo $row["type"]; ?></b></p>
      </div>
      <div>
        <label>Description</label>
        <p><b><?php echo $row["description"]; ?></b></p>
      </div>
      <div>
        <label>Price</label>
        <p><b><?php echo $row["price"]; ?></b></p>
      </div>
      <p><a href="adminpage.php" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 active:bg-gray-700 disabled:opacity-50">Back</a></p>
    </div>

    
  </form>
</div>
</div>
    
</body>
</html>