import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Image, Alert, Linking, FlatList, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import { } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import language from '../config/language'

@inject('CommentStore')
@observer
export default class Comments extends Component {

    state = {
        authorName: '',
        authorMail: '',
        comment: '',
        clientIp: '',
    }


    componentDidMount() {
        const { CommentStore } = this.props;
        CommentStore.getComments(this.props.articleId);
    }

    ClickUrl = (item) =>
        Alert.alert(
            language.detailAlertTitle,
            language.detailAlert,
            [
                {
                    text: language.detailAlertNo,
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: language.detailAlertYesText, onPress: () => Linking.openURL(item) }
            ],
            { cancelable: false }
        );

    OpenBrowserForComments = () =>
        Alert.alert(
            language.sendCommenAlertTitle,
            language.sendCommentAlert,
            [
                {
                    text: language.sendCommentAlertNo,
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: language.sendCommentAlertYes, onPress: () => Linking.openURL(this.props.articleUrl) }
            ],
            { cancelable: false }
        );

    renderComment = (item, index) => {
        return (
            <View key={index} style={styles.itemArea}>
                <View style={styles.atuhorArea}>
                    <Image style={styles.authorAvatar} source={{ uri: item.item.author_avatar_urls[48] }} />
                    <Text style={styles.authorName}>{item.item.author_name}</Text>
                </View>
                <HTML html={item.item.content.rendered} tagsStyles={styles} imagesMaxWidth={Dimensions.get('screen').width} textSelectable={true} onLinkPress={(event, href) => this.ClickUrl(href)} baseFontStyle={{ fontSize: 15, lineHeight: 22, color: '#404040' }} />
            </View>
        )
    }

    sendCommentButton = () => {
        return (
            <View>
                <TouchableOpacity style={styles.buttonArea} onPress={() => this.OpenBrowserForComments()}>
                    <Text style={styles.buttonText}>{language.sendCommentButton}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    commentList = () => {
        const { CommentStore } = this.props;
        return (
            <View>
                <FlatList
                    data={CommentStore.comments}
                    renderItem={this.renderComment}
                    keyExtractor={(item, index) => index.toString}
                    style={styles.commentList}
                />
            </View>
        )
    }

    render() {
        const { CommentStore } = this.props;

        if (Object.keys(CommentStore.comments).length != 0) {
            return (
                <View style={styles.wrapper} >
                    {this.sendCommentButton()}
                    {this.commentList()}
                </View>
            )
        }
        return (
            <View style={styles.wrapper}>
                {this.sendCommentButton()}
                <View style={styles.noResultImageArea}>
                    <Image style={styles.noResultImage} source={require('../img/no-comments.png')} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingBottom: 10,
    },
    commentList: {
        marginBottom: 75,
        flex: 1,
    },
    itemArea: {
        marginBottom: 10,
    },
    atuhorArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    authorAvatar: {
        height: 32,
        width: 32,
        borderRadius: 50,
        marginRight: 10,
    },
    authorName: {
        fontSize: 18,
    },
    p: {
        marginBottom: 5,
    },
    buttonArea: {
        width: '100%',
        minWidth: '100%',
        height: 50,
        backgroundColor: '#1D7BF6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        alignSelf: 'center',
        marginBottom: 20,

    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
    },
    noResultImageArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noResultImage: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
    }

})