import React from "react";
import "./styles/cart.css";
import Product from "./Product";
import ProductData from "./Data";
/* Project 1 Part 2 */
import Receipt from "./Receipt";

class Cart extends React.Component {
  // a shopping cart , a dictionary of items to their quantities
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    }

  }

  render() {
    return (
        <div className="page-content">
            <h2>Add your products here!</h2>
            <div>
              {ProductData.products.map(product => (
                <Product 
                  productName={product.name} 
                  price={product.cost} 
                  // limit={product.stock} 
                />
              ))}
            </div>
            <Receipt />
        </div>
    );
  }

}

export default Cart;
