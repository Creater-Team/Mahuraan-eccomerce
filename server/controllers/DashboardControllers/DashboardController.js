import pkg from "@prisma/client";
import moment from "moment";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const getInfo = async (req, res) => {
  // get total earnings
  const Earnings = await prisma.orders.findMany({
    where: {
      is_paid: true,
    },
  });
  const totalEarnings = Earnings.reduce((a, b) => a + b.items_price, 0);

  // get bending orders
  const bendingOrders = await prisma.orders.findMany({
    where: {
      is_delivered: false,
      is_paid: true,
    },
  });

  // total products
  const totalProducts = await prisma.product.findMany();

  //   average review of products

  const reviews = await prisma.reviews.findMany();
  const reviewsAvg = (
    reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
  ).toFixed(2);

  res.json({
    success: true,
    avgRev: Number(reviewsAvg),
    earnings: totalEarnings,
    bending: bendingOrders.length,
    products: totalProducts.length,
  });
};

export const chartInfo = async (req, res) => {
  try {
    const today = new Date();
    const lastMonth = moment().subtract(30, "days");

    const data = await prisma.orders.findMany({
      where: {
        createdAt: {
          gte: lastMonth.toISOString(),
          lt: today,
        },
      },
    });

    const groups = data.reduce((groups, orders) => {
      const date = orders.createdAt.toString().split("-")[0].split(" ")[2];

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(orders);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        orders: groups[date].length,
      };
    });
    res.json(groupArrays);
  } catch (error) {
    res.json(error);
  }
};
