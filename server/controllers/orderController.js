import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
import Stripe from "stripe";
import { emptyMyCart } from "./cartController.js";

const stripe = new Stripe(process.env.stripe_sec);

// pay order

export const payOrder = async (req, res) => {
  const { id, amount, description } = req.body;
  try {
    stripe.charges.create(
      {
        source: id,
        amount: Math.round(amount * 100),
        currency: "USD",
        description: description,
      },
      (err, response) => {
        if (!err) {
          createOrder(req, res);
        } else {
          res.json(err + " error");
        }
      }
    );
  } catch (err) {
    res.json(err.message);
  }
};

//  create order

export const createOrder = async (req, res) => {
  const {
    shippingPrice,
    products,
    totalPrice,
    shippingAddress,
    itemsPrice,
    tax_price,
    phone_number,
  } = req.body;

  const { userId } = req.user;

  try {
    const newOrder = await prisma.orders.create({
      data: {
        userId: Number(userId),
        shipping_price: Number(shippingPrice),
        products: products,
        totalPrice: parseFloat(totalPrice),
        shipping_address: shippingAddress,
        tax_price: parseFloat(tax_price),
        items_price: parseFloat(itemsPrice),
        phone_number,
        is_paid: true,
        paidAt: new Date(),
      },
    });
    if (newOrder) {
      emptyMyCart(req, res);
      res.json({
        success: true,
        newOrder,
      });

      products &&
        products.map(async (x) => {
          const pro = await prisma.product.findFirst({
            where: {
              productId: x.productId,
            },
          });

          await prisma.product.update({
            where: {
              productId: x.productId,
            },
            data: {
              inStock: pro.inStock - x.qty,
            },
          });
        });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error,
    });
  }
};

//  GET ONE ORDER

export const findOrder = async (req, res) => {
  try {
    const order = await prisma.orders.findFirst({
      where: {
        orderId: Number(req.params.id),
        userId: req.user.userId,
      },
      include: {
        users: true,
      },
    });
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

// GET ALL ORDERS
// BY ADMIN

export const allOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        users: true,
      },
    });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

export const deliveredOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        is_delivered: true,
      },
      include: {
        users: true,
      },
    });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({
      success: true,
      orders,
    });
  }
};
export const unDelivered = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        is_delivered: false,
      },
      include: {
        users: true,
      },
    });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({
      success: true,
      orders,
    });
  }
};

export const ordersPercentage = async (req, res) => {
  try {
    const allOrders = await prisma.orders.findMany();

    if (!allOrders) return;

    const deliveredOrders =
      (allOrders.filter((x) => x.is_delivered).length / allOrders.length) * 100;
    const undeliveredOrders =
      (allOrders.filter((x) => !x.is_delivered).length / allOrders.length) *
      100;

    console.log(Math.round(undeliveredOrders));
  } catch (error) {}
};

// GET ORDER
// ONLY ADMIN

export const getOrder = async (req, res) => {
  try {
    const order = await prisma.orders.findFirst({
      where: {
        orderId: Number(req.params.id),
      },
      include: {
        users: true,
      },
    });

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};

export const setOrderToDelivery = async (req, res) => {
  const { payment, delivery } = req.body;
  try {
    const order = await prisma.orders.update({
      where: {
        orderId: Number(req.params.id),
      },
      data: {
        is_paid: payment,
        is_delivered: delivery,
      },
      include: {
        users: true,
      },
    });

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};
