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
        this.state = []
    }

    render(){
        const product = this.props.product
        // const reviewsForOne = this.props.reviewsForOne
        return(
            <div>
                {/* <img scr={product.imageUrl} /> */}
                <div>
                    <h2>{product.name}</h2>
                    <h4>
                        <div>
                            {reviewsForOne.map(review => {

                            })}
                        </div>
                        <div>{reviewsForOne.length} customer reviews</div>
                    </h4>
                    <h3>
                        {product.ingredients
                            .map(ingredient =>
                                <div>{ingredient}</div>
                            )
                        }
                    </h3>
                    <h5>{product.timeToPrep}</h5>
                    <h5>{product.calories}</h5>
                    <h4>{product.price}</h4>
                    <h4>{product.availability}</h4>
                    <p>{product.description}</p>
                </div>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = ({ products, user }, ownProps) => { // <=== need review as well
    const paramId = Number(ownProps.match.params.productId)
    const product = products.find(product => product.id === paramId)
    return {
        user,
        product
    }
}

const mapDispatch = dispatch => {
}

export default connect(mapState, mapDispatch)(ProductDetail)

/**
 * PROP TYPES
 */
// ProductDetail.PropTypes = {

// }