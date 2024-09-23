import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

// Use Patch method when updating a few fields and Use Put method when updating all the fields
router.put("/:id", updateProduct);


export default router;