import pool from "./database.model";

interface OrderDetails {
  order_id: number;
  product_name: string;
  quantity: number;
  price: number;
  image_url: string;
}

interface Order {
  user_id: number;
  total: number;
  status: string;
}

const createOrder = async (order: Order): Promise<number> => {
  const { user_id, total, status } = order;
  const query = `
    INSERT INTO orders (user_id, total, status)
    VALUES ($1, $2, $3) RETURNING id
  `;
  const values = [user_id, total, status];
  const result = await pool.query(query, values);
  return result.rows[0].id;
};

const addOrderDetails = async (details: OrderDetails): Promise<void> => {
  const { order_id, image_url, product_name, quantity, price } = details;
  const query = `
    INSERT INTO order_details (order_id, image_url, product_name, quantity, price)
    VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [order_id, image_url, product_name, quantity, price];
  await pool.query(query, values);
};

export { createOrder, addOrderDetails };
