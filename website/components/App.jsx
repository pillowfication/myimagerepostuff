const React = require('react');

const TagTable = require('./TagTable.jsx');

const App = React.createClass({
  render() {
    return (
      <div style={{width: '100%', maxWidth: '100%'}}>
        <TagTable/>
      </div>
    );
  }
});

module.exports = App;
