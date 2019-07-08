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

  // object must have the productName and price fields
  // objects must not be undefined
  isItem(obj, productName, price) {
    if (obj.productName === productName && obj.price === price) {
     return true;
     } else {
       return false;
     }
   }
  
  // mistake you made: making a modification without calling setState
  handleAddToCart(productName, price) {
    let hasItem = false;
    let newList;

    // for (let i = 0; i < this.state.cartItems.length; i ++) {
    //   if (this.isItem(this.state.cartItems[i], productName, price)) {
    //     // newItem = this.state.cartItems[i]
    //     newItem = this.state.cartItems.splice(i,1);
    //     newItem.count += 1;
    //     hasItem = true
    //   }
    // }
    this.state.cartItems.forEach((item, index) => {
      if (this.isItem(item, productName, price)) {
        // newItem = {
        //   productName: item.productName,
        //   price: item.price,
        //   count: item.count + 1
        // }
        newList = this.state.cartItems.concat({
          productName: item.productName,
          price: item.price,
          count: item.count + 1
        });
        newList.splice(index, 1);
        hasItem = true
      }
    });
    
    if (!hasItem) {
      newList = this.state.cartItems.concat({
        productName: productName,
        price: price,
        count: 1
      });
      // newItem = {
      //   productName: productName,
      //   price: price,
      //   count: 1
      // }
    }
    this.setState({
      cartItems: newList
    });
  }

  handleRemoveFromCart(productName, price) {
    this.state.cartItems.forEach((item, index) => {
      if (this.isItem(item, productName, price)) {
        let newList = [...this.state.cartItems];
        newList.splice(index, 1);
        this.setState({
          cartItems: newList
        })
      }
    });
  }

  render() {
    return (
        <div className="page-content">
            <div className="ui container center aligned grid">
              <div className="ui cards">
                {ProductData.products.map(product => (
                  <Product 
                    productName={product.name} 
                    price={product.cost} 
                    onAddToCart={(productName, price) => this.handleAddToCart(productName, price)}
                    onRemoveFromCart={(productName, price) => this.handleRemoveFromCart(productName, price)}
                    // limit={product.stock} 
                  />
                ))}
              </div>
              <Receipt items={this.state.cartItems} />
          </div>       
        </div>
    );
  }

}

export default Cart;
