const express = require("express");
const Book = require("../models/book");


const getAllBooks = async(req , res)=>{
    // const qnew = req.query.new;
    // let qcategory = req.query.category;
    // let qtag = req.query.tag;
    // let qlang = req.query.lang;
    
    try{

    
    // if(qnew){
    //   books = await Book.find().sort({createdAt:-1}).limit(5);
    // }
    // else if(qcategory){
       
    //   books = await Book.find({
    //     category:{$in:[qcategory]},
        
    //   })
      
    // }
    // else if(qtag){
    //     books = await Book.find({
    //         tags:{$in:[qtag]},
    //     })
    // }
    // else if(qlang){
    //     books = await Book.find({
    //         language:qlang,
    //     })
    // }
   
    // else {
    //     books = await Book.find({});
    // }
        const {title , author , publishYear , category , lang, price,binding , tag , discount , rating , sort ,  numericFilters} = req.query;
        let {limit , page} = req.query;
        const queryObj = {};
        if(title) queryObj.title = {$regex: title , $options:'i'}//'i' stands for case-insensitive
        if(author) queryObj.author = author;
        if(publishYear) queryObj.publishYear = Number(publishYear);
        if(category) queryObj.category = {$in:category};
        if(lang) queryObj.language = lang;
        if(binding) queryObj.binding = binding;
        if(tag) queryObj.tags = {$in:tag};
        if(discount) queryObj.discount = Number( discount);
        if(rating) queryObj.rating = Number(rating);
        if(price) queryObj.price = Number(price);
        if(numericFilters){
            const operatorMap = {
                '>':'$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            }
            const regEx = /\b(>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(
                regEx , 
                (match) =>`-${operatorMap[match]}-`
            )

            const options = ['price' , 'rating' , 'discount'];
            filters = filters.split(',').forEach((item)=>{
                const [field,operator,value] = item.split('-');
                if(options.includes(field)){
                    queryObj[field] = {[operator]:Number(value)};
                }
            });
            console.log(numericFilters);
        }
        //console.log(queryObj);

        
        let result = Book.find(queryObj);
       // const total = await Book.countDocuments(queryObj);
        
        if(sort){
            const sortList = sort.split(',').join(' ');
            console.log((sortList));
            result =  result.sort(sortList);
            //console.log(result);
        }
        else {
            result =  result.sort('createdAt');
        }
//use await at the end of chaining 
if(!page) page = 1;
if(!limit) limit = 10;
const skip = (page - 1) * limit;




// result.countDocuments().then((response)=>{
//     total=response;
// }).catch((err)=>console.log(err));

const total = await Book.countDocuments(queryObj);

let books  = await result.skip(skip).limit(limit);



const obj = {
    books:books,
    total:Number(total)
}

res.status(200).send(obj);
//console.log(res);
// res.status(200).json({books ,total });
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

