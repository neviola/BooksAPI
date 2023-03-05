const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    yearReleased: {
        type: Number,
        required: true
    },
    authors: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        maxLength: 1000
    }
});

module.exports = mongoose.model('Book', bookSchema);