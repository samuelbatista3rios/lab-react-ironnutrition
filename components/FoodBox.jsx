import React, { Component } from "react";

class FoodBox extends Component {
  render() {
    const { name, image, calories, quantity } = this.props.food;
    const { onPlusButton, onQuantityChange, food } = this.props;

    return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={image} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{name}</strong> <br />
                <small>{calories} cal</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={quantity}
                  name={name}
                  onChange={(event) => onQuantityChange(event)}
                />
              </div>
              <div className="control">
                <button
                  className="button is-info"
                  onClick={() => onPlusButton(food)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default FoodBox;