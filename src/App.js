import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux'
import * as ActionTypes from './store/actionTypes'
import * as articleListActions from './store/articleListReducer'

class App extends Component {

  onSend = () => {
    // console.log(this.props.articleListActions.getArticleList);
    this.props.articleListActions.getArticleList();
  }

  render() {
    const {
      isLoading,
      isSuccess,
      isFailed,
      list,
      error,
    } = this.props;
    return (
      <div>
        <button onClick={this.onSend}>send</button>

        <h1>
          {`isLoading : ${isLoading}`}
        </h1>
        <h1>
          {`isSuccess : ${isSuccess}`}
        </h1>
        <h1>
          {`isFailed : ${isFailed}`}
        </h1>
        <h1>
          {`list : ${JSON.stringify(list)}`}
        </h1>
        <h1>
          {`error : ${JSON.stringify(error)}`}
        </h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.pender.pending[ActionTypes.GET_ARTICLE_LIST],
    isSuccess: state.pender.success[ActionTypes.GET_ARTICLE_LIST],
    isFailed: state.pender.failure[ActionTypes.GET_ARTICLE_LIST],
    list: state.articleList.list,
    error: state.articleList.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // getArticleList: () => dispatch(articleListActions.getArticleList()),
    // deleteArticle: (id) => dispatch(articleListActions.deleteArticle(id)),

    articleListActions: bindActionCreators(articleListActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
