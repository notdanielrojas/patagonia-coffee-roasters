import pool from "./database.model";
import bcrypt from "bcryptjs";

interface User {
  id: number;
  email: string;
  password: string;
}

const verifyCredentials = async (email: string, password: string): Promise<Omit<User, "password">> => {
  const values = [email];
  const query = "SELECT * FROM users WHERE email = $1";

  const { rows, rowCount } = await pool.query<User>(query, values);

  if (rowCount === 0) {
    throw { code: 401, message: "Email or password incorrect" };
  }

  const user: User = rows[0];
  const { password: encryptedPassword } = user;

  const passwordCorrect = bcrypt.compareSync(password, encryptedPassword);
  if (!passwordCorrect) {
    throw { code: 401, message: "Email or password incorrect" };
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export { verifyCredentials };
