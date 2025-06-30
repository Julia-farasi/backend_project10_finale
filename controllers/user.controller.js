import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// GET /user
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

// POST /user
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error("name, email and password are required");
      error.cause = { statusCode: 400 };
      throw error;
    }
    const found = await User.findOne({ where: { email } });
    if (found) {
      const error = new Error("User with that email already exists");
      error.cause = { statusCode: 409 };
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });

    // JWT erzeugen
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const { password: _removed, ...userWithoutPassword } = user.toJSON();

    res.status(201).json({
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.cause = { statusCode: 400 };
      throw error;
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.cause = { statusCode: 401 };
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.cause = { statusCode: 401 };
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const { password: _removed, ...userWithoutPassword } = user.toJSON();

    res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// GET /user/:id
const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      const error = new Error("User not found");
      error.cause = { statusCode: 404 };
      throw error;
    }

    const { password: _removed, ...userWithoutPassword } = user.toJSON();
    res.json({ user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

// PUT /user/:id
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      const error = new Error("User not found");
      error.cause = { statusCode: 404 };
      throw error;
    }

    await user.update(req.body);
    const { password: _removed, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

// DELETE /user/:id
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rowCount = await User.destroy({ where: { id } });

    if (!rowCount) {
      const error = new Error("User not found");
      error.cause = { statusCode: 404 };
      throw error;
    }

    res.status(204).json({ msg: "User deleted" });
  } catch (err) {
    next(err);
  }
};

export { getAllUsers, createUser, getOneUser, updateUser, deleteUser };
