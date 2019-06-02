import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticleList } from './store/articleListReducer'

class App extends Component {

  onSend = () => {
    this.props.getArticleList();
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
    isLoading: state.articleList.isLoading,
    isSuccess: state.articleList.isSuccess,
    isFailed: state.articleList.isFailed,
    list: state.articleList.list,
    error: state.articleList.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getArticleList: () => dispatch(getArticleList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
