'use strict';

import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import AllCategories from '../Category/AllCategories'
import store, { createItem, fetchProduct } from '../../store'

/**
 * COMPONENT
 */
class ProductDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            quantity: 1,
            addedToCartMsgClss: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderWithReviews = this.renderWithReviews.bind(this)
        this.numberToBuy = this.numberToBuy.bind(this)
    }

    render(){
        const { product, isAdmin } = this.props
        let addToCartMsgClss = 'hidden'
        return (
            <div>
                {
                    !product.name ?
                    null : (
                    <div>
                        <img src={product.productImages[0].imageUrl} />
                        <div>
                            <div>
                                <div>
                                    <h1>{product.name}</h1>
                                    <span>{product.numberInStock} Available</span>
                                </div>
                                <h2>
                                    {
                                        categories[0] === undefined ?
                                        <div /> : this.whatCategories()
                                    }
                                </h2>
                                <div>
                                    {
                                        email === '' ?
                                        <div /> : (
                                        <Link
                                            to={`/products/${product.id}/admin/edit`}
                                        >
                                            <button>Edit</button>
                                        </Link>
                                        )
                                    }
                                </div>

                            </div>
                            <ul>
                                {product.ingredients
                                    .map(ingredient =>
                                        <li key={ingredient}>{ingredient}</li>
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
                                    product.availability === 'available' ?
                                    (
                                        <form onChange={this.handleChange} >
                                            <select name="quantity" >
                                                {
                                                    this.numberToBuy()
                                                }
                                            </select>
                                            <button onClick={this.handleSubmit}>
                                                Add to Cart
                                            </button>
                                            <div className={`add-to-cart${this.state.addedToCartMsgClss}`} >Added to Cart</div>
                                        </form>
                                    ) : (
                                        <div />
                                    )
                                }
                            </div>
                            <div>
                                <h3>Customer Reviews</h3>
                                {
                                    this.props.reviewsForOne === undefined ?
                                    <p>There are no customer reviews yet.</p> :
                                    this.renderWithReviews()
                                }
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }

    whatCategories(){
        const { product, categories } = this.props
        const categoriesForOne = categories.filter(category =>
            category.products.find(select =>
                select === undefined ? false : select.id === product.id))
        return categoriesForOne.map(category => category.name)
    }

    numberToBuy(){
        const num = this.props.product.numberInStock
        let result = []
        for (var i = 1; i <= num; i++){
            result.push(<option key={i} value={i} >{i}</option>)
        }
        return result
    }

    handleChange(event){
        const quantity = event.target.value
        this.setState({ quantity })
    }

    handleSubmit(event){
        event.preventDefault()

        store.dispatch(createItem({ productId: this.props.product.id, quantity: this.state.quantity}))
        this.setState({addedToCartMsgClss: ':active'})
        const hideMsg = () => this.setState({addedToCartMsgClss: ''})
        window.setTimeout(hideMsg, 2000)
    }

    renderWithReviews(){
        const product = this.props.product
        const maxReviewToShow = 3
        return (
            <div>
                <div>
                    {
                        reviewsForOne
                            .reduce((accu, curr, index, array) =>
                                (accu + (curr.rating / array.length)), 0)
                            .toFixed(1)
                    }
                </div>
                <div>{reviewsForOne.length} customer reviews</div>
                <ul>
                    {
                        reviewsForOne
                            .sort((pre, next) => next.id - pre.id)
                            .slice(0, maxReviewToShow)
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
                                ))
                            }
                        })
                    }
                </ul>
                <Link to={`/products/${product.id}/reviews`}>
                    <p>See all {product.reviews.length} reviews</p>
                </Link>
            </div>
        )
    }
}

/**
 * CONTAINER
 */


const mapState = ({ products, user, reviews, categories }, ownProps) => {
    // <=== need cart as well
    const email = user.email || ''
    const paramId = Number(ownProps.match.params.productId)
    const product = products.find(product => product.id === paramId)
    const reviewsForOne = reviews.filter(review => review.productId === paramId)
    return {
        email,
        product,
        reviewsForOne,
        categories,
    }
}

const mapDispatch = (dispatch, ownProps) => {
    const paramId = ownProps.match.params.productId
    return {
        fetchProduct: () => dispatch(fetchProduct(paramId))
    }
}

export default connect(mapState)(ProductDetail)
