const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const evakuu = require('../../evakuu.json');

const TagPreview = require('./TagPreview.jsx');
const Table = ReactBootstrap.Table;

const TagTable = React.createClass({
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
      </tr>,
      <tr key={`${index}-preview`}>
        <td colSpan="4">
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
