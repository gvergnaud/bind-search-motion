import React, { Component, PropTypes } from 'react';
import { saveState, revertHistory } from '../../actions';
import { TransitionSpring } from 'react-motion';
import Node from '../Node/Node';
import './Timeline.less';

export default class Timeline extends Component {

  constructor(props) {
    super(props);

    this.state = {
      centerNode: false,
      showNode: false,
    };

    this._revert = this._revert.bind(this);
    this._getSpringValues = this._getSpringValues.bind(this);
    this._willEnter = this._willEnter.bind(this);
    this._willLeave = this._willLeave.bind(this);
    this._getCenterNode = this._getCenterNode.bind(this);
    this._showNode = this._showNode.bind(this);
    this._hideNode = this._hideNode.bind(this);
    this._renderNodePreview = this._renderNodePreview.bind(this);
  }

  _getCenterNode(state) {
    return this.props.nodesById[state.filter(nodeRef => nodeRef.isCenter)[0].nodeId];
  }

  _showNode(state, x) {
    return function() {
      this.setState({
        activeState: state,
        centerNode: this._getCenterNode(state),
        centerNodeXPosition: x,
        showNode: true,
      });
    }.bind(this);
  }

  _hideNode() {
    this.setState({
      showNode: false,
    });
  }

  _revert(state) {
    return function() {
      if(state === this.props.nodes) return;
      this.props.dispatch(revertHistory(state));
    }.bind(this);
  }

  _getSpringValues(lastValues) {
    const stateKeys = Object.keys(this.props.stateHistory).sort();
    return stateKeys.reduce((acc, key) => {
      acc[key] = {
        val: {
          x: window.innerWidth / stateKeys.length * stateKeys.indexOf(key) + (window.innerWidth / stateKeys.length / 2),
        },
      };
      return acc;
    }, {});
  }

  _willEnter(key) {
    return {
      val: {
        x: window.innerWidth,
      },
    };
  }

  _willLeave() {
    return {
      val: {
        x: 0,
      },
    };
  }

  _renderNodePreview() {
    if (this.state.showNode && this.state.centerNode) {
      return (
        <Node
          node={this.state.centerNode}
          style={{
            width: 100,
            height: 100,
            top: -65,
            left: -45,
            transform: `translateX(${this.state.centerNodeXPosition}px) scale(.5)`,
            WebkitTransform: `translateX(${this.state.centerNodeXPosition}px) scale(.5)`,
          }}
        />
      );
    }
  }

  render() {
    const { stateHistory } = this.props;
    return (
      <TransitionSpring
        endValue={this._getSpringValues}
        willEnter={this._willEnter}
        willLeave={this._willLeave}>
        {(values) =>
          <div className="Timeline">
            {Object.keys(stateHistory).map(timestamp => {
              const state = stateHistory[timestamp];
              const { val: {x} } = values[timestamp] || this._willEnter();
              return (
                <div
                  className="Timeline-point"
                  key={timestamp}
                  state={state}
                  style={{
                    transform: `translateX(${x}px)`,
                    WebkitTransform: `translateX(${x}px)`,
                  }}
                  onClick={this._revert(state)}
                  onMouseEnter={this._showNode(state, x)}
                  onMouseLeave={this._hideNode}
                />
              );
            })}
            {this._renderNodePreview()}
          </div>
        }
      </TransitionSpring>
    );
  }
}

Timeline.propTypes = {
  stateHistory: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
