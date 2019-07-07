import React from "react";

class Receipt extends React.Component {
  renderItem(item) {
    return (<p>Replace Me!</p>);
  }

  render() {
    const items = [{ name: "Apple", price: 3 }, { name: "Banana", price: 3 }];
    return (
      <div className="receipt">
        <h2 className="receipt-text">Receipt</h2>
        {items.map(this.renderItem)}
        <div className="receipt-item">
          <div className="total">Total:</div>
          <div className="total">$0</div>
        </div>
      </div>
    );
  }
}

export default Receipt;