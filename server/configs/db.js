const mongoose = require("mongoose");

const connect = async () => {
    try {
        const username = encodeURIComponent(process.env.MONGODB_USER_NAME);
        const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
        const uri = `mongodb+srv://${username}:${password}@cluster0.ymqqd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connect;
