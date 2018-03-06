'user strict'

import React from 'react'
import { connect } from 'react-redux'
import { deleteItem, checkout } from '../store';

/**
 * COMPONENT
*/
function Cart(props) {
 const cart = props.cart

  return (

    <div className="cart">
      <h1>Your Cart</h1>
      {!cart.lineItems || (cart.lineItems.length === 0) ? (<p>Your cart is empty.</p>) :
        (
          <div>
            <table>
              <thead>
                <tr>
                  <td className="cart-name-col">Box</td>
                  <td className="cart-price-col">Price</td>
                  <td className="cart-quantity-col">Quantity</td>
                  <td className="cart-total-col">Total</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {cart.lineItems && cart.lineItems.map(i => (
                  <tr key={`${i.productId}-${i.orderId}`}>
                    <td className="cart-line-name">{cart.products.find(p => p.id === i.productId).name}</td>
                    <td className="cart-line-price">${cart.products.find(p => p.id === i.productId).price}</td>
                    <td className="cart-line-quantity">{i.quantity}</td>
                    <td className="cart-line-total">${((cart.products.find(p => p.id === i.productId)).price * i.quantity).toFixed(2)}</td>
                    <td><button onClick={evt => props.deleteItem(evt, i.productId)}>x remove</button></td>
                  </tr>
                )
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td>TOTAL</td><td /><td /><td>${cart.lineItems && props.grandTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
            {props.user.id ? <button onClick={() => props.checkout(props.grandTotal)}>Checkout</button> : <h2>Please log in to checkout</h2>}
          </div>
        )}
    </div>
  )
}


/**
 * CONTAINER
 */
const mapState = ({ cart, user }) => {
  return {
    cart,
    grandTotal: cart !== undefined ? grandTotal(cart).toFixed(2) : 0,
    user
  }
}

const mapDispatch = (dispatch) => ({
  deleteItem(evt, productId) {
    event.preventDefault()
    dispatch(deleteItem(productId))
  },
  checkout: (price) => dispatch(checkout(price))
})

function grandTotal(c) {
  if ( c.lineItems === undefined) return 0
  return c.lineItems.reduce((total, li) =>  {
    const prodPrice = c.products.find(p => p.id === li.productId).price
    total += li.quantity * prodPrice
    return total
  }, 0)
}

export default connect(mapState, mapDispatch)(Cart)

