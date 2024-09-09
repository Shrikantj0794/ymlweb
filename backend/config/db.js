const mongoose = require('mongoose');
// PASSWORD = RJpjU2f9zMMwtWYK
// DB_URI = mongodb+srv://root:RJpjU2f9zMMwtWYK@cluster0.4ezgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://root:RJpjU2f9zMMwtWYK@cluster0.4ezgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
