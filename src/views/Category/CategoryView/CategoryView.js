import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import ListImage from '../../../components/ListImage';


@inject('CategoryStore', 'TextStore', 'PostDetailStore')
@observer
export class CategoryView extends Component {

    renderCategoryItem = (item, index) => {
        const { TextStore } = this.props;
        return (
            <TouchableOpacity key={index} style={styles.listItemAreas} onPress={() => this.goToDetail(item)}>
                <ListImage mediaId={item.item.featured_media} imageHeight={250} imageWidth={'100%'} />
                <View style={styles.listTextArea}>
                    <Text style={styles.listTitle}>{TextStore.clearText(item.item.title.rendered)}</Text>
                    <Text style={styles.listDescription} numberOfLines={4}>{TextStore.clearText(item.item.excerpt.rendered)}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    goToDetail = (data) => {
        const { PostDetailStore } = this.props;
        console.log("PostView : goToDetail");
        this.props.navigation.push('Category Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "CategoryStack"
        );
    };

    render() {
        const { CategoryStore } = this.props;

        return (
            <View>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={CategoryStore.categoryPosts}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listItemAreas: {
        margin: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        flex: 1,
    },
    listTextArea: {
        padding: 15,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
})

export default CategoryView
