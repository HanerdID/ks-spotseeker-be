import argon2 from "argon2";
import Destination from "../models/DestinationModel.js";

const destinationController = {
  getAllDestinations: async (req, res) => {
    try {
      const destinations = await Destination.findAll();
      res.status(200).json(destinations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getDestinationById: async (req, res) => {
    try {
      const { id } = req.params;
      const destination = await Destination.findByPk(id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.status(200).json(destination);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createDestination: async (req, res) => {
    try {
      const { name, description, location, imageUrl } = req.body;
      const hashedImageUrl = await argon2.hash(imageUrl);
      const destination = await Destination.create({
        name,
        description,
        location,
        imageUrl: hashedImageUrl,
      });
      res.status(201).json(destination);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateDestination: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, location, imageUrl } = req.body;
      const destination = await Destination.findByPk(id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      await destination.update({ name, description, location, imageUrl });
      res.status(200).json(destination);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteDestination: async (req, res) => {
    try {
      const { id } = req.params;
      const destination = await Destination.findByPk(id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      await destination.destroy();
      res.status(200).json({ message: "Destination deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default destinationController;
