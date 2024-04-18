const Book = require("../models/book");

const getAllBooks = async(req , res)=>{
    try{
    const books = await Book.find({});
    res.status(200).json({books});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
    
}

const getOneBook = async(req , res) =>{
    try{
        const {id} = req.params ;
        const book = await Book.findById(id);
        res.status(200).json({book});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

const createBook = async(req , res)=>{
    try {
        if (
            !req.body.title || !req.body.author || !req.body.publishYear || !req.body.imageUrl
        ) {
             res.status(400).send({
                message: 'Send all required fields : title, author , publishYear , imageUrl',
            })
        }

        const newBook = {
            title: req.body.title ,
            author: req.body.author ,
            publishYear: req.body.publishYear ,
            description: req.body.description ,
            category: req.body.category ,
            imageUrl: req.body.imageUrl,

        };

        const book = await Book.create(newBook);
        res.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

const updateBook = async(req,res) => {
    try{
        if(
            !req.body.title || !req.body.author || !req.body.publishYear || !req.body.imageUrl
        )
        {
            res.status(400).send({
                message: 'Send all required fields : title , author , publishYear imageUrl',
            })
        }

        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id , req.body);

        if(!result){
            res.status(400).json({ message: "Book not found" });
        }
        else {
            res.status(200).send({ message: 'Book updated successfully' });
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

const deleteBook = async(req , res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
         res.status(404).json({ message: 'Book not found' });
        }

         res.status(200).send({ message: 'Book deleted successfully ' })
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }

}

module.exports = {
    getAllBooks , getOneBook , updateBook , deleteBook , createBook
}

