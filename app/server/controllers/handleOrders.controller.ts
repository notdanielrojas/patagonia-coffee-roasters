import { Request, Response } from "express";
import { createOrder, addOrderDetails } from "../models/orders.model";

const HandleCreateOrder = async (req: Request, res: Response): Promise<void> => {
  const { user_id, cart } = req.body;

  if (!user_id || !cart || cart.length === 0) {
    res.status(400).json({ message: "Invalid order request" });
    return;
  }

  try {
    const total = cart.reduce(
      (acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity,
      0
    );

    const order_id = await createOrder({ user_id, total, status: "pending" });

    for (const item of cart) {
      await addOrderDetails({
        order_id,
        image_url: item.image_url,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      });
    }

    res.status(201).json({ message: "Order created successfully", order_id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

export { HandleCreateOrder };
