import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';

export default class Home extends Component {
  keySearch = '';

  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
    };
  }

  itemNewFeed = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Detail Article', {url: item.url});
        }}>
        <View
          style={{
            flex: 1,
            borderRadius: 5,
            marginTop: 5,
            marginStart: 5,
            marginEnd: 5,
            elevation: 5,
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
          }}>
          <Image source={{uri: item.urlToImage}} style={{flex: 1}} />
          <View style={{margin: 10, flex: 3}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontWeight: 'bold',
                color: '#0000FF',
                fontSize: 20,
                margin: 5,
              }}>
              {item.title}
            </Text>
            <Text numberOfLines={2} ellipsizeMode="tail">
              {item.description}
            </Text>
            <Text style={{marginTop: 5}}>{item.publishedAt}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount() {}

  searchArticles = (keySearch) => {
    this.setState({isLoading: true});
    const url =
      'https://newsapi.org/v2/everything?q=' +
      keySearch +
      '&language=vi&apiKey=b374178d69a6431e963a31a56c8e20db';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({data: json.articles});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  render() {
    const {data, isLoading} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <TextInput
              style={{
                padding: 5,
                flex: 1,
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 5,
              }}
              underlineColorAndroid="transparent"
              placeholder="Enter the keywords you want to search..."
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={(text) => {
                this.keySearch = text;
              }}
            />
            <Button
              title={'Search'}
              onPress={() => {
                this.searchArticles(this.keySearch);
              }}
            />
          </View>
          {isLoading ? (
            <ActivityIndicator style={{flex: 1}} />
          ) : (
            <FlatList
              contentContainerStyle={{flexGrow: 1}}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textColor: '#000000',
                      }}>
                      No data for articles
                    </Text>
                  </View>
                );
              }}
              style={{backgroundColor: '#f1f1f1'}}
              data={data}
              keyExtractor={({id}) => id}
              renderItem={({item}) => this.itemNewFeed(item)}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
