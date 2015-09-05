import React, { Component, PropTypes } from 'react';
import Node from '../Node/Node';
import { TransitionSpring } from 'react-motion';
import difference from 'lodash/array/difference';

import './SearchGraph.less';

export default class SearchGraph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      config: [110, 30],
      rayon: 225,
    };

    this.leavingNodes = [];

    this._getSpringValues = this._getSpringValues.bind(this);
    this._willLeave = this._willLeave.bind(this);
    this._willEnter = this._willEnter.bind(this);
  }

  componentDidMount() {
    this.setState({
      baseX: window.innerWidth / 2,
      baseY: window.innerHeight / 2,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.leavingNodes =
      difference(this.props.nodes, nextProps.nodes)
        .map(nodeRef => ({
          isLeaving: true,
          ...nodeRef
        }));
  }

  _getDefaultValue() {
    return {
      val: {
        x: 0,
        y: 0,
        scale: 1,
        width: 100,
        height: 100
      },
      config: this.state.config
    };
  }

  _getPosition(index, length, rayon) {
    rayon = rayon || this.state.rayon;
    const
      angle = Math.PI * (index * 2) / length,
      x = rayon * Math.cos(angle),
      y = - rayon * Math.sin(angle);

    return {x, y};
  }

  _getSpringValues(lastValues) {

    var values = {};

    this.props.nodes.forEach((nodeRef, index) => {
      const position = this._getPosition(index, this.props.nodes.length);
      values[nodeRef.nodeId] = {
        val: {
          x: nodeRef.isCenter ? 0 : position.x,
          y: nodeRef.isCenter ? 0 : position.y,
          width: 50 + 75 * nodeRef.pertinence,
          height: 50 + 75 * nodeRef.pertinence,
          scale: 1,
        },
        config: nodeRef.isCenter ? [200, 25] : this.state.config,
      }
    });

    return values;
  }

  _willEnter(key) {
    let enterValue = this._getDefaultValue();
    enterValue.val.scale = 0;
    return enterValue;
  }

  _willLeave(key, value, endValues, currentValues, currentSpeed) {
    let leaveValue = this._getDefaultValue();
    leaveValue.val.scale = 0;
    leaveValue.val.x = currentValues[key].val.x;
    leaveValue.val.y = currentValues[key].val.y;
    leaveValue.config = [160, 17];
    return leaveValue;
  }

  render() {
    return (
      <div className="SearchGraph">

        <TransitionSpring
          endValue={this._getSpringValues}
          willLeave={this._willLeave}
          willEnter={this._willEnter}>
          {(values) =>
            <div>
              {[...this.props.nodes, ...this.leavingNodes].map((nodeRef, key) => {
                const node = this.props.nodesById[nodeRef.nodeId];
                const { val: {x, y, scale, width, height} } = values[node.id] || this._getDefaultValue();
                return (
                  <Node
                    dispatch={this.props.dispatch}
                    key={key}
                    node={node}
                    isCenter={nodeRef.isCenter}
                    style={{
                      transform: `translate(${x + this.state.baseX}px, ${y + this.state.baseY}px) scale(${scale})`,
                      width,
                      height,
                      top: - height / 2,
                      left: - width / 2,
                      zIndex: nodeRef.isLeaving ? 0 : 1,
                    }}
                  />
                );
              })}
            </div>
          }
        </TransitionSpring>
      </div>
    );
  }
}

SearchGraph.propTypes = {
  nodesById: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
}
