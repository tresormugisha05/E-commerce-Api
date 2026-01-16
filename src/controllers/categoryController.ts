/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Product categories management
 */

import { Request, Response } from "express";
import Category from "../models/Categories";
import dotenv from "dotenv";
dotenv.config();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 */
export const getCategories = async (_: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 */
export const createCategory = async (req: Request, res: Response) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
export const deleteCategory = async (req: Request, res: Response) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};
