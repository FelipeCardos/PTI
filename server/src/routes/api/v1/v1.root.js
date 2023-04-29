const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the LocalShop API!'});
});

const Auth = require('./Auth/Auth.root');
router.use('/auth', Auth);

// const Cart = require('./Cart/Carts.root');
// router.use('/carts', Cart);

// const Cartline = require('./CartLine/CartLines.root');
// router.use('/cartLines', Cartline);

// const Category = require('./Category/Categories.root');
// router.use('/categories', Category);

// const Categoryattribute = require('./CategoryAttribute/CategoryAttributes.root');
// router.use('/categoryAttributes', Categoryattribute);

// const Comment = require('./Comment/Comments.root');
// router.use('/comments', Comment);

// const Consumervote = require('./ConsumerVote/ConsumerVotes.root');
// router.use('/consumerVotes', Consumervote);

const Product = require('./Product/Products.root');
router.use('/products', Product);

// const Productcategory = require('./ProductCategory/ProductCategories.root');
// router.use('/productCategories', Productcategory);

// const Productimage = require('./ProductImage/ProductImages.root');
// router.use('/productImages', Productimage);

const Productionunit = require('./ProductionUnit/ProductionUnits.root');
router.use('/productionUnits', Productionunit);

// const Productproductionunit = require('./ProductProductionUnit/ProductProductionUnits.root');
// router.use('/productProductionUnits', Productproductionunit);

// const Rating = require('./Rating/Ratings.root');
// router.use('/ratings', Rating);

const User = require('./User/Users.root');
router.use('/users', User);

// const Vehicle = require('./Vehicle/Vehicles.root');
// router.use('/vehicles', Vehicle);

// const Wishlist = require('./Wishlist/Wishlists.root');
// router.use('/wishlists', Wishlist);

const Payment = require('./Payment/Payment.root');
router.use('/payment', Payment);

module.exports = router;