import pool from "./database.model";
import bcrypt from "bcryptjs";

interface User {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

interface UserRow {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
}

interface UserPost {
  user_id: number;
  selected_coffee: string;
  review: string;
  rating: number;
}

const getUserByEmail = async (email: string): Promise<UserRow> => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const { rows } = await pool.query<UserRow>(query, values);

    if (rows.length === 0) {
      throw { code: 404, message: "User not found" };
    }

    return rows[0];
  } catch (error: any) {
    throw {
      code: error.code || 500,
      message: error.message || "Error retrieving user",
    };
  }
};

const getUserById = async (id: number): Promise<UserRow | null> => {
  const result = await pool.query<UserRow>("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows[0] || null;
};

const registerUser = async (user: User): Promise<void> => {
  let { name, last_name, email, password } = user;
  const encriptedPassword = bcrypt.hashSync(password);
  password = encriptedPassword;
  const values = [name, last_name, email, encriptedPassword];
  const query = "INSERT INTO users (name, last_name, email, password) VALUES ($1, $2, $3, $4)";

  await pool.query(query, values);
};

/* const postUser = async (user: UserPost): Promise<void> => {
  const { user_id, selected_coffee, review, rating } = user;
  const values = [user_id, selected_coffee, review, rating];
  const query = "INSERT INTO posts (user_id, selected_coffee, review, rating) VALUES ($1, $2, $3, $4)";

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error("Error inserting user post:", error);
    throw new Error("Failed to insert post into database");
  }
}; */

export { getUserById, getUserByEmail, registerUser, /* postUser  */};
