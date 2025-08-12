<?php
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$name = $desc = $price = $image = $type ="";
$name_err = $desc_err = $price_err = $image_err = $type_err ="";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate name
    $input_name = trim($_POST["name"]);
    if (empty($input_name)){
        $name_err = "Please enter a name.";
    } else{
        $name = $input_name;
    }
    
    // Validate desc
    $input_desc = trim($_POST["description"]);
    if(empty($input_desc)){
        $desc_err = "Please enter description."; 
    } elseif (strlen($input_desc) > 500){
        $desc_err = "Please enter a description below 500 characters.";    
    } else{
        $desc = $input_desc;
    }
    
    // Validate price
    $input_price = trim($_POST["price"]);
    if(empty($input_price)){
        $price_err = "Please enter the price amount.";     
    } elseif(!is_numeric($input_price)){
        $price_err = "Please enter a price.";
    } else{
        $price = $input_price;
    }

    // Validate image link
    $input_img = trim($_POST["image"]);
    if(empty($input_img)){
        $image_err = "Please enter image link.";     
    } elseif(strlen($input_img) > 255){
        $image_err = "Link not over 255 characters.";
    } else{
        $image = $input_img;
    }
    
        $input_type = trim($_POST["type"]);
    if(empty($input_type)){
        $type_err = "Please enter a type."  ;     
    } else{
        $type = $input_type;
    }
    // Check input errors before inserting in database
    if(empty($name_err) && empty($desc_err) && empty($price_err) && empty($type_err)){
        // Prepare an insert statement
        $sql = "INSERT INTO menu (food_name, description, img, price, type) VALUES (?, ?, ?, ?, ?)";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "sssss", $param_name, $param_desc, $param_img, $param_price, $param_type);
            
            // Set parameters
            $param_name = $name;
            $param_desc = $desc;
            $param_img = $image;
            $param_price = $price;
            $param_type = $type;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Records created successfully. Redirect to landing page
                header("location: adminpage.php");
                exit();
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
         
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($link);
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Menu Item</title>
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

<div class="p-8 rounded border border-gray-200">
  <h1 class="font-medium text-3xl">Add Food Item</h1>
  <p class="text-gray-600 mt-6">Please fill this form and submit to add food or drink record to the menu database.</p>

                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                         <div class="mt-8 space-y-6">
                        <div class="form-group">
                            <label class="text-sm text-gray-700 block mb-1 font-medium">Name</label>
                            <input type="text" name="name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full <?php echo (!empty($name_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $name; ?>">
                            <span class="text-red-700"><?php echo $name_err;?></span>
                        </div>
                        <div class="form-group">
                            <label class="text-sm text-gray-700 block mb-1 font-medium">Description</label>
                            <textarea name="description" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full <?php echo (!empty($desc_err)) ? 'is-invalid' : ''; ?>"><?php echo $desc; ?></textarea>
                            <span class="text-red-700"><?php echo $desc_err;?></span>
                        </div>
                        <div class="form-group">
                            <label class="text-sm text-gray-700 block mb-1 font-medium">Image</label>
                            <input type="text" name="image" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full <?php echo (!empty($image_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $image; ?>">
                            <span class="text-red-700"><?php echo $image_err;?></span>
                        </div>
                          <div class="form-group">
                            <label class="text-sm text-gray-700 block mb-1 font-medium" >Price</label>
                            <input type="text" name="price" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full <?php echo (!empty($price_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $price; ?>">
                            <span class="text-red-700"><?php echo $price_err;?></span>
                        </div>
                          <div class="form-group">
                            <label class="text-sm text-gray-700 block mb-1 font-medium">Type</label>
                            <input type="text" name="type" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full <?php echo (!empty($type_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $type; ?>">
                            <span class="text-red-700"><?php echo $type_err;?></span>
                        </div>
                        </div>
                        <div class="space-x-4 mt-8">
                        <input type="submit" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 active:bg-gray-700 disabled:opacity-50" value="Submit">
                        <a href="adminpage.php" class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Cancel</a>
                        </div>
                    </form>
</div>
</div>
    
</body>
</html>