const pool = require("./database.model");
const bcrypt = require("bcryptjs");

const verifyCredentials = async (email, password) => {
  const values = [email];
  const query = "SELECT * FROM usuarios WHERE email = $1";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(query, values);

  if (rowCount === 0) {
    throw { code: 401, message: "Email or password incorrect" };
  }

  const { password: encriptedPassword } = usuario;
  const passwordCorrect = bcrypt.compareSync(password, encriptedPassword);
  if (!passwordCorrect) {
    throw { code: 401, message: "Email or password incorrect" };
  }
};

module.exports = { verifyCredentials };
