import React, {Component} from 'react'
import {ProductConsumer} from '../Context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from './Button'

class Details extends Component{
    render(){
        return(
           <ProductConsumer>
               {(value) =>{
                   const {id, company, img, info, price, title, inCart} = value.productDetails;
                   return(
                       <div className='container py-5'>
                       {/* Title */}
                         <div className='row'>
                           <div className='col-10 mx-auto text-center 
                           text-slanted text-blue my-5'
                           >
                              <h1>{title}</h1>
                           </div>
                         </div>
                       {/* Title Ends */}
                       {/* Products Info */}
                       <div className='row'>
                       <div className='col-10 mx-auto col-md-6 my-3'>
                        <img src={img} className='img-fluid' alt='product'/>
                       </div>
                       {/* Product Text*/}
                       <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
                         <h2>model: {title}</h2>
                         <h4 className='text-title text-uppercase text-muted mt-3 mb-2'>
                           made by: {company}
                         </h4>
                         <h4 className='text-blue'>
                             <strong>
                                 price :  <span>$</span>
                                 {price}
                             </strong>
                         </h4>
                         <p className='text-capitalize font-weight-bold mb-3 mt-0'>
                              some info about product
                         </p>
                         <p className='text-muted lead'>
                             {info}
                         </p>
                         {/* buttons */}
                         <div>
                             <Link to='/'>
                                 <ButtonContainer>
                                     back to products
                                 </ButtonContainer>
                             </Link>
                             <ButtonContainer
                               cart
                               disabled={inCart ? true : false}
                               onClick={()=> {
                                   value.addToCart(id);
                                   value.modalOpen(id)
                               }}

                             >
                                 {inCart?'in Cart': 'Add To Cart'}
                             </ButtonContainer>
                         </div>
                       </div>
                       </div>
                       </div>
                   )
               }}
           </ProductConsumer>
        )
    }
}
export default Details