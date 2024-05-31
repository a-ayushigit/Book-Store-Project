import {createContext , useEffect, useState} from "react";


export const CartContext = createContext({

    books:[] ,
    removeOneBook:()=>{},
    addToCart:()=>{},
    getProductQuantity:()=>{},
    getTotalCost:()=>{},
    removeAllBooks:()=>{}
    
});



export default function CartProvider({children}){
    const [cartProducts , setCartProducts] = useState([]);

    useEffect(()=>{
        if( localStorage.getItem('cart') !== null &&  localStorage.getItem('cart') !== undefined){
            let existingCartItem = localStorage.getItem('cart');
            console.log(`existingCartItem ${existingCartItem}`)
            try{
                
                (existingCartItem !== undefined && existingCartItem !== null)?setCartProducts(JSON.parse(existingCartItem)):setCartProducts([]);
               
            }
            catch(err){
                console.log(err);
            }
        
        }
        
     //console.log(`existingCartItem ${existingCartItem}`)
     
     
     //if(existingCartItem !== undefined) setCartProducts(JSON.parse(existingCartItem));

    // let existingCartItem = localStorage.getItem('cart');
    // if (existingCartItem !== null) {
    //   setCartProducts(JSON.parse(existingCartItem));
    // } else {
    //   setCartProducts([]);
    // }

    },[])

    function getProductQuantity(id){
        const quantity = cartProducts.find(book => book._id == id)?.quantity;
        if(quantity === undefined) return 0;
        return quantity ;
    }
    function removeAllBooks(id){
        setCartProducts(cartProducts =>
            cartProducts.filter((book)=> book._id !== id)
        )
        localStorage.setItem('cart' , JSON.stringify(cartProducts =>
            cartProducts.filter((book)=> book._id !== id)));
    }
    function addToCart(book){
       const quantity = getProductQuantity(book._id);
       if(quantity == 0) {
        setCartProducts([...cartProducts , {...book , quantity : 1}]);
        localStorage.setItem('cart' , JSON.stringify([...cartProducts , {...book , quantity : 1}]));

       }
       else {
        setCartProducts(cartProducts.map(b => b._id === book._id ? {...b , quantity:quantity + 1 }:b));
        localStorage.setItem('cart' , JSON.stringify(cartProducts?.map(b => b._id === book._id ? {...b , quantity:quantity + 1 }:b)));
       }
    }

    function getTotalCost(){
        let total = 0 ;
        cartProducts?.map((cartItem)=> {
            total = total + (cartItem.price*cartItem.quantity);

        })
        return total;
    }

    function removeOneBook(book){
       const quantity = getProductQuantity(book._id);
       if(quantity == 1){
        removeAllBooks(book._id);
       }
       else {
        setCartProducts(cartProducts.map(b => b._id === book._id ? {...b , quantity:quantity - 1 }:b));
        localStorage.setItem('cart' , JSON.stringify(cartProducts?.map(b => b._id === book._id ? {...b , quantity:quantity - 1 }:b)));
       }
    }

    const contextValue = {
        items : cartProducts , 
        removeOneBook,
        addToCart,
        getProductQuantity,
        getTotalCost,
        removeAllBooks
    }

    return (
        <CartContext.Provider value = {contextValue}>
          {children}
        </CartContext.Provider>
    )
};
