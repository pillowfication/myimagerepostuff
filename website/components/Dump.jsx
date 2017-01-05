import React, {PropTypes} from 'react';
import classnames from 'classnames';

function favorite(tag) {
  return tag.favorite && <div className="heart"/>;
}

function searchtag(tag) {
  switch (tag.repository) {
    case 'danbooru':
      return (
        <a href={`https://danbooru.donmai.us/posts?tags=${tag.searchtag}`} target="_blank">
          {tag.searchtag}
        </a>
      );
    case 'konachan':
      return (
        <a href={`http://konachan.com/post?tags=${tag.searchtag}`} target="_blank">
          {tag.searchtag}
        </a>
      );
    case 'sankakucomplex':
      return (
        <a href={`https://chan.sankakucomplex.com/post/index?tags=${tag.searchtag}`} target="_blank">
          {tag.searchtag}
        </a>
      );
    case 'yande.re':
      return (
        <a href={`https://yande.re/post?tags=${tag.searchtag}`} target="_blank">
          {tag.searchtag}
        </a>
      );
    default:
      console.log(`Unknown repository '${tag.repository}'`);
      console.log(tag);
      return <a>{tag.searchtag}</a>;
  }
}

function repository(tag) {
  return tag.repository;
}

function category(tag) {
  return tag.category;
}

function misc(tag) {
  return tag.misc && tag.misc.join(', ');
}

const Dump = React.createClass({
  propTypes: {
    evakuu: PropTypes.object.isRequired
  },

  getInitialState() {
    const repositories = {};
    const categories = {};
    for (const tag of this.props.evakuu.tags) {
      tag.repository && (repositories[tag.repository] = true);
      tag.category && (categories[tag.category] = true);
    }

    return {
      repositories: Object.keys(repositories).sort(),
      categories: Object.keys(categories).sort(),

      searchString: '',
      searchFavoritesOnly: false,
      searchRepositories: repositories,
      searchCategories: categories
    }
  },

  onSearchString(event) {
    this.setState({searchString: event.target.value});
  },

  filter(tag) {
    const pass = true || (
      (this.state.searchFavoritesOnly ? tag.favorite : true) &&
      this.state.searchRepositories[tag.repository] &&
      this.state.searchCategories[tag.category]
    );
    if (!pass)
      return false;

    const searchString = this.state.searchString;
    if (!searchString)
      return true;
    if (tag.searchtag.indexOf(searchString) !== -1)
      return true;
    for (const misc of tag.misc || [])
      if (misc.indexOf(searchString) !== -1)
        return true;

    return false;
  },

  render() {
    return (
      <div>
        <div>
          <div>
            <input type="text" placeholder="Search" value={this.state.searchString} onChange={this.onSearchString}/>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th><div className="heart"/></th>
              <th>searchtag</th>
              <th>repository</th>
              <th>category</th>
              <th>misc</th>
            </tr>
          </thead>
          <tbody>
            {this.props.evakuu.tags.map((tag, index) =>
              <tr key={index} className={classnames({hide: !this.filter(tag)})}>
                <td>{favorite(tag)}</td>
                <td>{searchtag(tag)}</td>
                <td>{repository(tag)}</td>
                <td>{category(tag)}</td>
                <td>{misc(tag)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
});

export default Dump;
