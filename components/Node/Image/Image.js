import React, { Component, PropTypes } from 'react';

export default class Image extends Component {

  render() {

    const { data: { picture } } = this.props;

    return (
      <div className="Node-data image">
        <img className="Node-data-cover image" src={picture} />
      </div>
    );
  }
}

Node.propTypes = {
  data: PropTypes.object.isRequired,
};
