import { Router, Request, Response } from "express";
import { HandleCreateOrder } from "../controllers/handleOrders.controller";
import { addOrderDetails } from "../models/orders.model";
import { handleErrors } from "../utils/codes.utils";

const router = Router();

router.post("/orders", async (req: Request, res: Response): Promise<void> => {
  try {
    await HandleCreateOrder(req, res);
  } catch (error: any) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.post("/:orderId/details", async (req: Request, res: Response): Promise<void> => {
  const { orderId } = req.params;
  const details = req.body;

  try {
    await addOrderDetails({ order_id: parseInt(orderId), ...details });
    res.status(201).json({ message: "Order details added successfully" });
  } catch (error: any) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

export default router;
