import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx Store
import { observer } from 'mobx-react';
import CategoryStore from '../../../store/CategoryStore';
//Color Package
import color from '../../../config/color';

@observer
export default class CategoryList extends Component {

    state = {
        categoryPage: 1,
    }

    componentDidMount() {
        CategoryStore.getCategoryList(this.state.categoryPage);
    };

    renderCategoryItem = (item, index) => {
        return (
            <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => this.goToCategoryList(item)}>
                <Text style={styles.categoryName} numberOfLines={2}>{item.item.name}</Text>
                <Text style={styles.categoryDescription}>{item.item.count} Posts</Text>
            </TouchableOpacity>
        )
    }

    getMoreCategory = () => {
        console.log("getMoreCategory");
        this.setState({
            categoryPage: this.state.categoryPage + 1,
        },
            () => {
                CategoryStore.getCategoryList(this.state.categoryPage);
            }
        );
    }

    loadingCircle = () => {
        if (CategoryStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }

    goToCategoryList = (item) => {
        this.props.navigation.navigate('Category View',
            CategoryStore.getCategoryPosts(item.item.id)
        );
    }

    render() {
        return (
            <View>
                <FlatList
                    style={styles.categoryList}
                    renderItem={this.renderCategoryItem}
                    data={CategoryStore.moreCategoryList}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this.loadingCircle}
                    numColumns={2}
                    onEndReached={this.getMoreCategory}
                    onEndReachedThreshold={10}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    categoryList: {
        padding: 5,
    },
    categoryItem: {
        flex: 1,
        width: '50%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 125,
        backgroundColor: color.categoryBoxBackground,
        marginHorizontal: 10,
        marginVertical: 15,
        borderRadius: 10,
    },
    categoryName: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        lineHeight: 25,
        color: color.categoryBoxTextColor,
    },
    categoryDescription: {
        color: color.categoryBoxTextColor,
    }
})