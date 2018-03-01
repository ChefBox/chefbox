'use strict';

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
class ProductDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            quantity: 0
        }
        console.log(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    render(){
        console.log(this.props.product)
        const product = this.props.product
        // const reviewsForOne = this.props.reviewsForOne
        return(
            <div>
                {
                    this.props.product === undefined ?
                    <div /> : (
                    <div>
                        {/* <img scr={product.imageUrl} /> */}
                        <div>
                            <div>
                                <h1>{product.name}</h1>
                                <Link
                                    to={`/products/${product.id}/edit`}
                                >
                                    <button>Edit</button>
                                </Link>
                            </div>
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
                            <h3>{product.availability}</h3>
                            <p>{product.description}</p>
                            <div>
                                {
                                    product.availability === "available" ?
                                    (
                                        <form onChange={this.handleChange} >
                                            <select name="quantity" >
                                                {
                                                    this.numberToBuy(product.numberInStock)
                                                }
                                            </select>
                                            <button onClick={this.handleSubmit}>
                                                Add to Cart
                                            </button>
                                        </form>
                                    ) : (
                                        <div />
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }


    numberToBuy(num){
        let result = []
        for(var i = 0; i <= num; i++){
            result.push(<option key={i} >{i}</option>)
        }
        return result
    }

    handleChange(event){
        const quantity = event.target.quantity.value
        this.setState({ quantity })
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