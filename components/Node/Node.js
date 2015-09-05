import React, { Component, PropTypes } from 'react';
import Image from './Image/Image';
import Word from './Word/Word';
import Link from './Link/Link';
import { search } from '../../actions';

import './Node.less';

export default class Node extends Component {

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    if(!this.props.isCenter)
      this.props.dispatch(search(this.props.node));
  }

  _renderNodeData(type, data) {
    switch (type) {
      case 'image':
        return <Image data={data} />;

      case 'link':
        return <Link data={data} />;

      case 'word':
        return <Word data={data} />;
    }
  }

  render() {

    const { node: { data, type } } = this.props;

    return (
      <div
        className="Node"
        onClick={this._handleClick}
        style={{
          ...this.props.style,
        }}>
        {this._renderNodeData(type, data)}
      </div>
    );
  }
}

Node.propTypes = {
  node: PropTypes.object.isRequired,
  style: PropTypes.object,
};
