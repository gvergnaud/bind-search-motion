import React, { Component, PropTypes } from 'react';
import { saveState, revertHistory } from '../../actions';
import { TransitionSpring } from 'react-motion';
import './Timeline.less';

export default class Timeline extends Component {

  constructor(props) {
    super(props);

    this._revert = this._revert.bind(this);
    this._getSpringValues = this._getSpringValues.bind(this);
    this._willEnter = this._willEnter.bind(this);
    this._willLeave = this._willLeave.bind(this);
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
                  }}
                  onClick={this._revert(state)}
                />
              );
            })}
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
