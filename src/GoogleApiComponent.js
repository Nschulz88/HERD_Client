const Container = React.createClass({
  render: function() {
    return <div>Google</div>;
  }
})
export default GoogleApiComponent({
  apiKey: __GAPI_KEY__
})(Container)
