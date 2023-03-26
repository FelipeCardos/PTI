CREATE TABLE Address(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100),
    state VARCHAR(100),
    street VARCHAR(255),
    postal_code VARCHAR(100)
);

# User related ---------------------------------------------------------------

CREATE TABLE User(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    fiscal_identifier VARCHAR(255),
    address_id INT UNSIGNED,
    phone VARCHAR(255),
    typeUser ENUM('Consumer', 'Producer', 'Admin'),
    
    FOREIGN KEY (address_id)
        REFERENCES Address(id)
        ON DELETE SET NULL
);

CREATE TABLE Credentials(
	user_id INT UNSIGNED PRIMARY KEY,
    provider VARCHAR(8),
    value VARCHAR(60),
    
    FOREIGN KEY (user_id)
        REFERENCES User(id)
        ON DELETE CASCADE
);

CREATE TABLE ProductionUnit(
	id INT UNSIGNED AUTO_INCREMENT,
    producer_id INT UNSIGNED,
    capacity INT UNSIGNED,
    address_id INT UNSIGNED,
    
    PRIMARY KEY (id, producer_id),
    
    FOREIGN KEY (address_id)
        REFERENCES Address(id)
        ON DELETE SET NULL
);

CREATE TABLE Vehicle(
	id INT UNSIGNED AUTO_INCREMENT,
    production_unit_id INT UNSIGNED,
    license_plate VARCHAR(32),
    capacity INT,
    
    PRIMARY KEY (id),
    
    FOREIGN KEY (production_unit_id)
        REFERENCES ProductionUnit(id)
        ON DELETE SET NULL
);

# ----------------------------------------------------------------------------

# Product related ------------------------------------------------------------
CREATE TABLE Product(
	id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(1000),
    producer_id INT UNSIGNED,
    price FLOAT,
    production_date DATETIME,
    
    PRIMARY KEY (id, producer_id),
    
    FOREIGN KEY (producer_id)
        REFERENCES User(id)
        ON DELETE CASCADE    
);

CREATE TABLE ProductImage(
	id INT UNSIGNED AUTO_INCREMENT,
    product_id INT UNSIGNED,
    uri VARCHAR(255),
    
    PRIMARY KEY (id, product_id),
    
    FOREIGN KEY (product_id)
        REFERENCES Product(id)
        ON DELETE CASCADE
);

# ----------------------------------------------------------------------------

CREATE TABLE ProductProductionUnit(
	product_id INT UNSIGNED,
    production_unit_id INT UNSIGNED,
    amount INT,
    
    PRIMARY KEY (product_id, production_unit_id),
    
    FOREIGN KEY (product_id)
        REFERENCES Product(id)
        ON DELETE CASCADE,
        
	FOREIGN KEY (production_unit_id)
        REFERENCES ProductionUnit(id)
        ON DELETE CASCADE
);

CREATE TABLE Category(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    parent_category INT UNSIGNED,
    
    FOREIGN KEY (parent_category)
        REFERENCES Category(id)
        ON DELETE CASCADE
);

CREATE TABLE ProductCategory(
	product_id INT UNSIGNED,
    category_id INT UNSIGNED,
    
    FOREIGN KEY (product_id)
        REFERENCES Product(id)
        ON DELETE CASCADE,
        
    FOREIGN KEY (category_id)
        REFERENCES Category(id)
        ON DELETE CASCADE
);

CREATE TABLE CategoryAttribute(
    id INT UNSIGNED AUTO_INCREMENT,
    category_id INT UNSIGNED,
    title VARCHAR(255),
    content VARCHAR(255),
    
    PRIMARY KEY (id, category_id),
    
    FOREIGN KEY (category_id)
        REFERENCES Category(id)
        ON DELETE CASCADE
);


CREATE TABLE Comment(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED,
    product_id INT UNSIGNED,
    comment VARCHAR(1000),
    parent_comment INT UNSIGNED,
    date DATETIME,
    
    FOREIGN KEY (user_id)
        REFERENCES User(id)
        ON DELETE CASCADE,
        
	FOREIGN KEY (product_id)
        REFERENCES Product(id)
        ON DELETE CASCADE,
        
	FOREIGN KEY (parent_comment)
        REFERENCES Comment(id)
        ON DELETE CASCADE
);

CREATE TABLE ConsumerVote(
    consumer_id INT UNSIGNED,
    comment_id INT UNSIGNED,
    upvote BOOLEAN,

    PRIMARY KEY (consumer_id, comment_id),
    FOREIGN KEY (consumer_id)
    REFERENCES User(id)
    ON DELETE CASCADE,

    FOREIGN KEY (comment_id)
	REFERENCES Comment(id)
	ON DELETE CASCADE
);
	

CREATE TABLE Rating(
	id INT UNSIGNED AUTO_INCREMENT,
    consumer_id INT UNSIGNED, 
    producer_id INT UNSIGNED,
    product_id INT UNSIGNED,
    rating INT UNSIGNED,
    
    CONSTRAINT chk_rating CHECK (0 <= rating AND rating <= 5),
    
    PRIMARY KEY (id, consumer_id),
    
    FOREIGN KEY (consumer_id)
        REFERENCES User(id)
        ON DELETE CASCADE,
        
	FOREIGN KEY (producer_id)
        REFERENCES User(id)
        ON DELETE CASCADE,
	
    FOREIGN KEY (product_id)
        REFERENCES Product(id)
        ON DELETE CASCADE
);

CREATE TABLE Wishlist(
	id INT UNSIGNED AUTO_INCREMENT,
    consumer_id INT UNSIGNED,
    product_id INT UNSIGNED,
    
    PRIMARY KEY (id, consumer_id),
    
    FOREIGN KEY (consumer_id)
        REFERENCES User(id)
        ON DELETE CASCADE,
	
    FOREIGN KEY (product_id)
        REFERENCES Product(id)
        ON DELETE CASCADE
);

CREATE TABLE Cart(
	id INT UNSIGNED AUTO_INCREMENT,
    consumer_id INT UNSIGNED,
    order_date DATETIME,
    status ENUM('OPEN', 'AWAITING_PAYMENT', 'PROCESSING', 'CANCELLED', 'COMPLETE', 'FAILURE'),
    
    PRIMARY KEY (id, consumer_id),
    
    FOREIGN KEY (consumer_id)
        REFERENCES User(id)
        ON DELETE CASCADE
);

CREATE TABLE CartLine(
	cart_id INT UNSIGNED,
    product_id INT UNSIGNED, 
    status ENUM('OPEN', 'PROCESSING', 'AWAITING_TRANSPORT', 'TRANSPORT_IMMINENT', 'IN_TRANSIT', 'LAST_KM', 'COMPLETE', 'FAILURE', 'CANCELLED'),
    vehicle_id INT UNSIGNED,
    amount INT,
    
	PRIMARY KEY (cart_id, product_id),
    
    FOREIGN KEY (cart_id)
        REFERENCES Cart(id)
        ON DELETE CASCADE,
	
    FOREIGN KEY (product_id)
        REFERENCES Product(id)
        ON DELETE CASCADE,
	
	FOREIGN KEY (vehicle_id)
        REFERENCES Vehicle(id)
        ON DELETE CASCADE
);