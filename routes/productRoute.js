import express from "express";
import { isAdmin, requireSignin } from "./../middlewares/authMiddleware.js";
import {
  CreateProductController,
  DeleteProductController,
  GetAllProductsController,
  GetPhotoController,
  GetProductController,
  UpdateProductController,
  ProductFilterController,
  TotalProductsController,
  ProductPerPageController,
  SearchProductController,
  RelatedProductController,
  CategoriesWithProductCountController,
  ProductByCategoryController,
  TotalProductsCountByCategoryController,
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

// filter product
router.post("/product-filter", ProductFilterController);

// total products
router.get("/total-products", TotalProductsController);

// products by page
router.get("/products/:page", ProductPerPageController);

// search
router.get("/search/:keyword", SearchProductController);

// similar products
router.get("/related-products/:pid", RelatedProductController);

// count products by category
router.get("/category-with-product-count/", CategoriesWithProductCountController);

// products by category
router.get("/products-by-category/:slug/:page", ProductByCategoryController);

// total product count by category
router.get("/total-products-by-category/:slug", TotalProductsCountByCategoryController);

export default router;
