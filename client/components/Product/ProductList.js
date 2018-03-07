'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {ProductItem, AllCategories} from '../'

/**
 * COMPONENT
 */
class ProductList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products: ProductList.filterProducts(props)
        }
        this.renderWithProducts = this.renderWithProducts.bind(this)
    }

    static filterProducts(props){
        if(!props.categoryName) return props.products
        const categoryName = props.categoryName.toLowerCase()

        return props.products
            .filter(product => product.categories
                .find(category => 
                    category.name.toLowerCase() === categoryName))
    }

    componentWillReceiveProps(props) {
        this.setState({products: ProductList.filterProducts(props)})
    }

    render(){
        return (
            <div>
                <div>
                    <AllCategories />
                    <h1>All Boxes</h1>
                    {
                        this.props.isAdmin !== 'admin' ?
                        null : (
                        <Link to="/products/admin/create">
                            <button>Add Box</button>
                        </Link>
                        )
                    }
                </div>
                {
                    this.state.products[0] === undefined ?
                    <p>There are no Products registered in the database.</p> :
                    this.renderWithProducts()
                }
            </div>
        )
    }

    renderWithProducts(){
        const products = this.state.products
        return (
            <div>
                {
                    products.map(product => (
                        <ProductItem
                            product={product}
                            key={product.id}
                            showDeleteButton={true}
                        />
                    ))
                }
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = ({ products, user }) => {
    return {
        products,
        isAdmin: !user ? null : user.role
    }
}

export default connect(mapState)(ProductList)
