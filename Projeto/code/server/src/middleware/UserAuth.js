const passport = require("passport");

  function checkAuthenticated(req, res, next)  {
    if (req.isAuthenticated()) { return next() }
    passport.authenticate("jwt", { session: false })(req, res, next);

  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

  function checkUsersIsProducer(req, res, next) {
    if (req.user.typeUser === "Producer") {
      return next();
    }
    res.status(401).send("Unauthorized");
  }

  function checkUsersIsConsumer(req, res, next) {
    if (req.user.typeUser === "Consumer") {
      return next();
    }
    res.status(401).send("Unauthorized");
  }

  function checkUsersIsAdmin(req, res, next) {
    if (req.user.typeUser === "Admin") {
      return next();
    }
    res.status(401).send("Unauthorized");
  }

  function checkUsersIsAdminOrProducer(req, res, next) {
    if (req.user.typeUser === "Admin" || req.user.typeUser === "Producer") {
      return next();
    }
    res.status(401).send("Unauthorized");
  }

  function checkUsersIsAdminOrConsumer(req, res, next) {
    if (req.user.typeUser === "Admin" || req.user.typeUser === "Consumer") {
      return next();
    }
    res.status(401).send("Unauthorized");
  }

  function checkUsersIsAdminOrProducerOrConsumer(req, res, next) {
    if (
      req.user.typeUser === "Admin" ||
      req.user.typeUser === "Producer" ||
      req.user.typeUser === "Consumer"
    ) {
      return next();
    }
    res.status(401).send("Unauthorized"); 
  }

  checkIfUserIsOwnerOfTheResource = (req, res, next) => {
    if (parseInt(req.user.id) === parseInt(req.params.id)) {
      return next();
    }
    res.status(401).send("Unauthorized");
  };

  module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    checkUsersIsProducer,
    checkUsersIsConsumer,
    checkUsersIsAdmin,
    checkUsersIsAdminOrProducer,
    checkUsersIsAdminOrConsumer,
    checkUsersIsAdminOrProducerOrConsumer,
    checkIfUserIsOwnerOfTheResource,
  };

