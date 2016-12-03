const React = require('react');
const imageGrabbing = require('./imageGrabbing');
const ImageView = require('./ImageView.jsx');

const TagPreview = React.createClass({
  propTypes: {
    site: React.PropTypes.string.isRequired,
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
    imageGrabbing[this.props.site](this.props.tag, (err, images) => {
      if (err)
        this.setState({
          loading: false,
          error: err
        });

      this.setState({
        loading: false,
        images: images
      });
    });
  },

  render() {
    if (this.state.loading)
      return <div>Loading...</div>;
    if (this.state.error)
      return <div>Some Error... Feel free to yell at Pillow</div>;

    const array = [];
    for (let i = 0; i < this.state.images.length; ++i)
      array.push(<ImageView key={i} {...this.props} image={this.state.images[i]}/>);

    return <div>{array}</div>;
  }
});

module.exports = TagPreview;
