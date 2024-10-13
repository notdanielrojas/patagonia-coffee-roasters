import pool from "./database.model";

interface UserPost {
  id?: number;
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

const editPostUser = async (id: number, user: UserPost): Promise<void> => {
  const { image_url, title, description } = user;
  const values = [image_url, title, description, id];
  const query = "UPDATE posts SET image_url = $1, title = $2, description = $3 WHERE id = $4";

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error("Error updating user post:", error);
    throw new Error("Failed to update post in database");
  }
};

const deletePostUser = async (id: number): Promise<void> => {
  const query = "DELETE FROM posts WHERE id = $1";

  try {
    await pool.query(query, [id]);
  } catch (error) {
    console.error("Error deleting user post:", error);
    throw new Error("Failed to delete post from database");
  }
};

export { postUser, getAllPosts, editPostUser, deletePostUser };
