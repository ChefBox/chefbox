'use strict';

import React from 'react'
import {connect} from 'react-redux'

import { editProduct, fetchProduct } from '../../store'

/**
 * COMPONENT
 */
class ProductEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            product: props.product,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.productUpdate = this.productUpdate.bind(this)
        this.renderWithCategories = this.renderWithCategories.bind(this)
    }

    componentDidMount(){
        this.props.fetchProduct()
    }

    componentWillReceiveProps(newProps, oldProps){
        if (newProps.product !== oldProps){
            this.setState({
                product: newProps.product
            })
        }
    }

    render(){
        const availability = [
            'available',
            'pending',
            'out of stock'
        ]
        const {product} = this.state
        const {categories} = this.props
        return (
            <div>
                {
                    !product.name ?
                    null : (
                    <div>
                        <form onSubmit={this.handleSubmit} >
                            <h3>
                                Product Name
                                <input
                                    onChange={event =>
                                        this.productUpdate({ name: event.target.value })
                                    }
                                    name="name"
                                    required
                                    value={product.name}
                                />
                            </h3>
                            <h3>
                                Product Image
                                <input
                                    onChange={event => {

                                        this.productUpdate({ productImages: [{ ...product.productImages[0], imageUrl: event.target.value }] })
                                        }
                                    }
                                    name="imageUrl"
                                    required
                                    value={product.productImages[0].imageUrl}
                                />
                            </h3>
                            <h3>
                                Product ingredients
                                <input
                                    onChange={event =>
                                        this.productUpdate({ ingredients: event.target.value.split(',') })
                                    }
                                    name="ingredients"
                                    required
                                    value={product.ingredients}
                                />
                            </h3>
                            <h3>
                                Product Preperation Time(minutes)
                                <input
                                    onChange={event =>
                                        this.productUpdate({ timeToPrep: event.target.value })
                                    }
                                    name="timeToPrep"
                                    required
                                    value={product.timeToPrep}
                                />
                            </h3>
                            <h3>
                                Product Calories
                                <input
                                    onChange={event =>
                                        this.productUpdate({ calories: event.target.value })
                                    }
                                    name="calories"
                                    required
                                    value={product.calories}
                                />
                            </h3>
                            <h3>
                                Product Price
                                <input
                                    onChange={event =>
                                        this.productUpdate({ price: event.target.value })
                                    }
                                    name="price"
                                    required
                                    value={product.price}
                                />
                            </h3>
                            <h3>
                                Product Availability
                                <select
                                    onChange={event =>
                                            this.productUpdate({ availability: event.target.value })
                                    }
                                    value={product.availability}
                                >
                                    {
                                        availability
                                            .map(option => (
                                                <option key={option}>
                                                    {option}
                                                </option>
                                            )
                                        )
                                    }
                                </select>
                            </h3>
                            <h3>
                                Product Description
                                <textarea
                                    onChange={event =>
                                        this.productUpdate({ description: event.target.value })
                                    }
                                    name="description"
                                    required
                                    value={product.description}
                                />
                            </h3>
                            <h3>
                                Product Catagory
                                <div>
                                    {this.renderWithCategories()}
                                </div>
                            </h3>
                            <button>Save Change</button>
                        </form>
                    </div>        
                    )
                }
            </div>
        )
    }

    renderWithCategories(){
        const {product} = this.state
        const {categories} = this.props
        return categories.map(category => {
            const isMatch = product.categories.findIndex(element => 
                !element ? false : element.name === category.name
            )
            return (
                <div key={category.id}>
                    <input
                        onChange={event => {
                            if (isMatch < 0){
                                this.productUpdate({
                                    categories: [...product.categories, {name: event.target.name}]
                                })
                            } else {
                                this.productUpdate({
                                    categories: product.categories.slice(0, isMatch).concat(product.categories.slice(isMatch+1)) 
                                })
                            }
                        }}
                        defaultChecked={isMatch < 0 ? false : true}
                        type="checkbox"
                        name={category.name}
                    />
                    {category.name}
                </div>
            )}
        )
    }

    productUpdate(productUpdateObj){
        this.setState({
            product: Object.assign({}, this.state.product, productUpdateObj)
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const { editProduct } = this.props
        const { product } = this.state
        editProduct(product, product.id)
        this.props.history.push(`/products/${product.id}`)
    }
}

/**
 * CONTAINER
 */
const mapState = ({ product, categories }) => ({ product, categories })

const mapDispatch = (dispatch, ownProps) => {
    const paramId = ownProps.match.params.productId
    return {
        fetchProduct: () => dispatch(fetchProduct(paramId)),
        editProduct: (product, id) => dispatch(editProduct(product, id))
    }
}

export default connect(mapState, mapDispatch)(ProductEdit)
