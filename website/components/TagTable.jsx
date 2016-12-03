const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const evakuu = require('../../evakuu.json');

const TagPreview = require('./TagPreview.jsx');
const Table = ReactBootstrap.Table;
const Button = ReactBootstrap.Button;

function createTagAnchor(site, searchtag) {
  switch (site) {
    case 'danbooru':
      return <a target="_blank" href={`https://danbooru.donmai.us/posts?tags=${searchtag}`}>{searchtag}</a>;
    case 'pixiv':
      return <a target="_blank" href={`http://www.pixiv.net/member.php?id=${searchtag}`}>{searchtag}</a>;
    case 'sankakucomplex':
      return <a target="_blank" href={`https://chan.sankakucomplex.com/post/index?tags=${searchtag}`}>{searchtag}</a>;
    default:
      return searchtag;
  }
}

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
    const searchtag = row.searchtag;
    const repository = row.repository || '<<No Repository>>';
    const category = row.category || '<<No Category>>';
    const misc = row.misc && row.misc.join(', ');
    return [
      <tr key={`${index}-info`}>
        <td>{createTagAnchor(repository, searchtag)}</td>
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
          <TagPreview site={repository} tag={row.searchtag}/>
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
