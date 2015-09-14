import React, { Component, PropTypes } from 'react';

import './Bookmark.less';

export default class Bookmark extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleWindowKeyDown.bind(this));
  }

  componentDidUnmount() {
    document.removeEventListener('keydown', this._handleWindowKeyDown.bind(this));
  }

  _handleWindowKeyDown(e) {
    if (e.which === 77){
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  render() {
    return (
      <div className={`Bookmark ${this.state.isOpen ? 'open' : ''}`}>

      </div>
    );
  }
}
