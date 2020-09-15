import React, {Component} from 'react'
import {productsData, productDetails} from './Data'
const ProductContext = React.createContext();
// to use Context you need Provider and Consumer

class ProductProvider extends Component{
    constructor(props){
        super(props)
        this.state ={
            products: [],
            productDetails,
            cart : [],
            openModal : false,
            modalProduct: productDetails,
            cartSubTotal: 0,
            cartTax: 0,
            cartTotal: 0
        }
    }
    componentDidMount(){
        this.setProducts()
    }
    setProducts = () => {
       let tempProduct = []
        productsData.forEach(item => {
            const singleItem = {...item}
            tempProduct = [...tempProduct, singleItem]
        })
        this.setState({
            products: tempProduct
        })
    }
    getItem = id =>{
        const product = this.state.products.find(item => item.id === id);
        return product;
    }
    handleDetail = (id) => {
        const product = this.getItem(id)
        this.setState({productDetails : product})
    }
    addToCart = (id) => {
        const tempProduct = [...this.state.products]
        const index = tempProduct.indexOf(this.getItem(id))
        const product = tempProduct[index]
        product.inCart = true
        product.count = 1
        const price = product.price
        product.total = price
        this.setState(() => {
            return {
                products : tempProduct,
                cart : [...this.state.cart, product] 
            }
        },
         () => {this.addTotal()}
      )
    }
    modalOpen = (id) => {
        const product = this.getItem(id)
        this.setState(() => {
            return{
                modalProduct : product,
                openModal : true
            }
        })
    }
    closeModal = () => {
        this.setState(() => {
            return {
                openModal : false
            } 
        })
    }
    increment = (id) => {
       let tempCart = [...this.state.cart]
       let item = tempCart.indexOf(this.getItem(id))
        item = tempCart[item]
        item.count += 1;
        item.total = item.price * item.count;
        this.setState(() =>{
           return {cart : [...tempCart]}
        }, () => {this.addTotal()})
 }   
    decrement = (id) => {
        let tempCart = [...this.state.cart]
        let item = tempCart.indexOf(this.getItem(id))
         item = tempCart[item]
         if(item.count <= 1){
             return
         }
         item.count -= 1;
         item.total = item.price * item.count;
         this.setState(() => {
            return {cart : [...tempCart]}
         }, () => {this.addTotal()})
    }
    removeItem = (id) => {
      const tempProduct = [...this.state.products]
      let tempCart = [...this.state.cart]
      tempCart = tempCart.filter(item => item.id !== id)
      const index = tempProduct.indexOf(this.getItem(id))
      const removedItem =tempProduct[index]
      removedItem.inCart = false;
      removedItem.count = 0;
      removedItem.total = 0;
      this.setState({
          cart : [...tempCart],
          products: tempProduct
      }, () => {this.addTotal()})
    }
    clearCart = () => {
        this.setState({
            cart: []
        },
        () => {
            this.setProducts()
        }  
     )
    }
    addTotal = () => {
        let subTotal = 0;
       this.state.cart.map((item) => {
           subTotal += item.total
           return subTotal;
        })
        let tempTax = subTotal * 0.1;
        let tax = parseFloat(tempTax.toFixed(2));
        let total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal : subTotal,
                cartTax : tax,
                cartTotal : total
            }
        })
    }
    render(){
        return(
           <ProductContext.Provider value={{
               ...this.state,
               handleDetail: this.handleDetail,
               addToCart: this.addToCart,
               setProducts: this.setProducts,
               closeModal: this.closeModal,
               modalOpen: this.modalOpen,
               increment: this.increment,
               decrement: this.decrement,
               removeItem: this.removeItem,
               clearCart: this.clearCart
           }}>
               {this.props.children}
           </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer

export {ProductProvider, ProductConsumer}