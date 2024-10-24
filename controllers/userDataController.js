// controllers/userDataController.js
const UserData = require("../models/userData");

// Add or update user data
const addOrUpdateUserData = async (req, res) => {
	const userId = req.user; // This comes from the auth middleware
	const { age, weight, height, weightGoal, dietaryRestrictions, allergies } = req.body;

	try {
		// Upsert: Update if exists, otherwise create new
		const userData = await UserData.findOneAndUpdate(
			{ userId },
			{ age, weight, height, weightGoal, dietaryRestrictions, allergies },
			{ upsert: true, new: true }
		);
		
		res.status(200).json(userData);
	} catch (error) {
		console.error("Error updating user data:", error);
		res.status(500).json({ msg: "Server error" });
	}
};

// Get user data
const getUserData = async (req, res) => {
	const userId = req.user; // This comes from the auth middleware

	try {
		const userData = await UserData.findOne({ userId });
		if (!userData) {
			return res.status(404).json({ msg: "User data not found" });
		}

		res.status(200).json(userData);
	} catch (error) {
		console.error("Error fetching user data:", error);
		res.status(500).json({ msg: "Server error" });
	}
};

module.exports = { addOrUpdateUserData, getUserData };
