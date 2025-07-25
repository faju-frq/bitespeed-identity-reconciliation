import { Request, Response, NextFunction } from "express";

export async function validateInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, phoneNumber } = req.body;
  if (!email && !phoneNumber) {
    return res.status(400).json({
      message: "Either email or phone number must be provided.",
    });
  }
  next();
}
