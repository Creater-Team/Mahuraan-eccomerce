import pkg from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/generateToken.js";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const userFunction = async (req, res) => {
  try {
    const { email, password, photo, username } = req.body;
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);

      if (checkPass) {
        const token = generateToken(user);
        res.json({
          userId: user.userId,
          username: user.userName,
          email: user.email,
          createdAt: user.createdAt,
          admin: user.previlage,
          photo: user.userPhoto,
          token,
        });
      }
    } else if (email === "sidiikpro@gmail.com") {
      const hashedPass = bcrypt.hashSync(password, 10);
      const newUser = await prisma.users.create({
        data: {
          email,
          userName: username,
          password: hashedPass,
          userPhoto: photo,
          external_auth: true,
          previlage: true,
        },
      });
      const token = generateToken(newUser);

      res.json({
        email: user.email,
        username: user.userName,
        photo: newUser.userPhoto,
        admin: user.previlage,
        createdAt: newUser.createdAt,
        token,
      });
    } else {
      const hashedPass = bcrypt.hashSync(password, 10);
      const newUser = await prisma.users.create({
        data: {
          email,
          userName: username,
          password: hashedPass,
          userPhoto: photo,
          external_auth: true,
        },
      });
      const token = generateToken(newUser);

      res.json({
        email: user.email,
        username: user.userName,
        photo: newUser.userPhoto,
        admin: user.previlage,
        createdAt: newUser.createdAt,
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// create review

export const createReview = async (req, res) => {
  const { userId } = req.user;

  const { productId, rating, body } = req.body;
  try {
    const checkReview = await prisma.reviews.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (checkReview) {
      const request = { ...req, id: checkReview.id };
      updateReview(request, res);
    } else {
      const newReview = await prisma.reviews.create({
        data: {
          body,
          rating: rating,
          productId,
          userId,
        },
      });
      res.json({ newReview, success: true });
    }
  } catch (error) {
    res.json({
      errors: error,
    });
    console.log(error);
  }
};

// update review

export const updateReview = async (req, res) => {
  const { productId, body, rating } = req.body;
  const { userId } = req.user;
  const { id } = req;
  try {
    const updatedReview = await prisma.reviews.update({
      where: {
        id: Number(id),
      },
      data: {
        body,
        rating,
        userId,
        productId,
      },
    });
    res.json({ updatedReview, success: true });
  } catch (err) {
    console.log(err);
  }
};

// all users
// only admins

export const allUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({});
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.json({
      success: true,
      error,
    });
  }
};

// update user

export const updateUser = async (req, res) => {
  const { userId, username, isAdmin } = req.body;
  try {
    const user = await prisma.users.update({
      where: {
        userId,
      },
      data: {
        userName: username,
        previlage: isAdmin,
      },
    });
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};
