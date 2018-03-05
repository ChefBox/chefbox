'use strict';

import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { editProduct } from '../../store'

/**
 * COMPONENT
 */
class ProductEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            product: props.product,
            categories: props.categories
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.productUpdate = this.productUpdate.bind(this)
        this.renderWithCategories = this.renderWithCategories.bind(this)
    }

    componentWillReceiveProps(newProps, oldProps){
        if(newProps.product !== oldProps){
            this.setState({
                product: newProps.product
            })
        }
        if(newProps.categories !== oldProps){
            this.setState({
                categories: newProps.categories
            })
        }
    }

    render(){
        const availability = [
            'available',
            'pending',
            'out of stock'
        ]
        const {product, categories} = this.state
        return (
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
                            value={product === undefined ? '' : product.name}
                        />
                    </h3>
                    <h3>
                        Product Image
                        <input
                            onChange={event =>
                                this.productUpdate({ image: event.target.value })
                            }
                            name="Image"
                            // required
                            // value=
                        />
                    </h3>
                    <h3>
                        Product Categories
                        
                    </h3>
                    <h3>
                        Product ingredients
                        <input
                            onChange={event =>
                                this.productUpdate({ ingredients: event.target.value.split(',') })
                            }
                            name="ingredients"
                            required
                            value={product === undefined ? '' : product.ingredients}
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
                            value={product === undefined ? '' : product.timeToPrep}
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
                            value={product === undefined ? '' : product.calories}
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
                            value={product === undefined ? '' : product.price}
                        />
                    </h3>
                    <h3>
                        Product Availability

                        <select
                            onChange={event => 
                                    this.productUpdate({ availability: event.target.value })
                            }
                            value={product === undefined ? '' : product.availability}
                        >
                            {
                                availability
                                    .map((option, index) => 
                                        <option key={index}>
                                            {option}
                                        </option>
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
                            value={product === undefined ? '' : product.description}
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

    renderWithCategories(){
        const {product, categories} = this.state
        return categories.map(category => {
                const isMatch = category.products.findIndex(select => {
                    return select === undefined ? false : select.id === product.id})
                if(isMatch < 0){
                    return (
                        <div
                            key={category.id}
                            name={category.name}
                        >
                            <input
                                type="checkbox"
                            />
                            {category.name}
                        </div>
                    )
                } else {
                    return (
                        <div
                            key={category.id}
                            name={category.name}
                        >
                            <input
                                type="checkbox"
                                defaultChecked
                            />
                            {category.name}
                        </div>
                    )
                }
            }
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
const mapState = ({ products, user, categories }, ownProps) => { 
    const paramId = Number(ownProps.match.params.productId)
    const product = products.find(product => product.id === paramId)
    return {
        user,
        product,
        categories
    }
}

const mapDispatch = dispatch => ({
    editProduct: (product, id) => dispatch(editProduct(product, id))
})

export default connect(mapState, mapDispatch)(ProductEdit)

/**
 * PROP TYPES
 */
// ProductEdit.PropTypes = {

// }
