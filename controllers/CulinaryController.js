// import argon2 from "argon2";
// import Culinary from "../models/CulinaryModel.js";

// const culinaryController = {
//   getAllCulinary: async (req, res) => {
//     try {
//       const culinary = await Culinary.findAll();
//       res.status(200).json(culinary);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   },

//   getCulinaryById: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const culinary = await Culinary.findByPk(id);
//       if (!culinary) {
//         return res.status(404).json({ message: "Culinary not found" });
//       }
//       res.status(200).json(culinary);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   },

//   createCulinary: async (req, res) => {
//     try {
//       const { name, description, location, imageUrl } = req.body;
//       const hashedImageUrl = await argon2.hash(imageUrl);
//       const culinary = await Culinary.create({
//         name,
//         description,
//         location,
//         imageUrl: hashedImageUrl,
//       });
//       res.status(201).json(culinary);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   },

//   updateCulinary: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { name, description, location, imageUrl } = req.body;
//       const culinary = await Culinary.findByPk(id);
//       if (!culinary) {
//         return res.status(404).json({ message: "Culinary not found" });
//       }
//       await culinary.update({ name, description, location, imageUrl });
//       res.status(200).json(culinary);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   },

//   deleteCulinary: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const culinary = await Culinary.findByPk(id);
//       if (!culinary) {
//         return res.status(404).json({ message: "Culinary not found" });
//       }
//       await culinary.destroy();
//       res.status(200).json({ message: "Culinary deleted successfully" });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   },
// };

// export default culinaryController;
