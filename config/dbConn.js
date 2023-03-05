const mongoose = require('mongoose');
// DATABASE_URI="mongodb+srv://nevio:test_123@cluster0.x5dj68f.mongodb.net/BooksDB?retryWrites=true&w=majority"
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,     // to prevent warnings from mongoDB
            useNewUrlParser: true
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB