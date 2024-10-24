// models/userData.js
const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		age: {
			type: Number,
			required: true,
		},
		weight: {
			type: Number,
			required: true,
		},
		height: {
			type: Number,
			required: true,
		},
		weightGoal: {
			type: String,
			required: true,
		},
		dietaryRestrictions: {
			type: String, // Array to store multiple dietary restrictions
			default: "",
		},
		allergies: {
			type: String, // Array to store multiple allergies
			default: "",
		},
	},
	{ timestamps: true }
);

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
