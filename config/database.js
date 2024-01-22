require('dotenv').config();
const mongoose = require("mongoose");
const url = "mongodb+srv://nhatvuong99vn:nhatvuong99@cluster0.vypleto.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', true);

async function connect() {
	try {
		await mongoose.connect(url,{
		});
		console.log("database connected");
	} catch (error) {
		console.error("error: " + error);
	}
}
module.exports = { connect }