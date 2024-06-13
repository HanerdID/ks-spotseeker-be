import argon2 from "argon2";
import Hangout from "../models/HangoutModel.js";

const hangoutController = {
  getAllHangouts: async (req, res) => {
    try {
      const hangouts = await Hangout.findAll();
      res.status(200).json(hangouts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getHangoutById: async (req, res) => {
    try {
      const { id } = req.params;
      const hangout = await Hangout.findByPk(id);
      if (!hangout) {
        return res.status(404).json({ message: "Hangout not found" });
      }
      res.status(200).json(hangout);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createHangout: async (req, res) => {
    try {
      const { name, description, location, imageUrl } = req.body;
      const hashedImageUrl = await argon2.hash(imageUrl);
      const hangout = await Hangout.create({
        name,
        description,
        location,
        imageUrl: hashedImageUrl,
      });
      res.status(201).json(hangout);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateHangout: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, location, imageUrl } = req.body;
      const hangout = await Hangout.findByPk(id);
      if (!hangout) {
        return res.status(404).json({ message: "Hangout not found" });
      }
      await hangout.update({ name, description, location, imageUrl });
      res.status(200).json(hangout);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteHangout: async (req, res) => {
    try {
      const { id } = req.params;
      const hangout = await Hangout.findByPk(id);
      if (!hangout) {
        return res.status(404).json({ message: "Hangout not found" });
      }
      await hangout.destroy();
      res.status(200).json({ message: "Hangout deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default hangoutController;
