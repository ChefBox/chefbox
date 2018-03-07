'use strict'

import React from 'react'
import {connect} from 'react-redux'

import {ProductItem} from '../'
import {fetchProduct} from '../../store'

/**
 * COMPONENT
 */
class ProductReview extends React.Component {
    componentDidMount(){
        this.props.fetchProduct()
    }

    render(){
        const product = this.props.product
        return (
            <div>
                {
                    !product.reviews ?
                    null : (
                    <div>
                        <div>
                            <ProductItem product={product} />
                            <p>$ {product.price} + tax</p>
                            <div>
                                {
                                    product.reviews
                                        .reduce((accu, curr, index, array) =>
                                            (accu + (curr.rating / array.length)), 0)
                                        .toFixed(1)
                                }
                            </div>
                            <div>Total {product.reviews.length} customer reviews</div>
                        </div>
                        <ul>
                            {
                                product.reviews
                                    .sort((pre, next) => next.id - pre.id)
                                    .map(review => (
                                            <li key={review.id}>
                                                <div>
                                                    <div>{review.rating}</div>
                                                    <h4>{review.title}</h4>
                                                </div>
                                                <div>{Date(review.createdAt)}</div>
                                                <div>Verified Purchase</div>
                                                <p>{review.content}</p>
                                            </li>
                                        )
                                    )
                            }
                        </ul>
                    </div>
                    )
                }
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = ({ product }) => ({ product })

const mapDispatch = (dispatch, ownProps) => {
    const paramId = ownProps.match.params.productId
    return {
        fetchProduct: () => dispatch(fetchProduct(paramId))
    }
}

export default connect(mapState, mapDispatch)(ProductReview)
