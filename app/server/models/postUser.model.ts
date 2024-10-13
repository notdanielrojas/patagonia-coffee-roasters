import pool from "./database.model";

interface UserPost {
  image_url: string;
  title: string;
  description: string;
}

const postUser = async (user: UserPost): Promise<void> => {
  const { image_url, title, description } = user;
  const values = [image_url, title, description];
  const query = "INSERT INTO posts (image_url, title, description) VALUES ($1, $2, $3)";

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error("Error inserting user post:", error);
    throw new Error("Failed to insert post into database");
  }
};

const getAllPosts = async (): Promise<UserPost[]> => {
  const result = await pool.query<UserPost>("SELECT * FROM posts");
  return result.rows;
};

export { postUser, getAllPosts };
