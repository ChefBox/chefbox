'user strict'

import React from 'react'
import { connect } from 'react-redux'


/**
 * COMPONENT
*/

function Cart(props) {
  // console.log('LOCAL STORAGE.STATE', localStorage.state);
  //localStorage.cart = [{ product: 'Bananas', price: 2.99, quantity: 3 }];

  const currentCart = findUsersCart(props)
  console.log(currentCart)
  console.log('CURRENT CART', currentCart)
  // const structuredCart = structureCart(currentCart)
  // // console.log('CART', currentCart)
  // console.log('STRUCTURED CART', structuredCart)


  return (

    <div className="cart">
      <h1>Your Cart</h1>
      {!props.user ? (<p>Your cart is empty.</p>) :
        (
          <table>
            <thead>
              <tr>
                <td className="cart-name-col">Box</td><td className="cart-price-col">Price</td><td className="cart-quantity-col">Quantity</td><td className="cart-total-col">Total</td>
              </tr>
            </thead>
            <tbody>
              {currentCart && currentCart.lineItems.map(i => (
                <tr key={`${i.productId}-${i.orderId}`}>
                  <td className="cart-line-name">{currentCart.products.find(p => p.id === i.productId).name}</td>
                  <td className="cart-line-price">{currentCart.products.find(p => p.id === i.productId).price}</td>
                  <td className="cart-line-quantity">{i.quantity}</td>
                  <td className="cart-line-total">{((currentCart.products.find(p => p.id === i.productId)).price * i.quantity).toFixed(2)}</td>
                </tr>
              )
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>TOTAL</td><td /><td /><td>{currentCart && grandTotal(currentCart).toFixed(2)}
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
const mapState = ({ orders, user }) => {
  return {
    user,
    orders
  }
}

function findUsersCart(props) {
  if (props.user || props.orders.find(ord => ord.userId === props.user.id)) {
    return props.orders.find(ord => ord.userId === props.user.id)
  }
  // if (props.orders.find(ord => ord.userId === props.user.id)) {
  // }
}

function structureCart(cart) {
  console.log('CART IN STRUCTURED', cart)
  return cart.lineItem.map(i => {
    const prod = cart.products.find(p => p.id === i.productId)
    return {
      name: prod.name,
      quanity: i.quantity,
      price: prod.price
    }
  })
}

function grandTotal(c) {
  console.log('GRAND TOTAL items', c.lineItems)
  return c.lineItems.reduce((total, li) =>  {
    const prodPrice = c.products.find(p => p.id === li.productId).price
    console.log('PordPrice', prodPrice)
    return  total += li.quantity * prodPrice
  }, 0)
}

export default connect(mapState)(Cart)


