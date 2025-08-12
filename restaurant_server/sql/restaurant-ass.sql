create schema restaurant2;
use restaurant2;

create table `user` (
	user_id int auto_increment,
	email varchar(255) NOT NULL unique,
	`password` varchar(255) NOT NULL,
	fullname varchar(255) not null,
	phone varchar(50) NOT NULL,
	PRIMARY KEY (user_id)
);

create table reservations (
	reservation_id int auto_increment, 
	user_id int NOT NULL, 
	`date` date NOT NULL,
	`time` time not null,	
	num_of_persons int NOT NULL,
	message varchar(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (reservation_id),
	foreign key (user_id) references `user`(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table menu (
	food_id int auto_increment,
    food_name varchar(255) not null,
    `description` varchar(255),
    img varchar(255),
    price int not null,
    `type` enum('Main Dishes', 'Starters', 'Desserts', 'Drinks') not null,
    PRIMARY KEY (food_id)
);

create table orders (
	reservation_id int,
    food_id int,
    primary key (reservation_id, food_id),
	foreign key (reservation_id) references `reservations`(reservation_id),
    foreign key (food_id) references `menu`(food_id)
);

INSERT INTO user (fullname, password, email, phone) VALUES ('anh quan', '123456789', 'quan123@gmail.com', '0912789567'), ('quyet thang',  '1234562789', 'qt@gmail.com','0912783567');
INSERT INTO reservations (user_id, `date`, `time`, num_of_persons, message) VALUES (2, '2022-12-31', '23:59:59', 5, 'abcccccc'), (1, '2022-8-5', '20:59:59', '12', 'mo ta');


INSERT INTO menu (food_name, `description`, img, price, `type`) VALUES ('Chiken Enchiladas Suizas', 'Creamy chicken enchiladas in a homemade tomatillo poblano sauce and baked with Mexican cheeses until bubbly. ', 'https://www.modernhoney.com/wp-content/uploads/2021/04/Chicken-Enchiladas-Suizas-21-320x320.jpg', '29' , 1), 
('Sunday Slow Cooker Beef Ragu', 'The ultimate comfort food! A big bowl of slow cooked, braised beef in a rich, robust tomato sauce tossed with pasta.', 'https://www.modernhoney.com/wp-content/uploads/2019/10/Sunday-Slow-Cooker-Beef-Ragu-7-320x320.jpg', '49' , 1),
('The 3-Cheese White Pizza', 'A New-York Style white pizza with drizzled olive oil, mozzarella, parmesan, and ricotta cheese with Italian herbs. ', 'https://www.modernhoney.com/wp-content/uploads/2019/05/The-Best-3-Cheese-White-Pizza-3-320x320.jpg', '15' , 1),
('Grilled Steak Tacos', 'Juicy marinated grilled steak tacos with fresh cilantro, avocado, and salsa. The most flavorful and tender steak tacos recipe!', 'https://www.modernhoney.com/wp-content/uploads/2020/04/Grilled-Steak-Tacos-11-320x320.jpg', '23' , 1),
('Ranch Chicken Chili', 'This White Chicken Chili is a quick and easy soup recipe made with shredded chicken, onion, garlic, chili powder, green chilies, white beans, and ranch powder, and topped with cheese and sour cream.', 'https://www.modernhoney.com/wp-content/uploads/2022/05/Ranch-Chicken-Chili-1-crop-360x360.jpg', '25' , 1),
('Skillet Chicken Pot Pie', 'The chicken pot pie with tender chicken, vegetables, in a creamy sauce and topped with buttery, flaky puff pastry.', 'https://www.modernhoney.com/wp-content/uploads/2020/10/Skillet-Chicken-Pot-Pie-6-320x320.jpg', '13' , 1),
('Lasagna Soup', 'A hearty beef lasagna soup with fresh ricotta cheese, mozzarella, and parmesan cheeses and fresh herbs. An Italian classic made into a comforting soup!', 'https://www.modernhoney.com/wp-content/uploads/2019/12/Lasagna-Soup-1-320x320.jpg', '11' , 1),
('Shrimp Scampi Linguine', 'Shrimp sauteed in a lemon garlic butter sauce tossed with linguine pasta', 'https://www.modernhoney.com/wp-content/uploads/2019/02/Shrimp-Scampi-Linguine-320x320.jpg', '18' , 1),
('Beef Bolognese Sauce', 'Authentic Italian Beef Bolognese Sauce on top of fresh pasta is a warm, weeknight dish for the meal', 'https://www.modernhoney.com/wp-content/uploads/2018/11/Beef-Bolognese-Sauce-3-320x320.jpg', '29' , 1),
('Smoked Baby Back Ribs', 'Tender, flavorful, fall-off-the-bone, smoked baby back ribs. ', 'https://www.modernhoney.com/wp-content/uploads/2018/08/Smoked-Baby-Back-Ribs-5-320x320.jpg', '34' , 1);


INSERT INTO menu (food_name, `description`, img, price, `type`) VALUES ('Fresh Mango Salsa', 'Fresh Mango Salsa with ripe mango, red peppers, cilantro, red onion, jalapeno, lime juice, salt, and a touch of honey. The freshest and best mango salsa recipe!', 'https://www.modernhoney.com/wp-content/uploads/2022/07/Fresh-Mango-Salsa-2-360x360.jpg', '5', 2), 
('French Onion Dip', 'The best French onion dip made with caramelized onions, sour cream, mayo, and cream cheese. The perfect French onion dip recipe! .', 'https://www.modernhoney.com/wp-content/uploads/2019/10/Homemade-French-Onion-Dip-4-320x320.jpg', '9', 2),
('Baked Chicken Parm Sliders', 'Baked Chicken Parm Sliders Chicken topped with a fresh marinara sauce topped with fresh mozzarella cheese and baked on Hawaiian sweet rolls and slathered with garlic butter.', 'https://www.modernhoney.com/wp-content/uploads/2020/11/Chicken-Parmesan-Sliders-2-320x320.jpg', '10', 2),
('Cobb Salad', 'Cobb Salad made with romaine lettuce, crispy bacon, creamy avocado, juicy tomato, egg, Monterey Jack cheese, tossed in homemade Ranch dressing.', 'https://www.modernhoney.com/wp-content/uploads/2019/07/Cobb-Salad-6-320x320.jpg', '4', 2),
('Queso Fundido with Chorizo', 'Queso Fundido with Chorizo. A skillet of melted Mexican cheeses seasoned with peppers, onions, and spicy Mexican chorizo sausage and served with hot tortillas or chips. The perfect Mexican appetizer! ', 'https://www.modernhoney.com/wp-content/uploads/2019/02/Queso-Fundido-with-Chorizo-8-320x320.jpg', '10', 2),
('Antipasto Tortellini Pasta Salad', 'Creamy cheese tortellini topped with Italian cured meats, fresh mozzarella, roasted red peppers, red onions, fresh basil all tossed with an olive oil red wine vinaigrette.', 'https://www.modernhoney.com/wp-content/uploads/2016/06/DSC_0588ed3-320x320.jpg', '15', 2);

INSERT INTO menu (food_name, `description`, img, price, `type`) VALUES ('Chocolate Caramel Pecan Turtle Cookies', 'Chocolate Caramel Pecan Turtle Cookies made with a chewy chocolate cookie rolled in pecans and topped with caramel and melted chocolate. The best turtle cookie recipe!', 'https://www.modernhoney.com/wp-content/uploads/2022/12/Chocolate-Caramel-Pecan-Turtle-Cookies-10-360x360.jpg', '13', 3), 
('Apple Pie', 'This Fresh Apple Pie with a Buttery, Flaky Crust is made with fresh apples tossed in sugar and cinnamon and baked in a homemade pie crust.', 'https://www.modernhoney.com/wp-content/uploads/2022/11/Classic-Apple-Pie-Recipe-2-360x360.jpg', '5', 3),
('Levain Bakery Rocky Road Cookies', 'These Levain Bakery Rocky Road Cookies are rich, thick, soft, chewy chocolate cookies with semi-sweet chocolate chips, mini marshmallows, and cashews. ', 'https://www.modernhoney.com/wp-content/uploads/2022/07/Levain-Bakery-Rocky-Road-Cookies-9-360x360.jpg', '10', 3),
('Fresh Apricot Crisp', 'This rustic summer dessert is served with a big scoop of vanilla bean ice cream.', 'https://www.modernhoney.com/wp-content/uploads/2022/06/Apricot-Crisp-2-360x360.jpg', '6', 3),
('Black and White Cake', 'Chocolate Cake with Vanilla Frosting. ', 'https://www.modernhoney.com/wp-content/uploads/2021/05/Chocolate-Cake-with-Vanilla-Frosting-1-320x320.jpg', '10', 3),
('Panna Cotta', 'A silky smooth, creamy vanilla bean dessert made with cream, sugar, gelatin, and vanilla beans. An Italian favorite dessert!', 'https://www.modernhoney.com/wp-content/uploads/2020/12/Vanilla-Bean-Panna-Cotta-1-320x320.jpg', '7', 3),
('Chocolate Zucchini Cake', 'Chocolate Zucchini Cake Moist chocolate cake with grated zucchini with a rich chocolate buttercream frosting. You can not even taste the zucchini so this is definitely the best way to eat your vegetables! The Best Chocolate Zucchini Cake Recipe.', 'https://www.modernhoney.com/wp-content/uploads/2019/08/Chocolate-Zucchini-Cake-10-320x320.jpg', '9', 3),
('Oreo Truffles', 'Creamy Oreo truffles with a rich chocolate coating. An easy homemade chocolate truffle with only 4 ingredients!', 'https://www.modernhoney.com/wp-content/uploads/2018/12/Oreo-Truffles-9-320x320.jpg', '9', 3);

INSERT INTO menu (food_name, `description`, img, price, `type`) VALUES ('White Hot Chocolate', 'White Hot Chocolate Creamy, silky-smooth white chocolate made with white chocolate, whole milk, and vanilla beans. Topped with fresh whipped cream, homemade soft marshmallows, and white chocolate shavings.', 'https://www.modernhoney.com/wp-content/uploads/2020/12/White-Hot-Chocolate-14-crop-320x320.jpg', '9', 4), 
('Frozen Hot Chocolate', 'Frozen Hot Chocolate is a famous New York City dessert found at Serendipity. It is a rich chocolate drink served cold with whipped cream and chocolate shavings.', 'https://www.modernhoney.com/wp-content/uploads/2018/02/Frozen-Hot-Chocolate-3-320x320.jpg', '5', 4),
('Buttermilk Syrup', 'Buttermilk Syrup A homemade caramel syrup made with butter, sugar, Karo syrup, vanilla, and buttermilk.', 'https://www.modernhoney.com/wp-content/uploads/2021/01/Homemade-Buttermilk-Syrup-2-320x320.jpg', '10', 4),
('Fresas con Crema', 'This Fresas con Crema is an authentic Mexican dessert made with fresh sliced Strawberries, Mexican Crema, Heavy Cream, and Sweetened Condensed Milk.', 'https://www.modernhoney.com/wp-content/uploads/2022/08/Fresas-con-Crema-Strawberries-and-Cream-2-360x360.jpg', '6', 4),
('Pina Colada Smoothie', 'A refreshing tropical Coconut Pineapple Pina Colada Smoothie.', 'https://www.modernhoney.com/wp-content/uploads/2018/03/Pina-Colada-Smoothie-2-320x320.jpg', '10', 4),
('Fresh Strawberry Lemonade', 'Fresh Strawberry Lemonade made with freshly squeezed lemon juice, fresh strawberries, sweet sugar, water, and ice.', 'https://www.modernhoney.com/wp-content/uploads/2017/06/DSC_0349-copy-1-320x320.jpg', '7', 4),
('Golden Milk', 'Warm comforting anti-inflammatory, anti-oxidant golden milk turmeric tea.', 'https://www.modernhoney.com/wp-content/uploads/2017/08/Golden-Milk-Tumeric-Tea-Recipe-320x320.jpg','9', 4);