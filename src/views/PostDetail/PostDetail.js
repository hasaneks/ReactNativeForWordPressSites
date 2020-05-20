import React, { Component } from 'react'
import { Text, View, Image, Dimensions, Linking, Alert, SafeAreaView } from 'react-native'
//Components
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './style';
import config from '../../config/index';
import { ArticleAdviceList, CategoryName, Author, Comments } from '../../components/index'
//Third Party Libraries 
import axios from 'axios';
import HTML from 'react-native-render-html';
//Store
import { observer, inject } from 'mobx-react';
//Color Package
import color from '../../config/color';
import language from '../../config/language';
//Library
import RBSheet from "react-native-raw-bottom-sheet"; // Bottom Modal


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
            description: data.item.content.rendered,
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

    goToCategory = () => {
        const { PostDetailStore } = this.props;

        if (PostDetailStore.routeName === 'CategoryStack')
            this.props.navigation.navigate('Category View')
        else
            this.props.navigation.navigate('Category', { screen: 'Category View' });
    }

    bottomSheet = () => {
        return (
            <View>
                {/* RBSheet bottom Modal component */}
                < RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }
                    }
                    height={500}
                    duration={350}
                    closeOnDragDown={false}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "flex-start",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 20,
                        },
                    }}
                >
                    <Comments articleId={this.state.postData.id} articleUrl={this.state.postData.link} />

                </ RBSheet >
            </View>
        )
    };

    clickUrl = (item) =>
        Alert.alert(
            language.detailAlertTitle,
            language.detailAlert,
            [
                {
                    text: language.detailAlertNo,
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: language.detailAlertYes, onPress: () => Linking.openURL(item) }
            ],
            { cancelable: false }
        );



    render() {
        return (
            <ScrollView key={this.state.postData.title}>
                <Image style={styles.thumbnail} source={this.state.imageUrl ? { uri: this.state.imageUrl } : require('../../img/slider-cover.jpg')}
                />

                <View style={styles.textArea}>
                    <Text style={styles.title}>{this.state.postData.title} </Text>
                    <HTML html={this.state.postData.description} tagsStyles={styles} imagesMaxWidth={Dimensions.get('screen').width} textSelectable={true} onLinkPress={(event, href) => this.clickUrl(href)} baseFontStyle={{ fontSize: 20, lineHeight: 35 }} />
                    <View style={styles.postInformation}>
                        <Author key={this.state.postData.authorId} authorId={this.state.postData.authorId} marginRight={15} backgroundColor={color.detailAuthorBackground} color={color.detailAuthorTextColor} />
                        <TouchableOpacity onPress={this.goToCategory}>
                            <CategoryName key={this.state.postData.categoryId} categoryId={this.state.postData.categoryId} height={32} backgroundColor={color.detailCategoryBackground} color={color.detailCategoryTextColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.commentsArea, { backgroundColor: color.detailCommentBackground }]} onPress={() => this.RBSheet.open()}>
                            <Text style={[styles.commentsText, { color: color.detailCommentTextColor }]}>{language.detailComments}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={this.reload}>
                    <ArticleAdviceList postId={this.state.postData.id} />
                </TouchableOpacity>

                {this.bottomSheet()}
            </ScrollView>

        )
    }
}
