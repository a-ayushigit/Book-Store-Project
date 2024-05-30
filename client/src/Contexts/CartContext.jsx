import {createContext , useState} from "react";


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

    function getProductQuantity(id){
        const quantity = cartProducts.find(book => book._id == id)?.quantity;
        if(quantity === undefined) return 0;
        return quantity ;
    }
    function removeAllBooks(id){
        setCartProducts(cartProducts =>
            cartProducts.filter((book)=> book._id !== id)
        )
    }
    function addToCart(book){
       const quantity = getProductQuantity(book._id);
       if(quantity == 0) {
        setCartProducts([...cartProducts , {...book , quantity : 1}]);

       }
       else {
        setCartProducts(cartProducts.map(b => b._id === book._id ? {...b , quantity:quantity + 1 }:b));
       }
    }

    function getTotalCost(){
        let total = 0 ;
        cartProducts?.map((cartItem)=> {
            total = total + (cartItem.price*cartItem.quantity);

        })
        return total;
    }

    function removeOneBook(id){
       const quantity = getProductQuantity(id);
       if(quantity == 1){
        removeAllBooks(id);
       }
       else {
        setCartProducts(cartProducts.filter((book)=>{
            book._id === id ? {...book , quantity : book.quantity - 1} :book;
        }))
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
