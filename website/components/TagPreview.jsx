const React = require('react');
const request = require('request');
const cheerio = require('cheerio');

const HEIGHT = '150px';

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
        console.log(images)
        this.setState({
          loading: false,
          images: images
        });
      }
    );
  },
  render() {
    if (this.state.loading) {
      return <div style={{height: HEIGHT}}>loading...</div>;
    }
    if (this.state.error) {
      return <div style={{height: HEIGHT}}>Some Error</div>;
    }

    return (
      <div style={{height: HEIGHT}}>
        {(() => {
          const array = [];
          for (let i = 0; i < this.state.images.length && i < 5; ++i) {
            array.push(
              <img src={'https://danbooru.donmai.us' + this.state.images[i].attribs.src}/>
            );
          }
          return array;
        })()}
      </div>
    );
  }
});

module.exports = TagPreview;
