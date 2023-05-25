CREATE TABLE Address(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    postal_code VARCHAR(100) NOT NULL
);

# User related ---------------------------------------------------------------
CREATE TABLE User(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    fiscal_identifier VARCHAR(255),
    address_id INT UNSIGNED,
    phone VARCHAR(255),
    typeUser ENUM('Consumer', 'Producer', 'Admin'),
    FOREIGN KEY (address_id) REFERENCES Address(id) ON DELETE
    SET
        NULL
);

CREATE TABLE Credentials(
    user_id INT UNSIGNED PRIMARY KEY,
    provider VARCHAR(8),
    value VARCHAR(60),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE ProductionUnit(
    id INT UNSIGNED,
    producer_id INT UNSIGNED,
    capacity INT UNSIGNED NOT NULL CHECK (capacity > 0),
    address_id INT UNSIGNED,
    PRIMARY KEY (producer_id, id),
    INDEX (id),
    FOREIGN KEY (address_id) REFERENCES Address(id) ON DELETE
    SET
        NULL,
        FOREIGN KEY (producer_id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE Vehicle(
    id INT UNSIGNED AUTO_INCREMENT,
    production_unit_id INT UNSIGNED,
    producer_id INT UNSIGNED,
    license_plate VARCHAR(32) NOT NULL,
    capacity INT UNSIGNED NOT NULL CHECK (capacity > 0),
    PRIMARY KEY (id),
    FOREIGN KEY (producer_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (production_unit_id) REFERENCES ProductionUnit(id) ON DELETE
    SET
        NULL
);

# ----------------------------------------------------------------------------
# Product related ------------------------------------------------------------
CREATE TABLE Product(
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    barcode_id VARCHAR(13),
    producer_id INT UNSIGNED NOT NULL,
    price INT NOT NULL CHECK (price > 0),
    production_date DATETIME NOT NULL,
    PRIMARY KEY (id, producer_id),
    FOREIGN KEY (producer_id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE ProductImage(
    id INT UNSIGNED AUTO_INCREMENT,
    product_id INT UNSIGNED NOT NULL,
    uri VARCHAR(255) NOT NULL,
    PRIMARY KEY (id, product_id),
    FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE
);

# ----------------------------------------------------------------------------
CREATE TABLE ProductProductionUnit(
    product_id INT UNSIGNED,
    production_unit_id INT UNSIGNED,
    amount INT NOT NULL CHECK (amount >= 0),
    PRIMARY KEY (product_id, production_unit_id),
    FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE
);

CREATE TABLE Category(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_category INT UNSIGNED,
    FOREIGN KEY (parent_category) REFERENCES Category(id) ON DELETE CASCADE
);

CREATE TABLE ProductCategory(
    product_id INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE
);

CREATE TABLE CategoryAttribute(
    id INT UNSIGNED AUTO_INCREMENT,
    category_id INT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY (id, category_id),
    FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE
);

CREATE TABLE ProductAttribute(
    product_id INT UNSIGNED NOT NULL,
    attribute_id INT UNSIGNED NOT NULL,
    content VARCHAR(255) NOT NULL,
    PRIMARY KEY (product_id, attribute_id),
    FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES CategoryAttribute(id) ON DELETE CASCADE
);

CREATE TABLE Comment(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    comment VARCHAR(1000) NOT NULL,
    parent_comment INT UNSIGNED,
    date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment) REFERENCES Comment(id) ON DELETE CASCADE
);

CREATE TABLE ConsumerVote(
    consumer_id INT UNSIGNED,
    comment_id INT UNSIGNED,
    upvote BOOLEAN NOT NULL,
    PRIMARY KEY (consumer_id, comment_id),
    FOREIGN KEY (consumer_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES Comment(id) ON DELETE CASCADE
);

CREATE TABLE Rating(
    id INT UNSIGNED AUTO_INCREMENT,
    consumer_id INT UNSIGNED NOT NULL,
    producer_id INT UNSIGNED,
    product_id INT UNSIGNED,
    rating INT UNSIGNED NOT NULL,
    CONSTRAINT chk_rating CHECK (
        0 < rating
        AND rating <= 5
    ),
    PRIMARY KEY (id, consumer_id),
    FOREIGN KEY (consumer_id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE Wishlist(
    id INT UNSIGNED AUTO_INCREMENT,
    consumer_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id, consumer_id),
    FOREIGN KEY (consumer_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE
);

CREATE TABLE Cart(
    id INT UNSIGNED AUTO_INCREMENT,
    consumer_id INT UNSIGNED NOT NULL,
    order_date DATETIME,
    delivery_date DATETIME,
    status ENUM(
        'OPEN',
        'AWAITING_PAYMENT',
        'PROCESSING',
        'CANCELLED',
        'COMPLETE',
        'FAILURE'
    ) NOT NULL,
    PRIMARY KEY (id, consumer_id),
    FOREIGN KEY (consumer_id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE CartLine(
    cart_id INT UNSIGNED,
    product_id INT UNSIGNED NOT NULL,
    status ENUM(
        'OPEN',
        'PROCESSING',
        'AWAITING_TRANSPORT',
        'TRANSPORT_IMMINENT',
        'IN_TRANSIT',
        'LAST_KM',
        'COMPLETE',
        'FAILURE',
        'CANCELLED'
    ) NOT NULL,
    vehicle_id INT UNSIGNED,
    amount INT NOT NULL CHECK (amount > 0),
    delivery_date DATETIME,
    PRIMARY KEY (cart_id, product_id),
    FOREIGN KEY (cart_id) REFERENCES Cart(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE NO ACTION,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicle(id) ON DELETE NO ACTION
);

CREATE TABLE Notification(
    id INT UNSIGNED AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    description VARCHAR(1000),
    seen BOOLEAN NOT NULL,
    PRIMARY KEY (id, user_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);