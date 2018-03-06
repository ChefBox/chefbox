'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {addProduct} from '../../store'

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
            categories: [],
            imageUrl: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render(){
        console.log(this.state)
        const availability = [
            'pending',
            'available',
            'out of stock'
        ]
        return (
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
                                this.setState({ imageUrl: event.target.value })
                            }
                            name="imageUrl"
                            placeholder="Product imageUrl"
                            required
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
                        Product Number in Stock
                        <input
                            onChange={event =>
                                this.setState({ numberInStock: event.target.value })
                            }
                            name="numberInStock"
                            required
                            placeholder="numberInStock"
                        />
                    </h3>
                    <h3>
                        Product Availability
                        <select
                            onChange={event =>
                                this.setState({ availability: event.target.value })
                            }>
                            {
                                availability
                                    .map(option => (
                                        <option key={option}>{option}</option>
                                    )
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
                        Product Category
                        <div>
                            {
                                !this.props.categories ?
                                <p>There is no Category.</p> :
                                this.renderWithCategories()
                            }
                        </div>
                        <div>
                            <Link to="/addcategory">
                                <button>Add Category</button>
                            </Link>
                        </div>
                    </h3>
                    <button>Add Product</button>
                </form>
            </div>
        )
    }

    renderWithCategories(){
        const {categories} = this.props
        return categories.map(category => (
                <div
                    onChange={event => {
                        const isMatch = this.state.categories.findIndex(element => element.id === event.target.name)
                        if (isMatch < 0){
                            this.setState({categories: [...this.state.categories, {id: event.target.name}]})
                        } else {
                            this.setState({
                                categories: this.state.categories.slice(0, isMatch).concat(this.state.categories.slice(isMatch+1)) 
                            })
                        }
                    }}
                    key={category.id}
                    name={category.id}
                >
                    <input type="checkbox" name={category.id}/> {category.name}
                </div>
            )
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
const mapState = ({ categories }) => ({ categories })

const mapDispatch = (dispatch) => ({
    addProduct: (product) =>
        dispatch(addProduct(product)
    )
})

export default connect(mapState, mapDispatch)(ProductCreate)
