<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <title>Avant Garden Admin Page</title>
     <style>
        .abc{
            width: 1000px;
            margin-left: 20px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="flex">
        <div class="min-h-screen flex flex-row bg-gray-100 border-r">
            <div class="flex flex-col w-56 bg-white overflow-hidden">
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

        <div class="abc p-7">
            <div class="flex items-center">
                <h1 class="px-10 text-4xl font-semibold mb-20">Menu</h1>
                
                <div class="float-right pl-96">
                   <a href="addMenu.php" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">Add Menu Item</a>
                </div>
            </div>
            
                
            
            <?php
                require_once "config.php";
                $sql = "SELECT * FROM menu";

                if($result = mysqli_query($link, $sql)){
                    if(mysqli_num_rows($result) > 0){
                        echo '<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">';
                        echo '<table class="min-w-full">';
                            echo '<thead class="border-b">';
                                echo "<tr>";
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">ID</th>';
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>';
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Price</th>';
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Type</th>';
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Action</th>';
                                echo "</tr>";
                            echo "</thead>";
                            echo "<tbody>";
                                while($row = mysqli_fetch_array($result)){
                                    echo '<tr class = "border-b">';
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['food_id'] . "</td>";
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['food_name'] . "</td>";
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['price'] . "</td>";
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['type'] . "</td>";
                                        echo "<td>";
                                            echo '<a href="readMenu.php?id='. $row['food_id'] .'" class="mr-3" title="View Record" ><span class="fa fa-eye"></span></a>';
                                            echo '<a href="updateMenu.php?id='. $row['food_id'] .'" class="mr-3" title="Update Record" ><span class="fa fa-pencil"></span></a>';
                                            echo '<a href="deleteMenu.php?id='. $row['food_id'] .'" title="Delete Record" ><span class="fa fa-trash"></span></a>';
                                        echo "</td>";
                                    echo "</tr>";
                                }
                                echo "</tbody>";                            
                            echo "</table>";
                            echo '</div>';
                            mysqli_free_result($result);
                    } else{
                        echo '<div class="alert alert-danger"><em>No records were found.</em></div>';
                    }
                } else {
                    echo "Oops! Something went wrong. Please try again later.";
                }
            mysqli_close($link);
            ?>

        </div>
    </div>

</body>
</html>