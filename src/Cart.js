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
  
  // // mistake you made: making a modification without calling setState
  // handleAddToCart(productName, price) {
  //   let hasItem = false;
  //   let newList;

  //   // for (let i = 0; i < this.state.cartItems.length; i ++) {
  //   //   if (this.isItem(this.state.cartItems[i], productName, price)) {
  //   //     // newItem = this.state.cartItems[i]
  //   //     newItem = this.state.cartItems.splice(i,1);
  //   //     newItem.count += 1;
  //   //     hasItem = true
  //   //   }
  //   // }
  //   this.state.cartItems.forEach((item, index) => {
  //     if (this.isItem(item, productName, price)) {
  //       // newItem = {
  //       //   productName: item.productName,
  //       //   price: item.price,
  //       //   count: item.count + 1
  //       // }
  //       newList = this.state.cartItems.concat({
  //         productName: item.productName,
  //         price: item.price,
  //         count: item.count + 1
  //       });
  //       newList.splice(index, 1);
  //       hasItem = true
  //     }
  //   });
    
  //   if (!hasItem) {
  //     newList = this.state.cartItems.concat({
  //       productName: productName,
  //       price: price,
  //       count: 1
  //     });
  //     // newItem = {
  //     //   productName: productName,
  //     //   price: price,
  //     //   count: 1
  //     // }
  //   }

  //   this.setState({
  //     cartItems: newList
  //   });

  //   // this.setState({
  //   //   cartItems: this.state.cartItems.concat({
  //   //     productName: productName,
  //   //     price: price,
  //   //     count: 1
  //   //   }).reduce(this.combineItems)
  //   // });
  // }

  // // ying hang's version, his usage of reduce just recreates the same cart
  // // albeit with the count field of the appropriate item updated accordingly
  // // it assumes that the cart only has one of eeach item
  // // at the end if the item is not seen, it's added to the cart
  // handleAddToCart(productName, price) {
  //   let found = false;
  //   // Check if new item is already in shopping cart
  //   let newCart = this.state.cartItems.reduce((acc, curr) => {
  //     if (!found && curr.name === productName && curr.price === price) {
  //       curr.count += 1;
  //       found = true;
  //     }
  //     acc.push(curr);
  //     return acc;
  //   }, []);
  //   // Add the new item to the shopping cart
  //   if (!found) newCart.push({
  //     name: productName,
  //     price: price,
  //     count: 1
  //   });
  //   this.setState({cartItems: newCart});
  // }

  handleAddToCart(productName, price) {
    const cartItems = this.state.cartItems.concat({
      productName: productName,
      price: price,
      count: 1
    });

    // good catch #1 (aka i actually managed to catch it)
    // if you convert from a 1 line => function
    // to a multiple one line, you need to 
    // remember to use a return statement
    const reducer = (accumulator, curr) => {
      let seen = false;
      accumulator.forEach(item => {
        if (item.productName === curr.productName && item.price === curr.price) {
          item.count += curr.count;
          seen = true;
        }
      });
      return seen ? accumulator : accumulator.concat(curr);
      
    }

    this.setState({
      cartItems: cartItems.reduce(reducer, [])
    }) 
  }

  isSameItem(item1, item2) {
    if (item1.productName === item2.productName && item1.price === item2.price) {
      return true;
    } else {
      return false;
    }
  }

  combineItems(total, curr) {
    if (total.productName === curr.productName && total.price === curr.price) {
      total.count += curr.count;
      return [total];
    } else {
      return [total, curr]
    }
  }

  handleRemoveFromCart(productName, price) {
    let cartItems = [...this.state.cartItems];
    cartItems.forEach(item => {
      if (this.isItem(item, productName, price)) {
        item.count -= 1;
      }
    })
    this.setState({
      cartItems: cartItems.filter(item => item.count > 0)
    });
    // this.state.cartItems.forEach((item, index) => {
    //   if (this.isItem(item, productName, price)) {
    //     let newList;
    //     if (item.count > 1) {
    //       newList = [...this.state.cartItems];
    //       newList[index].count -= 1;
    //     } else {
    //       newList = [...this.state.cartItems];
    //       newList.splice(index, 1);
    //     }
    //     this.setState({
    //       cartItems: newList
    //     });
    //   }
    // });
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
