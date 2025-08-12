<?php
// Check existence of id parameter before processing further
if(isset($_GET["id"]) && !empty(trim($_GET["id"]))){
    // Include config file
    require_once "config.php";
    
    // Prepare a select statement
    $sql = "SELECT * FROM orders JOIN menu ON orders.food_id = menu.food_id WHERE reservation_id = ?;";
    $sql2 = "SELECT * FROM reservations, user WHERE reservations.user_id = user.user_id AND reservation_id = ?;";


    if($stmt = mysqli_prepare($link, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "i", $param_id);
        
        // Set parameters
        $param_id = trim($_GET["id"]);

        $food_arr = array();
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            $result = mysqli_stmt_get_result($stmt);
    
            if(mysqli_num_rows($result) > 0){
                /* Fetch result row as an associative array. Since the result set
                contains only one row, we don't need to use while loop */
                while($rows = mysqli_fetch_assoc($result)){
                
                    $food_id = $rows["food_id"];
                    $food_name = $rows["food_name"];
                    $img = $rows["img"];
                    $price = $rows["price"];
                    $type = $rows["type"];



                    $food = array (
                        'food_id' => $food_id,
                        'food_name' => $food_name,
                        'img' => $img,
                        'price' => $price,
                        'type' => $type
                    );

                    array_push($food_arr, $food);
                }
              
            }            
        } 
    }

    if($stmt = mysqli_prepare($link, $sql2)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "i", $param_id);
        
        // Set parameters
        $param_id = trim($_GET["id"]);

    
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            $result = mysqli_stmt_get_result($stmt);

            if(mysqli_num_rows($result) > 0){
                /* Fetch result row as an associative array. Since the result set
                contains only one row, we don't need to use while loop */
                $rows = mysqli_fetch_assoc($result);
                
                  
                    $date = $rows["date"];
                    $time = $rows["time"];
                    $num_of_persons = $rows["num_of_persons"];
                    $message = $rows["message"];
                    $created_at = $rows["created_at"];

                    $user_id = $rows["user_id"];
                    $fullname = $rows["fullname"];
                    $email = $rows["email"];
                    $phone = $rows["phone"];                    
              
            }
        } 
    }
     
    // Close statement
    mysqli_stmt_close($stmt);
    
    // Close connection
    // mysqli_close($link);
} 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Detail Reservation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
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

        <div class="my-12 mx-10">
            <h1 class="text-4xl font-semibold">Detail Reservation</h1>

            <div class="flex items-start gap-36">
                <div>
                    <h2 class="pt-8 pb-4 text-2xl font-semibold">Reservation information</h2>
                    <p class="text-xl">Reservation ID: <?php echo $param_id ?></p>
                    <p class="text-xl">Number of persons: <?php echo $num_of_persons ?></p>
                    <p class="text-xl">Date: <?php echo $date ?></p>
                    <p class="text-xl">Time: <?php echo $time ?></p>
                    <p class="text-xl">Created at: <?php echo $created_at ?></p>
                </div>

                <div>
                    <h2 class="pt-8 pb-4 text-2xl font-semibold">User information</h2>
                    <p class="text-xl">User ID: <?php echo $user_id ?></p>
                    <p class="text-xl">Full Name: <?php echo $fullname ?></p>
                    <p class="text-xl">Email: <?php echo $email ?></p>
                    <p class="text-xl">Phone: <?php echo $phone ?></p>
                </div>
                
            </div>

            




            



            <h2 class="py-8 text-2xl font-semibold">Order information</h2>

            <?php 
                if (count($food_arr) == 0) echo "No courses reserved!";
                else {
                    foreach ($food_arr as $key => $value) {
                        echo '<div class="py-4 flex items-center gap-5 border-b border-gray-300">';
                            echo '<img src="'.$value["img"].'" alt="food-img" class="rounded-full h-20"/>';
                            echo' <div>
                                <p class="font-semibold">'.$value['food_name'].'</p>
                                <p> $'.$value['price'].'</p>
                                <p>'.$value['type'].'</p>
                            </div>';
                        echo "</div>";
                    }
                }
                
            ?>



        </div>

    </div>
</body>
</html>