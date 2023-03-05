const Book = require('../model/Book');

// server respondes in json format

// GET req
const getAllBooks = async (req, res) => {
    const books = await Book.find();
    if (!books) return res.status(204).json({'message': 'No books found'});
    res.json(books);
}

// POST req
const createNewBook = async (req, res) => {
    if (!req?.body?.title || !req?.body?.yearReleased || !req?.body?.authors) {
        res.status(400).json({'message': 'Title, yearReleased and authors are required'});
    }
    try {
        const result = await Book.create({
            title : req.body.title,
            yearReleased: req.body.yearReleased,
            authors: req.body.authors,
            description: req.body.description
        });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
    }
}

// update by mongo ID
const updateBook = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message': 'ID is required'});
    }
    const book = await Book.findOne({ _id: req.body.id }).exec();
    if (!book) {
        return res.status(204).json({'message': `No book matches this ID ${req.body.id}`});
    }
    // if any of these exist, it will be upadated
    if (req.body?.title) book.title = req.body.title;
    if (req.body?.yearReleased) book.yearReleased = req.body.yearReleased;
    if (req.body?.authors) book.authors = req.body.authors;
    if (req.body?.description) book.description = req.body.description;
    
    const result = await book.save();
    res.json(result);
}

const deleteBook = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({'message': 'ID is required'});
    const book = await Book.findOne({ _id: req.body.id }).exec();
    if (!book) {
        return res.status(204).json({'message': `No book matches this ID ${req.body.id}`});
    }
    const result = await Book.deleteOne({ _id: req.body.id });
    res.json(result);
}

// by ID in URL
const getBook = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({'message': 'Book ID required'});
    const book = await Book.findOne({ _id: req.params.id}).exec();
    if (!book) {
        return res.status(204).json({'message': `No book matches this ID ${req.params.id}`});
    }
    res.json(book);
}

module.exports = { getAllBooks, createNewBook, updateBook, deleteBook, getBook}