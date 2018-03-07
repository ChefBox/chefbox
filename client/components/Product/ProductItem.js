'use strict';

import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { removeProduct } from '../../store'

/**
 * COMPONENT
 */
class ProductItem extends React.Component {
    constructor(props){
        super(props)
        this.removeProductCallback = this.removeProductCallback.bind(this)
    }

    render(){
        const {product, isAdmin, showDeleteButton} = this.props
        console.log('PRODUCT IMAGES', JSON.stringify(product.id), JSON.stringify(product.productImages[0]))
        if(product === undefined) return null;

        return (
            <div>
                <Link to={`/products/${product.id}`}>
                <img src={product.productImages[0].imageUrl} />
                    <h3>{product.name}</h3>
                    <p>Ingredients: {product.ingredients.join(', ')}</p>
                </Link>
                {
                    isAdmin !== 'admin' || !showDeleteButton ?
                    null : <button onClick={this.removeProductCallback} >Delete</button>
                }
            </div>
        )
    }

    removeProductCallback(event){
        event.preventDefault()
        const { removeProduct, product } = this.props
        removeProduct(product.id)
    }
}

/**
 * CONTAINER
 */
const mapState = ({ user }) => {
    return { isAdmin: !user ? null : user.role }
}

const mapDispatch = dispatch => ({
    removeProduct: ProductId => dispatch(removeProduct(ProductId))
})

export default connect(mapState, mapDispatch)(ProductItem)
