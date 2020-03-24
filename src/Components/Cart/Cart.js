import React, {Component} from 'react'
import Title from '../Title'
import CartColumn from './CartColumn'
import EmptyCart from './EmptyCart'
import CartList from './CartList'
import CartTotals from './CartTotals'
import {ProductConsumer} from '../../Context'
class Cart extends Component{
    render(){
    return(
       <ProductConsumer>
           {(value) => {
               if(value.cart.length < 1){
                   return (
                       <EmptyCart/>
                   )
               }else{
                return(
                         <section>
                            <Title name='Your' title='Cart'/>
                            <CartColumn/>
                            <CartList value={value}/>
                            <CartTotals value={value} history={this.props.history}/>
                        </section>
                    )
               }
           }}
       </ProductConsumer>
    )
 }
}
export default Cart