const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const evakuu = require('../../evakuu.json');

const TagPreview = require('./TagPreview.jsx');
const Table = ReactBootstrap.Table;
const Button = ReactBootstrap.Button;

const TagTable = React.createClass({
  getInitialState() {
    return {
      showPreview: {}
    };
  },
  togglePreview(index) {
    this.state.showPreview[index] = !this.state.showPreview[index];
    this.setState(this.state);
  },
  mapRow(row, index) {
    const searchtag = row.repository === 'danbooru' ?
      <a href={`https://danbooru.donmai.us/posts?tags=${row.searchtag}`}>{row.searchtag}</a> :
      row.searchtag;
    const repository = row.repository;
    const category = row.category;
    const misc = row.misc && row.misc.join(', ');
    return [
      <tr key={`${index}-info`}>
        <td>{searchtag}</td>
        <td>{repository}</td>
        <td>{category}</td>
        <td>{misc}</td>
        <td>
          <Button onClick={this.togglePreview.bind(this, index)}>
            {this.state.showPreview[index] ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </td>
      </tr>,
      this.state.showPreview[index] && <tr key={`${index}-preview`}>
        <td colSpan="5">
          <TagPreview tag={row.searchtag}/>
        </td>
      </tr>
    ];
  },
  render() {
    return (
      <Table condensed>
        <thead>
          <tr>
            <th>searchtag</th>
            <th>repository</th>
            <th>category</th>
            <th>misc</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {evakuu.map(this.mapRow)}
        </tbody>
      </Table>
    );
  }
});

module.exports = TagTable;
