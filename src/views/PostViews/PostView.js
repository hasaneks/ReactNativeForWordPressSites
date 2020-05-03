import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Dimensions
} from 'react-native';

//Config 
import RBSheet from "react-native-raw-bottom-sheet"; // Bottom Modal
//Components
import ListImage from '../../components/ListImage';
import styles from './style';
import globalStyle from '../../Styles/globalStyle';
import CategoryName from '../../components/CategoryName';
//Store
import { observer, inject } from 'mobx-react';
//Packages
import color from '../../config/color';
import language from '../../config/language';

//Global Variable
const width = Dimensions.get('screen').width;

@inject('TextStore', 'PostDetailStore', 'PostListStore')
@observer
export default class PostView extends Component {

    state = {
        postData: [],
        sliderData: [],
        firstLoading: true,
        numColumns: 1,
        itemType: 1,
        page: 1,
        isLoading: false,
        dataStatus: true,
        testData: [],
    };

    componentDidMount() {
        this.props.PostListStore.getPostData(1, 'Home');
    };

    //#region Post Data Processes
    loadMoreData = () => {
        const { PostListStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                PostListStore.isFirstLoading = false;
                PostListStore.getPostData(this.state.page, 'Home')
            }
        })
        console.log("PostView - Load More : " + this.state.page);
    };
    //#endregion

    //#region  FlatList - Slider,Grid -  and Header Processes

    Slider = () => {
        const { PostListStore } = this.props;
        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.changeGridButton} onPress={() => this.RBSheet.open()}>
                        <Image style={styles.changeImage} source={require('../../img/icons/change-grid-icon.png')} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    renderItem={this.renderSliderData}
                    data={PostListStore.sliderData}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    pagingEnabled={true}
                    persistentScrollbar={true}
                />
            </View>
        )
    };

    renderSliderData = (item, index) => {
        const { TextStore } = this.props;
        return (
            <TouchableOpacity key={index} style={styles.sliderItemAreas} onPress={() => this.goToDetail(item)}>
                <ListImage style={styles.sliderImage} mediaId={item.item.featured_media} imageHeight={250} borderRadius={20} />
                <Image style={styles.imageCover} source={require('../../img/slider-cover.jpg')} />
                <View style={styles.sliderTextArea}>
                    <CategoryName key={this.state.postData.categoryId} categoryId={item.item.categories[0]} height={24} backgroundColor={color.sliderCategoryBackground} color={'#1D7BF6'} marginBottom={10} />
                    <Text numberOfLines={3} style={styles.sliderTitle}>{TextStore.clearText(item.item.title.rendered)}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    goToDetail = (data) => {
        const { PostDetailStore } = this.props;
        this.props.navigation.navigate('Details',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "HomeStack"
        );
    };

    renderPostData = (item, index) => {
        const { itemType } = this.state;
        const { TextStore } = this.props;

        if (itemType === 1) {
            return (
                <TouchableOpacity key={index} style={styles.listItemAreas} onPress={() => this.goToDetail(item)}>
                    <ListImage mediaId={item.item.featured_media} imageHeight={250} imageWidth={'100%'} />
                    <View style={styles.listTextArea}>
                        <Text style={styles.listTitle}>{TextStore.clearText(item.item.title.rendered)}</Text>
                        <Text style={styles.listDescription} numberOfLines={4}>{TextStore.clearText(item.item.excerpt.rendered)}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        else if (itemType === 2) {
            return (
                <TouchableOpacity key={index} style={styles.listItemAreas2} onPress={() => this.goToDetail(item)}>
                    <View>
                        <ListImage mediaId={item.item.featured_media} imageHeight={75} imageWidth={75} borderRadius={10} />
                    </View>
                    <View style={styles.listTextArea2}>
                        <CategoryName categoryId={item.item.categories[0]} height={20} marginBottom={10} backgroundColor={'#1D7BF6'} color={'#fff'} />
                        <Text style={styles.listTitle2} numberOfLines={2}>{TextStore.clearText(item.item.title.rendered)}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        else if (itemType === 3) {
            return (
                <TouchableOpacity key={index} style={styles.listItemAreas3} onPress={() => this.goToDetail(item)}>
                    <View style={styles.listTextArea3}>
                        <CategoryName categoryId={item.item.categories[0]} height={20} marginBottom={10} backgroundColor={'#1D7BF6'} color={'#fff'} />
                        <Text style={styles.listTitle3} numberOfLines={2}>{TextStore.clearText(item.item.title.rendered)}</Text>
                    </View>
                    <View>
                        <ListImage mediaId={item.item.featured_media} imageHeight={'100%'} imageWidth={100} />
                    </View>
                </TouchableOpacity>
            )
        }
        else if (itemType === 4) {
            return (
                <TouchableOpacity key={index} style={styles.listItemAreas4} onPress={() => this.goToDetail(item)}>
                    <ListImage mediaId={item.item.featured_media} imageHeight={150} imageWidth={'100%'} />
                    <View style={styles.listTextArea}>
                        <Text style={styles.listTitle4}>{TextStore.clearText(item.item.title.rendered)}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    //#endregion

    //#region  Design Functions

    //numColumns state update for FlatList grid design change
    changeGrid = (gridStlye, columnNumber) => {

        this.setState({
            numColumns: columnNumber,
            itemType: gridStlye,
        })
        this.RBSheet.close();
    };

    LoadingCircle = () => {
        if (this.props.PostListStore.isLoading)
            return null;
        return (
            <View style={{ padding: 25 }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    //#endregion
    render() {
        const { PostListStore } = this.props;
        return (
            <SafeAreaView style={globalStyle.container}>
                <FlatList
                    style={styles.postList}
                    renderItem={this.renderPostData}
                    data={PostListStore.postData}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this.LoadingCircle}
                    ListHeaderComponent={this.Slider}
                    numColumns={this.state.numColumns}
                    key={this.state.itemType}
                    onEndReached={this.loadMoreData}
                    onEndReachedThreshold={10}
                />
                {/* RBSheet bottom Modal component */}
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={200}
                    duration={350}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "flex-start",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        },
                    }}
                >
                    <View>
                        <Text style={styles.changeText}>{language.itemDesingChange}</Text>
                    </View>
                    <View style={styles.changeButtonArea}>
                        <TouchableOpacity style={styles.gridChangeButton} onPress={() => this.changeGrid(1, 1)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/card-list.png')} />
                            <Text stlye={styles.buttonText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridChangeButton} onPress={() => this.changeGrid(2, 1)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/left-card-list.png')} />
                            <Text stlye={styles.buttonText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridChangeButton} onPress={() => this.changeGrid(3, 1)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/right-card-list.png')} />
                            <Text stlye={styles.buttonText}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridChangeButton} onPress={() => this.changeGrid(4, 2)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/two-grid-columns.png')} />
                            <Text stlye={styles.buttonText}>4</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </SafeAreaView>
        );
    }

}

