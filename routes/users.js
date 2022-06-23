const express = require("express");
//const router  =  express.Router();
const router = require("express-promise-router")();
const userControllers = require("../controllers/users");

const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(userControllers.index)
  .post(validateBody(schemas.userSchema), userControllers.newUser);

router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), userControllers.getUser)
  .put(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userSchema),
    ],
    userControllers.replaceUser
  )
  .patch(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userSchemaOptional),
    ],
    userControllers.updateUser
  )
  .delete(userControllers.deleteUser);

router
  .route("/:userId/cars")
  .get(validateParam(schemas.idSchema, "userId"), userControllers.getUserCars)
  .post(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userCarSchema),
    ],
    userControllers.newUserCar
  );

module.exports = router;
