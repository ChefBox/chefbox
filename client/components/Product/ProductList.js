'use strict';

import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import {ProductItem} from '../'

/**
 * COMPONENT
 */
class ProductList extends React.Component {
    constructor(props){
        super(props)
        this.renderWithProducts = this.renderWithProducts.bind(this)
    }

    render(){
        console.log(this.props)
        return (
            <div>
                <div>
                    <h1>All Boxes</h1>
                    {
                        this.props.isAdmin !== 'admin' ?
                        null : (
                        <Link to="/products/create">
                            <button>Add Box</button>
                        </Link>
                        )
                    }
                </div>
                {
                    this.props.products[0] === undefined ?
                    <p>There are no Products registered in the database.</p> :
                    this.renderWithProducts()
                }
            </div>
        )
    }

    renderWithProducts(){
        const products = this.props.products
        return (
            <div>
                {
                    products.map(product => (
                        <ProductItem
                            product={product}
                            key={product.id}
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
const mapState = ({ products, users }) => {
    const isAdmin = !!users ? users.role : null
    return { products, isAdmin }
}

export default connect(mapState)(ProductList)
