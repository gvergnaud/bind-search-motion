import React, { Component, PropTypes } from 'react';

export default class Link extends Component {

  render() {

    const { data: { name, picture } } = this.props;

    return (
      <div className="Node-data link">
        <img className="Node-data-cover link" src={picture} />
        <div className="Node-data-content link">
          <p className="Node-data-content-name link">{name}</p>
        </div>
      </div>
    );
  }
}

Node.propTypes = {
  data: PropTypes.object.isRequired,
};
