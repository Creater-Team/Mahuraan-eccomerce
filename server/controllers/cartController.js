import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const addToCart = async (req, res) => {
  const { userId } = req.user;
  const { productId } = req.body;
  try {
    const product = await prisma.product.findFirst({
      where: {
        productId,
      },
    });
    const existingPro = await prisma.cart.findFirst({
      where: {
        productId,
        userId,
      },
      include: {
        products: true,
      },
    });
    if (existingPro) {
      const updatedPro = await prisma.cart.update({
        where: {
          id: existingPro.id,
        },
        data: {
          qty:
            existingPro.qty === product.inStock
              ? existingPro.qty
              : existingPro.qty + 1,
        },
        include: {
          products: true,
        },
      });
      res.json({
        updatedPro,
        productMax: updatedPro.qty === product.inStock,
        success: true,
      });
    } else {
      const newItem = await prisma.cart.create({
        data: {
          productId,
          userId,
        },
        include: {
          products: true,
        },
      });
      res.json({ newItem, success: true });
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const getMyCart = async (req, res) => {
  const { userId } = req.user;
  try {
    const myCart = await prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        products: true,
      },
    });
    res.json({ success: true, myCart });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const emptyMyCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const deleteMyCart = await prisma.cart.deleteMany({
      where: {
        userId,
      },
    });
    res.json({
      reset: true,
    });
  } catch (error) {}
};

export const deleteItem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { cartId } = req.body;

    const deleteMyCart = await prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
    res.json({
      delete: true,
      updated: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const decrementItem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { cartId } = req.body;

    const item = await prisma.cart.findFirst({
      where: {
        id: cartId,
      },
    });

    if (item.qty === 1) {
      deleteItem(req, res);
    } else {
      const updatedItem = await prisma.cart.update({
        where: {
          id: cartId,
        },
        data: {
          qty: item.qty - 1,
        },
      });
      res.json({
        updated: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
