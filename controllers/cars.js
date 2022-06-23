const Car = require("../models/car");
const User = require("../models/user");
const users = require("./users");
module.exports = {
  index: async (req, res, next) => {
    const cars = await Car.find({});
    res.status(200).json(cars);
  },
  newCar: async (req, res, next) => {
    //1.find the actual seller
    console.log(req.value);
    const seller = await User.findById(req.value.body.seller);

    //create new car
    const newCar = req.value.body;
    delete newCar.seller;
    const car = new Car(newCar);
    car.seller = seller;
    await car.save();

    //add car to seller
    seller.cars.push(car);
    await seller.save();

    res.status(200).json(car);
  },
  getCar: async (req, res, next) => {
    const car = await Car.findById(req.value.params.carId);
    res.status(200).json(car);
  },
  replaceCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;
    const result = await Car.findByIdAndUpdate(carId, newCar);
    res.status(200).json({ successs: true });
  },
  updateCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;
    const result = await Car.findByIdAndUpdate(carId, newCar);
    res.status(200).json({ successs: true });
  },
  deleteCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "car doesnt exist" });

    const sellerId = car.seller;
    const seller = await User.findById(sellerId);
    await car.remove();
    seller.cars.pull(car);
    await seller.save();
    return res.status(200).json({ success: true });
  },
};
