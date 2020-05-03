import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
//Default Config
import config from '../config/index';
//Thirdy Parties Library
import axios from 'axios'; // HTTP Request library
//Components
import ListImage from '../components/ListImage';
import { TouchableOpacity } from 'react-native-gesture-handler';
//Store
import { observer, inject } from 'mobx-react';
import PostDetailStore from '../store/PostDetailStore';
//Language Package
import language from '../config/language';

@inject('TextStore')
@observer
export default class ArticleAdviceList extends Component {

    state = {
        data: [],
        loading: false,
    };

    componentDidMount() {
        setTimeout(
            () => {
                console.log("ArticleAdviceList Yüklendi");
                let postId = this.props.postId;
                console.log("Post ID : " + this.props.postId)
                this.getPostList(postId);
            },
            100
        )
    };

    getPostList = async () => {

        try {
            const { data } = await axios.get(config.url + `wp-json/wp/v2/posts?offset=3&exclude=${this.props.postId}`);
            this.setState({
                data,
                loading: true,
            });
        } catch (error) {
            console.log("Article Advice List in getPostList Function Error : " + error)
        }
        console.log("Data Yüklendi : " + data)
    };

    refreshData = (data) => {
        PostDetailStore.changePostDetail(data);
    };

    renderItem = (item, index) => {
        const {TextStore} = this.props;
        return (
            <TouchableOpacity style={styles.itemArea} onPress={() => this.refreshData(item)}>
                <ListImage mediaId={item.item.featured_media} width={'100%'} imageHeight={175} />
                <View style={styles.textArea}>
                    <Text style={styles.itemTitle} numberOfLines={2}>{TextStore.clearText(item.item.title.rendered)}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.viewTitle}>{language.articleAdvice}</Text>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    key={this.props.postId}

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemArea: {
        width: 275,
        height: 250,
        marginHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    textArea: {
        padding: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 15,
        margin: 10,
        marginBottom: 20,
        borderLeftWidth: 2,
        borderLeftColor: '#000'
    }
})