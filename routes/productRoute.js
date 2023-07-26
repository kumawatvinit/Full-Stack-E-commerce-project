import express from "express";
import { isAdmin, requireSignin } from "./../middlewares/authMiddleware.js";
import {
  CreateProductController,
  DeleteProductController,
  GetAllProductsController,
  GetPhotoController,
  GetProductController,
  UpdateProductController,
} from "../controllers/productController.js";
// formidable is a Node.js module for parsing form data, especially file uploads.
import formidable from "express-formidable";

const router = express.Router();

// routes
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  CreateProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  UpdateProductController
);

// get all Products
router.get("/products", GetAllProductsController);

// get single product
router.get("/single-product/:slug", GetProductController);

// delete product
router.delete(
  "/delete-product/:pid",
  requireSignin,
  isAdmin,
  DeleteProductController
);

// get photo
router.get("/product-photo/:pid", GetPhotoController);

export default router;
