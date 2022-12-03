import pkg from "@prisma/client";
import cloudinary from "../utils/config/cloudinary.js";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// GET ALL PRODUCTS
// EVERY ONE

export const getProducts = async (req, res) => {
  try {
    const allProducts = await prisma.product.findMany({
      include: {
        reviews: true,
        category: true,
      },
    });

    res.json({
      success: true,
      allProducts,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: error,
    });
  }
};

// GET CATS
// ADMINS ONLY

export const getCats = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.json(error);
  }
};

// GET ONE PRODUCT
// EVERY ONE

export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.product.findFirst({
      where: {
        productId: Number(id),
      },
      include: {
        reviews: true,
        category: true,
      },
    });

    const allReviews = result.reviews.length;
    const totalReviews = result.reviews.reduce((a, b) => a + b.rating, 0);
    const average = totalReviews / allReviews;

    res.json({
      success: true,
      result,
      average,
      allReviews,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: error,
    });
  }
};

// GET ALL REVIEWS OF PRODUCT
// EVERY ONE

export const getReviewsOfProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const allReviews = await prisma.reviews.findMany({
      where: {
        productId: Number(id),
      },
      include: {
        users: true,
      },
    });
    res.json({ success: true, allReviews });
  } catch (error) {
    res.json({
      success: false,
      msg: error,
    });
  }
};

// CREATE PRODUCT
//  ONLY ADMIN

export const createProduct = async (req, res) => {
  const { title, description, price, inStock, categoryId } = req.body;
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: Number(price),
        inStock: Number(inStock),
        categoryId: categoryId ? Number(categoryId) : 1,
        image: result.secure_url,
        imgId: result.public_id,
        adminUser: Number(req.user.userId),
      },
    });
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({
      errors: {
        msg: error,
      },
    });
  }
};

// UPDATE PRDOUCT
//  ONLY ADMIN

export const updateProduct = async (req, res) => {
  const { title, description, price, inStock } = req.body;

  if (req.file) {
    try {
      const updatingProduct = await prisma.product.findFirst({
        where: {
          productId: Number(req.params.id),
        },
      });

      await cloudinary.uploader.destroy(updatingProduct.imgId);
      const result = await cloudinary.uploader.upload(req.file.path);

      const product = await prisma.product.update({
        where: {
          productId: Number(req.params.id),
        },
        data: {
          title,
          description,
          price: Number(price),
          inStock: Number(inStock),
          image: result.secure_url,
          imgId: result.public_id,
        },
      });
      res.json({
        success: true,
        product,
      });
    } catch (error) {
      console.log(error);
      res.json({
        errors: {
          msg: error,
        },
      });
    }
  } else {
    try {
      const product = await prisma.product.update({
        where: {
          productId: Number(req.params.id),
        },
        data: {
          title,
          description,
          price: Number(price),
          inStock: Number(inStock),
        },
      });
      res.json({
        success: true,
        product,
      });
    } catch (error) {
      console.log(error);
      res.json({
        errors: {
          msg: error,
        },
      });
    }
  }
};

// remove item

export const deleteItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const deletingItem = await prisma.product.delete({
      where: {
        productId,
      },
    });
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};
