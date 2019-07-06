import React from "react";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: this.props.productName,
            price: this.props.price,
            limit: this.props.limit,
            amount: 0
        }
    }

    addToCart(productName) {
        if (this.state.limit == 0) {
            window.alert("This item is out of stock!");
        } else if (this.state.amount > this.state.limit) {
            window.alert("There are too many " + productName +  " in your cart!");
        } else {
            this.setState({
                amount: this.state.amount + 1
            }, () => {
                window.alert("There are " + this.state.amount + " " + productName +  "s in your cart!");
            })
        }
        
    }

    render() {
        return (
            <div className="ui cards">
                <div className="card">
                    <div className="content">
                    <div className="header">{this.state.productName}</div>
                    <div className="description">
                        Price: ${this.state.price}
                    </div>
                    </div>
                    <div className="ui bottom attached button" onClick = {() => this.addToCart(this.state.productName)}>
                    <i className="add icon"></i>
                    Add Friend
                    </div>
                </div>
            </div>
        );
    }
}
export default Product;