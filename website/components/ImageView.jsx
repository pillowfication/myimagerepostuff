const React = require('react');
const request = require('request');
const cheerio = require('cheerio');

function createImageThumb(site, image) {
  switch (site) {
    case 'danbooru':
      return (
        <a href={`https://danbooru.donmai.us${image.parent.attribs.href}`}>
          <img src={'https://danbooru.donmai.us' + image.attribs.src}/>
        </a>
      );
    case 'pixiv':
      return (
        <a href={`http://www.pixiv.net${image.parent.attribs.href}`}>
          <img src={image.attribs.src}/>
        </a>
      );
  }
}

const ImageView = React.createClass({
  propTypes: {
    site: React.PropTypes.string.isRequired,
    image: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      viewing: false,
      loading: false,
      error: null,
      imageUrl: undefined
    };
  },

  toggleView() {
    if (this.state.viewing) {
      this.setState({viewing: false});
    } else if (this.state.imageUrl) {
      this.setState({viewing: true});
    } else {
      request.get(
        `https://danbooru.donmai.us${this.props.image.parent.attribs.href}`,
        (err, res, body) => {
          if (err) {
            this.setState({
              loading: false,
              error: err
            });
          }

          const html = cheerio.load(body);
          const image = html('#image')[0];
          this.setState({
            loading: false,
            imageUrl: image.attribs.src
          });
        }
      );

      this.setState({
        viewing: true,
        loading: true,
        error: null
      });
    }
  },

  render() {
    return (
      <div style={{display: 'inline-block', padding: '4px'}}>
        {createImageThumb(this.props.site, this.props.image)}
        {false && this.state.viewing && (() => {
          // 403 Forbidden
          let image;
          if (this.state.loading) {
            image = <div>Loading</div>;
          } else if (this.state.error) {
            image = <div>Error...</div>;
          } else {
            image = <img src={`https://danbooru.donmai.us${this.state.imageUrl}`}/>;
          }

          return (
            <div style={{
              position: 'fixed',
              width: '100vh',
              height: '100vh',
              zIndex: '9001',
              backgroundColor: 'rgba(50,50,50,.5)'}}
            >
              {image}
            </div>
          );
        })()}
      </div>
    );
  }
});

module.exports = ImageView;
