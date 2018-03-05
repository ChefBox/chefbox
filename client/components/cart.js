'user strict'

import React from 'react'
import { connect } from 'react-redux'


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
          <table>
            <thead>
              <tr>
                <td className="cart-name-col">Box</td><td className="cart-price-col">Price</td><td className="cart-quantity-col">Quantity</td><td className="cart-total-col">Total</td>
              </tr>
            </thead>
            <tbody>
              {cart.lineItems && cart.lineItems.map(i => (
                <tr key={`${i.productId}-${i.orderId}`}>
                  <td className="cart-line-name">{cart.products.find(p => p.id === i.productId).name}</td>
                  <td className="cart-line-price">${cart.products.find(p => p.id === i.productId).price}</td>
                  <td className="cart-line-quantity">{i.quantity}</td>
                  <td className="cart-line-total">${((cart.products.find(p => p.id === i.productId)).price * i.quantity).toFixed(2)}</td>
                </tr>
              )
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>TOTAL</td><td /><td /><td>${cart.lineItems && grandTotal(cart).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({ orders, user, cart }) => {
  return {
    user,
    orders,
    cart
  }
}

function grandTotal(c) {
  return c.lineItems.reduce((total, li) =>  {
    const prodPrice = c.products.find(p => p.id === li.productId).price
    total += li.quantity * prodPrice
    return total
  }, 0)
}

export default connect(mapState)(Cart)


