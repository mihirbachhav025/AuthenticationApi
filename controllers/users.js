const User = require("../models/user");
const Car = require("../models/car");
const Joi = require("joi");

module.exports = {
   //done 
  index: async (req, res, next) => {
    //using the new router
    const users = await User.find({});
    res.status(200).json(users);
  },
  //done
  newUser: async (req, res, next) => {
    console.log('req.value',req.value);
    const newUser = new User(req.value.body);
    const user = await newUser.save();
    return res.status(201).json(user);
  },
  //done
  getUser: async (req, res, next) => {
    //    const userId  = request.params.userId;
    // const result =idSchema.validate(req.params);
    // console.log('result',result) ;
    //old way  const {userId} = req.params;
    //new way
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },
  replaceUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const newUser = req.value.body;
    console.log(userId, newUser);
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },
  updateUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const newUser = req.value.body;
    console.log(userId, newUser);
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },
  deleteUser: async (req, res, next) => {
    const { userId } = req.params;
    const result = User.findByIdAndDelete(userId);
    res.status(200).json({ success: true });
  },
  getUserCars: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate("cars");
    res.status(200).json(user.cars);
  },
  newUserCar: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    const newCar = new Car(req.value.body);
    newCar.seller = user;
    await newCar.save();
    user.cars.push(newCar);
    await user.save();
    res.status(201).json(newCar);
  },
};
