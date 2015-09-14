import React, { Component, PropTypes } from 'react';
import Node from '../Node/Node';
import { TransitionSpring } from 'react-motion';
import difference from 'lodash/array/difference';

import './SearchGraph.less';

export default class SearchGraph extends Component {

  constructor(props) {
    super(props);

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
    this.leavingNodes = [
      ...this.leavingNodes,
      ...difference(
        this.props.nodes.map(nodeRef => nodeRef.nodeId),
        nextProps.nodes.map(nodeRef => nodeRef.nodeId)
      )
        .map(nodeId =>
          [...this.props.nodes, ...nextProps.nodes].filter(nodeRef =>
            nodeRef.nodeId === nodeId
          )[0]
        )
        .map(nodeRef => ({
          isLeaving: true,
          ...nodeRef
        }))
    ];

  }

  _removeFromLeavingNodes(nodeId) {
      this.leavingNodes = this.leavingNodes.filter(nodeRef => nodeRef.nodeId !== nodeId);
  }

  _getDefaultValue() {
    return {
      val: {
        x: 0,
        y: 0,
        scale: 1,
        width: 125,
        height: 125
      },
      config: [110, 30]
    };
  }

  _getPosition(index, length, rayon) {
    const
      angle = Math.PI * (index * 2) / length,
      x = rayon * Math.cos(angle),
      y = - rayon * Math.sin(angle);

    return {x, y};
  }

  _getSpringValues(lastValues) {
    return this.props.nodes.reduce((values, nodeRef, index) => {
      const
        length = this.props.nodes.length,
        rayon = 100 + length * 100 / (2 * Math.PI),
        position = this._getPosition(index, length, rayon);

      values[nodeRef.nodeId] = {
        val: {
          ...this._getDefaultValue().val,
          x: nodeRef.isCenter ? 0 : position.x,
          y: nodeRef.isCenter ? 0 : position.y,
          scale: (2 + 3 * nodeRef.pertinence) / 5,
        },
        config: nodeRef.isCenter ? [200, 25] : this._getDefaultValue().config,
      };

      return values;
    }, {});
  }

  _willEnter(key) {
    return {
      ...this._getDefaultValue(),
      val: {
        ...this._getDefaultValue().val,
        scale: 0,
      }
    };
  }

  _willLeave(key, value, endValues, currentValues, currentSpeed) {
    return {
      val: {
        ...this._getDefaultValue().val,
        scale: 0,
        y: currentValues[key].val.y,
        x: currentValues[key].val.x,
      },
      config: [160, 17],
    };
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
              {[...this.props.nodes, ...this.leavingNodes].map(nodeRef => {
                const node = this.props.nodesById[nodeRef.nodeId];

                if (!values[node.id]) return this._removeFromLeavingNodes(node.id);

                const { val: {x, y, scale, width, height} } = values[node.id];
                return (
                  <Node
                    dispatch={this.props.dispatch}
                    key={nodeRef.nodeId}
                    node={node}
                    isCenter={nodeRef.isCenter}
                    style={{
                      transform: `translate(${x + this.state.baseX}px, ${y + this.state.baseY}px) scale(${scale})`,
                      WebkitTransform: `translate(${x + this.state.baseX}px, ${y + this.state.baseY}px) scale(${scale})`,
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
