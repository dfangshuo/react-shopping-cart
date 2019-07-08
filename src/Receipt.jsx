import React from "react";
import { totalmem } from "os";

class Receipt extends React.Component {
  constructor(props) {
    super(props);
  }
  renderItem(item) {
    return (
      <div className="receipt-item" key={item.name}>
        <div className="receipt-text">
          {item.productName} x {item.count}
        </div>
        <div className="receipt-text">
          ${item.price}
        </div>
      </div>
      );
  }

  sumCart(items) {
    let total = 0;
    items.forEach(item => {
      total += item.price * item.count;
    });
    return total.toFixed(2);
  }

  render() {
    // const items = [{ name: "Apple", price: 3 }, { name: "Banana", price: 3 }];
    return (
      <div className="receipt">
        <h2 className="receipt-text">Receipt</h2>
        {this.props.items.map(this.renderItem)}
        <div className="receipt-item">
          <div className="total">Total:</div>
          <div className="total">${this.sumCart(this.props.items)}</div>
        </div>
      </div>
    );
  }
}

export default Receipt;