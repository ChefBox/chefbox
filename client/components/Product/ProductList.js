'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

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
        return (
            <div>
                <div>
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
