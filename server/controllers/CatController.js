import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// GET ALL CATS
// EVERY ONE

export const allCats = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

// CREATE CATEGORY
// ONLY ADMINS

export const createCategory = async (req, res) => {
  const { type, img } = req.body;
  try {
    const category = await prisma.category.create({
      data: {
        type,
        img,
      },
    });
    res.json({
      success: true,
      category,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

// UPDATE CATEGORY
// ONLY ADMINS

export const updateCategory = async (req, res) => {
  const { type, img, id } = req.body;

  try {
    const category = await prisma.category.update({
      where: {
        categoryId: Number(id),
      },
      data: {
        type,
        img,
      },
    });

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

// UPDATE CATEGORY
// ONLY ADMINS

export const deleteCategory = async (req, res) => {
  const { id } = req.body;
  try {
    const category = await prisma.category.delete({
      where: {
        categoryId: Number(id),
      },
    });

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};
