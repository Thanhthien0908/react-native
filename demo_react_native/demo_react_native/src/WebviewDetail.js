import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

export default class MyWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: true};
  }

  hideSpinner() {
    this.setState({visible: false});
  }

  render() {
    const {route} = this.props;

    return (
      <View style={{flex: 1}}>
        <WebView
          onLoad={() => this.hideSpinner()}
          style={{flex: 1}}
          source={{uri: route.params.url}}
        />
        {this.state.visible && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            size="large"
          />
        )}
      </View>
    );
  }
}
