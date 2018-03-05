'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {fetchProduct} from '../../store'

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
    }

    componentDidMount(){
        this.props.fetchProduct()
    }

    render(){
        const { product, isAdmin } = this.props
        return (
            <div>
                <AllCategories />
                {
                    !product.name ?
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
                                    {product.categories.map(category => category.name)}
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
                                    !product.reviews ?
                                    <p>There are no customer reviews yet.</p> :
                                    this.renderWithReviews()
                                }
                            </div>
                        </div>
                        <AllCategories />
                    </div>
                    )
                }
            </div>
        )
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
        const product = this.props.product
        const max = this.state.bool ? 3 : product.reviews.length
        const seeReviews = this.state.bool ?
            `See all ${product.reviews.length} reviews` : 'See less'
        return (
            <div>
                <div>
                    {
                        product.reviews
                            .reduce((accu, curr, index, array) =>
                                (accu + (curr.rating / array.length)), 0)
                            .toFixed(1)
                    }
                </div>
                <div>{product.reviews.length} customer reviews</div>
                <ul>
                    {
                        product.reviews
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
                <button onClick={() => this.setState({ bool: !this.state.bool })}>
                    {seeReviews}
                </button>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = ({ user, product }) => {
    // <=== need cart as well
    return {
        isAdmin: !user ? null : user.role,
        product,
    }
}

const mapDispatch = (dispatch, ownProps) => {
    const paramId = ownProps.match.params.productId
    return {
        fetchProduct: () => dispatch(fetchProduct(paramId))
    }
}

export default connect(mapState, mapDispatch)(ProductDetail)
