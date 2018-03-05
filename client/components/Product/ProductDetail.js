'use strict';

import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import AllCategories from '../Category/AllCategories'

/**
 * COMPONENT
 */
class ProductDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            quantity: 0,
            bool: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderWithReviews = this.renderWithReviews.bind(this)
        this.numberToBuy = this.numberToBuy.bind(this)
        this.whatCategories = this.whatCategories.bind(this)
    }

    render(){
        const { product, categories, isAdmin } = this.props
        const reviewsForOne = this.props.reviewsForOne
        return (
            <div>
                {
                    product === undefined ?
                    <div>from ProductDetail</div> : (
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
                                        isAdmin !== 'admin' ?
                                        null : (
                                        <Link
                                            to={`/products/${product.id}/edit`}
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
        for (var i = 0; i <= num; i++){
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

    renderWithReviews(){
        const { reviewsForOne, product } = this.props
        const max = this.state.bool ? 3 : reviewsForOne.length
        const seeReviews = this.state.bool ?
            `See all ${reviewsForOne.length} reviews` : 'See less'
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
                            .slice(0, max)
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
                <button onClick={event => this.setState({ bool: !this.state.bool })}>
                    {seeReviews}
                </button>
                <AllCategories />
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = ({ products, users, reviews, categories }, ownProps) => {
    // <=== need cart as well
    const isAdmin = !!users ? users.role : null
    const paramId = Number(ownProps.match.params.productId)
    const product = products.find(product => product.id === paramId)
    const reviewsForOne = reviews.filter(review => review.productId === paramId)
    return {
        isAdmin,
        product,
        reviewsForOne,
        categories,
    }
}

// const mapDispatch = dispatch => {
// }

export default connect(mapState)(ProductDetail)
