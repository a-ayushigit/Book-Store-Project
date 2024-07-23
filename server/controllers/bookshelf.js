const Bookshelf = require('../models/BookShelf');
const Users = require('../models/User');
const Groups = require('../models/Group');
const getGroupBookshelf = async(req , res) => {
    try {
        const groupBookshelf = await Bookshelf.find({ group: req.params.groupId });
        res.status(200).json(groupBookshelf);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUserBookshelf = async (req , res) => {
    try {
        const userBookshelf = await Bookshelf.find({ user: req.params.userId });
        res.status(200).json(userBookshelf);
    } catch (error) {
        res.status(500).json(error);
    }
}

const addBookToBookshelf = async(req , res) => {
    try {
        const {id} = req.params;
        const bookshelf = await Bookshelf.findById(id);
        const {bookId} = req.body;
        const {status} = req.body;// status of book whether it has been read or not 
        if(bookshelf.booksToRead.includes(bookId) || bookshelf.booksRead.includes(bookId)){
            return res.status(403).json({"error": "Book already added in the booklist "});
            
        }
        if(status === "read"){
            bookshelf.booksRead.push(bookId);
        }
        else{
            bookshelf.booksToRead.push(bookId);
        }
        
        res.status(200).json("Book added successfully to bookshelf!");

    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteBookFromBookshelf = async(req , res) => {

    try {
        const {id} = req.params;
        const bookshelf = await Bookshelf.findById(id);
        const {bookId} = req.body;
        const index = bookshelf.booksToRead.indexOf(bookId);
        if(index > -1){
            bookshelf.booksToRead.splice(index, 1);
        }
        index = bookshelf.booksRead.indexOf(bookId);
        if(index > -1){
            bookshelf.booksRead.splice(index, 1);
        }
        await bookshelf.save();
        res.status(200).json("Book deleted successfully from bookshelf!");
    }
    catch (error) {
        res.status(500).json(error);
    }

}

const getOneBookShelf = async(req , res) =>{
    try{
        const {id} = req.params ;
        const bookshelf = await Bookshelf.findById(id);
        res.status(200).json({bookshelf});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

const createBookShelf = async(req , res)=>{
   // console.log("hello1");
    try {
        if (
            !req.body.name || !req.body.type || !req.body.ownerId
        ) {
             res.status(400).send({
                message: 'Name not found!',
            });
            console.log("hello2");
        }

        const newBookshelf = {
            name: req.body.name ,
            owner: {
                id: req.body.ownerId,
                type: req.body.type
            }

        };
        //console.log("hello3");
        const bookshelf = await Bookshelf.create(newBookshelf);
        //console.log(bookshelf);
        if(bookshelf.owner.type === 'Users'){
           const userOwner = await Users.findById(bookshelf.owner.id);
           //console.log("user ", userOwner);
           //console.log(userOwner.bookshelf);
           userOwner.bookshelf = {id:bookshelf._id , name:bookshelf.name};
           await userOwner.save();
           //console.log("hello4");

        }
        else {
            const groupOwner = await Groups.findById(bookshelf.owner.id);
            groupOwner.bookshelf = {id:bookshelf._id, name:bookshelf.name};
            await groupOwner.save();
            //console.log("hello5");
        }
        res.status(201).json(bookshelf);
        //console.log("hello6");
    } catch (error) {
        //console.log(error.message);
        res.status(500).json({message : error.message});
        //console.log("hello7");
    }
}

const updateBookShelf = async(req,res) => {
    try{
        

        const {id} = req.params;
        const result = await Bookshelf.findByIdAndUpdate(id , req.body);

        if(!result){
            res.status(400).json({ message: "Bookshelf not found" });
        }
        else {
            res.status(200).json({ message: 'Bookshelf updated successfully' });
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message}); 
    }
}

const deleteBookShelf = async(req , res)=>{
    try{
        const {id} = req.params;
        const result = await Bookshelf.findByIdAndDelete(id);

        if (!result) {
         res.status(404).json({ message: 'Bookshelf not found' });
        }

         res.status(200).json({ message: 'Bookshelf deleted successfully ' })
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message}); 
    }

}

module.exports = {deleteBookShelf , updateBookShelf , createBookShelf , getOneBookShelf , deleteBookFromBookshelf , addBookToBookshelf , getUserBookshelf , getGroupBookshelf};

