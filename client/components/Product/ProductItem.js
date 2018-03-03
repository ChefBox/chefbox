'use strict';

import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
class ProductItem extends React.Component {
    
    render(){
        const product = this.props.product
        return (
            <div>
                <Link to={`/products/${product.id}`}>
                    <img src={product.productImages[0].imageUrl} />
                    <h3>{product.name}</h3>
                    <p>Ingredients: {product.ingredients}</p>
                </Link>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = null

export default connect(mapState)(ProductItem)
