require('dotenv').config();
const mongoose = require("mongoose");
const url = "mongodb+srv://nhatvuong99vn:nhatvuong99@cluster0.vypleto.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', true);

async function connect() {

	mongoose.connect(url, {
	},).then((res) => {
		console.log("Database connected");
	}).catch(error => {
		console.log(error);
	});
}

module.exports = { connect }