 function test (req, res, next) {
  console.log("test");
  res.locals.t = "##############################################################"
  console.log();
  return next();
}

module.exports = {test};