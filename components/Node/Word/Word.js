import React, { Component, PropTypes } from 'react';

export default class Word extends Component {

  render() {

    const { data: { name } } = this.props;

    return (
      <div className="Node-data word">
        <div className="Node-data-content word">
          <p className="Node-data-content-name word">{name}</p>
        </div>
      </div>
    );
  }
}

Node.propTypes = {
  data: PropTypes.object.isRequired,
};
