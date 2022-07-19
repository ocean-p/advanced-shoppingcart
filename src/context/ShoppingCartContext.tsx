import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode,
}

type ShoppingCartContext = {
  getItemQuanity: (id:number) => number,
  increaseCartQuantity: (id:number) => void,
  decreaseCartQuantity: (id:number) => void,
  removeFromCart:  (id:number) => void,
  openCart: () => void,
  closeCart: () => void,
  cartQuantity: number,
  cartItems: CartItem[]
}

type CartItem = {
  id: number,
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({children}:ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce((quantity, item) => (
    item.quantity + quantity
  ), 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuanity = (id:number) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id:number) => {
    setCartItems(pre => {
      if(pre.find(item => item.id === id) == null){
        return [...pre, {id, quantity: 1}]
      }
      else{
        return pre.map(item => {
          if(item.id === id){
            return {...item, quantity:item.quantity + 1}
          }
          else{
            return item;
          }
        })
      }
    })
  };

  const decreaseCartQuantity = (id:number) => {
    setCartItems(pre => {
      if(pre.find(item => item.id === id)?.quantity === 1){
        return pre.filter(item => item.id !== id)
      }
      else{
        return pre.map(item => {
          if(item.id === id){
            return {...item, quantity:item.quantity - 1}
          }
          else{
            return item;
          }
        })
      }
    })
  };
  
  const removeFromCart = (id:number) => {
    setCartItems(pre => {
      return pre.filter(item => item.id !== id);
    })
  };

  return (
    <ShoppingCartContext.Provider 
      value={{
        getItemQuanity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}