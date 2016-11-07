const React = require('react');
const request = require('request');
const cheerio = require('cheerio');

const ImageView = require('./ImageView.jsx');

const TagPreview = React.createClass({
  propTypes: {
    tag: React.PropTypes.string.isRequired
  },
  getInitialState() {
    return {
      loading: true,
      error: null,
      images: undefined
    };
  },
  componentDidMount() {
    request.get(
      `https://danbooru.donmai.us/posts?tags=${this.props.tag}`,
      (err, res, body) => {
        if (err) {
          this.setState({
            loading: false,
            error: err
          });
        }

        const html = cheerio.load(body);
        const images = html('#posts article img');
        this.setState({
          loading: false,
          images: images
        });
      }
    );
  },
  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }
    if (this.state.error) {
      return <div>Some Error</div>;
    }

    return (
      <div>
        {(() => {
          const array = [];
          for (let i = 0; i < this.state.images.length; ++i)
            array.push(<ImageView key={i} image={this.state.images[i]}/>);
          return array;
        })()}
      </div>
    );
  }
});

module.exports = TagPreview;
