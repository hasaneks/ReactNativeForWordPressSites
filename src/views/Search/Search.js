import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Image, Dimensions } from 'react-native'
//Components
import ListImage from '../../components/ListImage'
import CategoryName from '../../components/CategoryName'
//Mobx
import { observer, inject } from 'mobx-react'
import { action } from 'mobx'
//Color Package
import color from '../../config/color'
//Language Package
import language from '../../config/language'

@inject('SearchStore', 'TextStore', 'CategoryStore', 'PostDetailStore')
@observer
export class Search extends Component {

    state = {
        searchValue: [],
        isFocus: false,
        firstLoading: true,
    };

    @action
    searchTextChange = (searchText) => {
        const { SearchStore } = this.props;
        SearchStore.isLoading = false;

        if (this.searchWaiting)
            clearTimeout(this.searchWaiting);
        this.searchWaiting = setTimeout(() => {
            this.searchWaiting = null;
            SearchStore.getSearchData(searchText);
        }, 2000);
    };
    //Search Text Input onFocus
    onFocus() {
        this.setState({
            isFocus: true,
        })
    };
    //Search Text Input onBlur
    onBlur() {
        this.setState({
            isFocus: false,
        })
    };

    goToDetail = (data) => {
        const { PostDetailStore } = this.props;
        this.props.navigation.navigate('Search Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "SearchStack"
        );
    };

    renderSearchItem = (item, index) => {
        const { TextStore } = this.props;
        return (
            <TouchableOpacity key={index} style={styles.searchItem} onPress={() => this.goToDetail(item)}>
                <View>
                    <ListImage mediaId={item.item.featured_media} imageHeight={75} imageWidth={75} borderRadius={10} />
                </View>
                <View style={styles.listTextArea}>
                    <CategoryName categoryId={item.item.categories[0]} height={20} marginBottom={10} backgroundColor={color.searchCategoryBackground} color={color.searchCategoryTextColor} />
                    <Text style={styles.listTitle} numberOfLines={2}>{TextStore.clearText(item.item.title.rendered)}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    searchComponent = () => {
        const { SearchStore } = this.props;

        return (
            <View style={styles.searchView}>
                <TextInput onBlur={() => this.onBlur()} onFocus={() => this.onFocus()} style={[this.state.isFocus ? styles.searchInputFocus : styles.searchInput]} placeholder={language.searchBar} onChangeText={searchValue => this.searchTextChange(searchValue)} value={this.state.searchValue}
                />
                <ActivityIndicator style={[styles.searchActivityIndicator, SearchStore.isLoading ? { opacity: 0 } : { opacity: 1 }]} size={"small"} />
            </View>
        )
    };

    searchResultList = () => {
        const { SearchStore } = this.props;

        return (
            <FlatList
                style={styles.searchList}
                data={SearchStore.searchData}
                renderItem={this.renderSearchItem}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    };

    notResultImage = () => {
        return (
            <View style={styles.noResultImageArea}>
                <Image style={styles.noResultImage} source={require('./../../img/no-result.png')} />
            </View>
        )
    }

    render() {
        const { SearchStore } = this.props;

        if (SearchStore.noResultImageVisible === true)
            return (
                <SafeAreaView style={styles.container}>
                    {this.searchComponent()}
                    {this.notResultImage()}
                </SafeAreaView>
            )

        return (
            <SafeAreaView style={styles.container}>
                {this.searchComponent()}
                {this.searchResultList()}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchView: {
        height: 100,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    searchInput: {
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 15,
        borderRadius: 25,
    },
    searchInputFocus: {
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 15,
        borderRadius: 0,
        fontWeight: 'bold',
    },
    searchList: {
        paddingHorizontal: 10,
    },
    searchItem: {
        marginVertical: 15,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    listTextArea: {
        flex: 1,
        paddingHorizontal: 10,
        marginHorizontal: 5,
    },
    listTitle: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 25,
    },
    searchActivityIndicator: {
        position: 'absolute',
        right: 30,
        top: 40,
    },
    noResultImageArea: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noResultImage: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
    }
})

export default Search
