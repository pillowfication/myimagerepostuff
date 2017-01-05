import React from 'react';
import request from 'superagent';
import Dump from './Dump.jsx';

const App = React.createClass({
  getInitialState() {
    return {
      loading: true,
      evakuu: null
    };
  },
  componentDidMount() {
    request.get('evakuu.json').end((err, res) => {
      if (err) {
        this.setState({loading: false});
      } else {
        this.setState({loading: false, evakuu: res.body});
      }
    });
  },

  render() {
    if (this.state.loading)
      return <p>Loading...</p>;
    if (!this.state.evakuu)
      return <p>An error has occurred! :(</p>;

    return <Dump evakuu={this.state.evakuu}/>;
  }
});

export default App;
