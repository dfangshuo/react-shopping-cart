import React from "react";
import "./styles/cart.css";
import Product from "./Product";

class Cart extends React.Component {

  render() {
    return (
        <div className="page-content">
            <h2>Add your products here!</h2>
            <div>
              <Product productName="Apple" price={2} limit={5} />
              <Product productName="Banana" price={1} limit={0} />
              <Product productName="Cherry" price={3} limit={5} />
              <Product productName="Durian" price={4} limit={5} />
            </div>
        </div>
    );
  }

}

export default Cart;
