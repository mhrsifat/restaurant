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

        <div class="abc p-7  ">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <h1 class="text-4xl font-semibold">Table Reservation</h1>
                </div>
            </div>
            <?php
                require_once "config.php";
                $sql = "SELECT * FROM reservations ORDER BY created_at DESC";

                if($result = mysqli_query($link, $sql)){
                    if(mysqli_num_rows($result) > 0){
                        echo '<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">';
                        echo '<table class="min-w-full">';
                            echo '<thead class="border-b">';
                                echo "<tr>";
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Reservation ID</th>';
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">User ID</th>';
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Date</th>';
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Time</th>';                                    
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Number of persons</th>';
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Message</th>';                                    
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Created At</th>';
                                    echo '<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Action</th>';
                                echo "</tr>";
                            echo "</thead>";
                            echo "<tbody>";
                                while($row = mysqli_fetch_array($result)){
                                    echo '<tr class = "border-b">';
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['reservation_id'] . "</td>";
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['user_id'] . "</td>";
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['date'] . "</td>";
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['time'] . "</td>";
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['num_of_persons'] . "</td>";
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['message'] . "</td>";
                                        echo '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' . $row['created_at'] . "</td>";
                                        echo "<td>";
                                            echo '<a href="readreservation.php?id='. $row['reservation_id'] .'" class="mr-3" title="View Record" ><span class="fa fa-eye"></span></a>';
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
        </div>
    </div>

</body>
</html>