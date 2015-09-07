import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// components
import Bookmark from '../components/Bookmark/Bookmark';
import SearchGraph from '../components/SearchGraph/SearchGraph';
import Timeline from '../components/Timeline/Timeline';
// actions
import { search } from '../actions';

class Search extends Component {

  componentDidMount() {
    this.props.dispatch(search({
      id: 10,
      type: 'word',
      data: {
        name: 'bonheur',
      }
    }));
  }

  render() {
    let { dispatch, nodesById, nodes, bookmarked, stateHistory } = this.props;
    return (
      <div>
        <Bookmark
          nodesById={nodesById}
          bookmarked={bookmarked} />
        <SearchGraph
          dispatch={dispatch}
          nodesById={nodesById}
          nodes={nodes} />
        <Timeline
          dispatch={dispatch}
          nodes={nodes}
          nodesById={nodesById}
          stateHistory={stateHistory} />
      </div>
    );
  }
}

function mapStateToProps({ nodesById, nodes, bookmarked, stateHistory }) {
  return {nodesById, nodes, bookmarked, stateHistory};
}

export default connect(mapStateToProps)(Search);
