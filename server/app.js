import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// ROUTES
import productsRoute from "./routes/productsRoute.js";
import usersRoute from "./routes/userRoute.js";
import catsRoute from "./routes/CategoryRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import FeaturedInfoRoute from "./routes/DashboardRoutes/featuredInfoRoute.js";
import cartRoute from "./routes/CartRoute.js";
// ROUTES

// server
const app = express();

//
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// apis;
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/cart", cartRoute);
app.use("/api/cat", catsRoute);
app.use("/api/orders", orderRoutes);
app.use("/api/featured-info", FeaturedInfoRoute);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT || 5000, () =>
  console.log("SERVING ON PORT ", process.env.PORT)
);
