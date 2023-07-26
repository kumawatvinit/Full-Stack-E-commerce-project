import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";

export const CreateProductController = async (req, res) => {
  try {
    // console.log(req.fields);

    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      case !description:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Description is required",
        });
      case !price:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Price is required",
        });
      case !category:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Category is required",
        });
      case !quantity:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Quantity is required",
        });
      case !photo:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      case photo.size > 1024 * 1024 * 2:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Image size should be less than 2MB",
        });
    }

    // check for existing product
    const existingProduct = await productModel.findOne({ name });

    if (existingProduct) {
      // removeTmp(photo.path);
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error in product creation",
      error,
    });
  }
};

export const UpdateProductController = async (req, res) => {
  try {
    // console.log(req.fields);

    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      case !description:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Description is required",
        });
      case !price:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Price is required",
        });
      case !category:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Category is required",
        });
      case !quantity:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Quantity is required",
        });
      case !photo.size>0:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      case photo.size > 1024 * 1024 * 2:
        // removeTmp(photo.path);
        return res.status(400).json({
          success: false,
          message: "Image size should be less than 2MB",
        });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    return res.status(201).json({
      success: true,
      message: "Product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error in product update",
      error,
    });
  }
};

export const GetAllProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: products.length,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

export const GetProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error in getting product",
      error,
    });
  }
};

export const DeleteProductController = async (req, res) => {
  try {
    const pid = req.params.pid;

    const existingProduct = await productModel.findById(pid);

    if (!existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product does not exist",
      });
    }

    await productModel.findByIdAndDelete(pid).select("-photo");

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

// get photo
export const GetPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product does not exist",
      });
    }

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }

    return res.status(400).json({
      success: false,
      message: "No photo found",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: fakse,
      message: "Error in getting photo",
      error,
    });
  }
};
