import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";

export const loginOwner = async (req, res) => {
  const { email, password } = req.body;

  try {
    const owner = await Owner.findOne({ email });
    if (!owner || owner.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
