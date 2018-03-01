'use strict';

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class ProductDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render(){
        const product = this.props.product
        console.log(product)
        // const reviewsForOne = this.props.reviewsForOne
        return(
            <div>
                {
                    this.props.product === undefined ?
                    <div /> : (
                    <div>
                        {/* <img scr={product.imageUrl} /> */}
                        <div>
                            <h1>{product.name}</h1>
                            {/* <h4>
                                <div>
                                    {reviewsForOne.map(review => {

                                    })}
                                </div>
                                <div>{reviewsForOne.length} customer reviews</div>
                            </h4> */}
                            <ul>
                                {product.ingredients
                                    .map((ingredient, index) =>
                                        <li key={index}>{ingredient}</li>
                                    )
                                }
                            </ul>
                            <h5>{product.timeToPrep} minutes</h5>
                            <h5>{product.calories} kcal</h5>
                            <h4>$ {product.price} + tax</h4>
                            <h4>{product.availability}</h4>
                            <p>{product.description}</p>
                            <button onClick={this.handleSubmit} >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }

    handleSubmit(event){
        event.preventDefault()
        // const { updateCart } = this.props
        // updateCart(this.state)
    }
}

/**
 * CONTAINER
 */
const mapState = ({ products, user }, ownProps) => { 
    // <=== need review, cart as well
    const paramId = Number(ownProps.match.params.productId)
    const product = products.find(product => product.id === paramId)
    // const reviewsForOne = reviews.filter(review => review.`someId` === paramId)
    return {
        user,
        product,
        // reviewsForOne
    }
}

// const mapDispatch = dispatch => {
// }

export default connect(mapState)(ProductDetail)

/**
 * PROP TYPES
 */
// ProductDetail.PropTypes = {

// }