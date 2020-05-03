import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
//
import axios from 'axios';
//
import config from '../config/index';
class ListImage extends Component {
  state = {
    imageUrl: '',
  };
  componentDidMount() {
    this.getData();

  }
  async getData() {

    try {
      const response = await axios.get(
        config.url + `wp-json/wp/v2/media/${this.props.mediaId}`,
      );
      this.setState({ imageUrl: response.data.media_details.sizes.full.source_url });
    } catch (error) {
      console.log("Components : ListImage - Function : getData - Error : " + error);
    }
  }

  render() {
    return (
      <View onPress={this.props.onItemPressed} style={styles.imageView}>
        <Image
          style={styles.image,{height:this.props.imageHeight, width:this.props.imageWidth, borderRadius:this.props.borderRadius}}
          source={this.state.imageUrl ? { uri: this.state.imageUrl } : require('../img/slider-cover.jpg')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageView:{
    flex:1,
    backgroundColor:'transparent',
  },
  image: {
    height: 250,
    width:'100%'
  },
});

export default ListImage;
