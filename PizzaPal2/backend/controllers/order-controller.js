const HttpError = require('../utils/http-error');
const mongoose = require("mongoose");
const User = require("../models/user");
const Order = require('../models/order');

const orderController = {
  async createOrder(request, response, next) {

    const createdOrder = new Order(request.body);

    let user;
    try {
      user = await User.findById(createdOrder.userId);
    } catch (err) {
      const error = new HttpError(
        "Creating order failed, please try again",
        500
      );
      return next(error);
    }

    if (!user) {
      const error = new HttpError("Could not find user for provided id", 404);
      return next(error);
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdOrder.save({ session: sess });
      user.orders.push(createdOrder);
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Creating order failed, please try again.",
        500
      );
      return next(error);
    }

    response.status(201).json({ order: createdOrder });
  },

  async getOrdersByUserId(request, response, next) {
    const userId = request.params.uid;

    let userOrders;
    try {
      userOrders = await User.findById(userId).populate("orders");
    } catch (err) {
      const error = new HttpError(
        "Fetching orders failed, please try again later",
        500
      );
      return next(error);
    }
    if (!userOrders.orders || userOrders.orders.length === 0) {
      return next(
        new HttpError("Could not find any orders for this user.", 404)
      );
    }

    response.json({
      orders: userOrders.orders.map((order) =>
        order.toObject({ getters: true })
      ),
    });
  },
      
      async getAllOrders(request, response, next) {
        let orders;
  
        try{
          orders = await Order.find({});
        } catch (err) {
            const error = new HttpError(
              'Fetching orders failed, please try again later.',
              500
            );
          return next(error);
        }
  
        if (!orders || orders.length === 0) {
          const error =  new HttpError('We couldn\'t find any orders', 404);
          return next(error);
        }

        response.status(200).json({orders: orders.map(order => order.toObject({getters:true}))});
      },

};

module.exports = orderController;