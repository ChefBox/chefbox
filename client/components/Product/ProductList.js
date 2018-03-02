'use strict';

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import {ProductItem} from '../'

/**
 * COMPONENT
 */
class ProductList extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div>
                    <h1>All Boxes</h1>
                    <Link to="/products/create">
                        <button>Add Box</button>
                    </Link>
                </div>
                {
                    this.props.products[0] === undefined ?
                    <p>There are no Products registered in the database.</p> : 
                    this.renderWithProducts(this.props.products)
                }
            </div>
        )

    }

    renderWithProducts(products){
        return(
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
const mapState = ({ products }) => ({ products })

// const mapDispatch = dispatch => {
// }

export default connect(mapState)(ProductList)

/**
 * PROP TYPES
 */
// ProductDetail.PropTypes = {

// }