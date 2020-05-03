import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
//Components
import styles from './style';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import config from '../../config/index';
import ArticleAdviceList from '../../components/ArticleAdviceList';
import CategoryName from '../../components/CategoryName';
import Author from '../../components/Author';
//Third Party Libraries 
import axios from 'axios';
//Store
import { observer, inject } from 'mobx-react';
//Color Package
import color from '../../config/color';

@inject('TextStore', 'PostDetailStore')
@observer
export default class PostDetail extends Component {

    state = {
        postData: [],
        imageUrl: '',
        change: 1,
        stackName: '',
    };

    componentDidMount() {
        this.getPostMapping();
        const { PostDetailStore } = this.props;
        this.setState({
            stackName: PostDetailStore.routeName,
        })
    };

    getPostMapping = () => {
        const { PostDetailStore, TextStore } = this.props;
        console.log("getPostMapping");
        const data = PostDetailStore.postDetail;
        let postMapper = {
            id: data.item.id,
            title: TextStore.clearText(data.item.title.rendered),
            description: TextStore.clearText(data.item.content.rendered),
            mediaId: data.item.featured_media,
            link: data.item.link,
            pubDate: data.item.date,
            categoryId: data.item.categories[0],
            authorId: data.item.author,
        };
        this.setState({
            postData: postMapper
        });
        this.getThumbnailUrl(postMapper.mediaId);
    };

    getThumbnailUrl = async (id) => {
        try {
            const response = await axios.get(
                config.url + `wp-json/wp/v2/media/${id}`,
            );
            this.setState({ imageUrl: response.data.media_details.sizes.full.source_url });
            console.log(this.state.imageUrl);
        } catch (error) {
            console.log("Views : PostDetail - Function : getThumbnailUrl  - Error : " + error);
        }
    };

    reload = () => {
        const { PostDetailStore } = this.props;
        if (PostDetailStore.routeName === 'HomeStack') {
            this.props.navigation.push('Details')
        }
        else if (PostDetailStore.routeName === 'CategoryStack') {
            this.props.navigation.push('Category Detail')
        }
        else if (PostDetailStore.routeName === 'SearchStack')
            this.props.navigation.push('Search Detail')
        else {
            alert(this.state.stackName);
        }
    };

    render() {
        return (
            <ScrollView key={this.state.change}>
                <Image style={styles.thumbnail} source={this.state.imageUrl ? { uri: this.state.imageUrl } : require('../../img/slider-cover.jpg')}
                />
                
                <View style={styles.textArea}>
                    <Text style={styles.title}>{this.state.postData.title} </Text>
                    <View style={styles.postInformation}>
                        <Author key={this.state.postData.authorId} authorId={this.state.postData.authorId} marginRight={15} backgroundColor={color.detailAuthorBackground} color={color.detailAuthorTextColor} />
                        <CategoryName key={this.state.postData.categoryId} categoryId={this.state.postData.categoryId} height={32} backgroundColor={color.detailCategoryBackground} color={color.detailCategoryTextColor} />
                    </View>
                    <Text style={styles.content}>{this.state.postData.description} </Text>
                </View>

                <TouchableOpacity activeOpacity={1} onPress={this.reload}>
                    <ArticleAdviceList postId={this.state.postData.id} />
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
