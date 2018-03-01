'use strict';

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { addProduct } from '../../store'

/**
 * COMPONENT
 */
class ProductCreate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
            ingredients: [],
            price: 0,
            timeToPrep: 0,
            availability: 'pending',
            numberInStock: 0,
            calories: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render(){
        const availability = [
            'pending',
            'available',
            'out of stock'
        ]
        const product = this.state
        return(
            <div>
                <form onSubmit={this.handleSubmit} >
                    <h3>
                        Product Name
                        <input
                            onChange={event =>
                                this.setState({ name: event.target.value })
                            }
                            name="name"
                            required
                            placeholder="Product Name"
                        />
                    </h3>
                    <h3>
                        Product Image
                        <input
                            onChange={event =>
                                this.setState({ image: event.target.value })
                            }
                            name="Image"
                            placeholder="Product Image"
                            // required
                            // value=
                        />
                    </h3>
                    <h3>
                        Product Ingredients
                        <input
                            onChange={event =>
                                this.setState({ ingredients: event.target.value.split(',') })
                            }
                            name="ingredients"
                            required
                            placeholder="Product Ingredients"
                            
                        />
                    </h3>
                    <h3>
                        Product Preperation Time(minutes)
                        <input
                            onChange={event =>
                                this.setState({ timeToPrep: event.target.value })
                            }
                            name="timeToPrep"
                            required
                            placeholder="Prepertation Time"
                        />
                    </h3>
                    <h3>
                        Product Calories
                        <input
                            onChange={event =>
                                this.setState({ calories: event.target.value })
                            }
                            name="calories"
                            required
                            placeholder="Calories"
                        />
                    </h3>
                    <h3>
                        Product Price
                        <input
                            onChange={event =>
                                this.setState({ price: event.target.value })
                            }
                            name="price"
                            required
                            placeholder="Price"
                        />
                    </h3>
                    <h3>
                        Product Availability

                        <select
                            onChange={event => 
                                    this.setState({ availability: event.target.value })
                            }
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
                                this.setState({ description: event.target.value })
                            }
                            name="description"
                            required
                            placeholder="Give detail about this product"
                        />
                    </h3>
                    <h3>
                        Product Catagory
                        {/* <form  >
                            {
                                this.state.Catagories
                                    .map(option => 
                                        <div
                                            key={option.id}
                                            name="option"
                                        >
                                            <input type="checkbox"/>
                                            {option.name}
                                        </div>
                                )
                            }
                        </form> */}
                    </h3>
                    <button>Add Product</button>
                </form>
            </div>
        )
    }

    handleSubmit(event){
        event.preventDefault()
        const { addProduct } = this.props
        addProduct(this.state)
    }
}

/**
 * CONTAINER
 */
const mapState = null

const mapDispatch = (dispatch, ownProps) => ({
    addProduct: (product) =>
        dispatch(addProduct(product, ownProps.history)
    )
})

export default connect(mapState, mapDispatch)(ProductCreate)

/**
 * PROP TYPES
 */
// ProductEdit.PropTypes = {

// }