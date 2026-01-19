import { Request, Response } from "express";
import { AuthRequest } from "../models/type";

export const uploadSingleFile = (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      url: `/uploads/${req.file.filename}`,
    };

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: fileInfo,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "File upload failed",
      error: error.message,
    });
  }
};
