import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';

//Config
import RBSheet from "react-native-raw-bottom-sheet"; // Bottom Modal
//Components
import ListImage from '../../components/ListImage';
import styles from './style';
import globalStyle from '../../Styles/globalStyle';
import CategoryName from '../../components/CategoryName';
import { Card, LeftImageCard, RightImageCard, TwoColumnGrid } from '../../components/index';
//Store
import { observer, inject } from 'mobx-react';
//Packages
import color from '../../config/color';
import language from '../../config/language';

@inject('TextStore', 'PostDetailStore', 'PostListStore')
@observer
export default class PostView extends Component {

    state = {
        postData: [],
        sliderData: [],
        firstLoading: true,
        numColumns: 1,
        cardType: 1,
        page: 1,
        isLoading: false,
        dataStatus: true,
        isRefreshing: false,
        adsNumber: 0,
    };

    componentDidMount() {
        this.props.PostListStore.getPostData(1, 'Home');
        this.LoadCardDesign();
    };

    LoadCardDesign = async () => {
        try {
            let cardDesign = await AsyncStorage.getItem('cardDesign');
            cardDesign = JSON.parse(cardDesign);

            this.setState({
                cardType: cardDesign.style,
                numColumns: cardDesign.column,
            })
        } catch (error) {
            console.log("PostView in loadCardDesign function error : " + error);
            //Default Card Design
        }
    };

    //numColumns state update for FlatList grid design change
    ChangeGrid = (gridStlye, columnNumber) => {

        this.setState({
            numColumns: columnNumber,
            cardType: gridStlye,
        })

        let cardDesign = {
            style: gridStlye,
            column: columnNumber,
        };

        AsyncStorage.setItem('cardDesign', JSON.stringify(cardDesign));
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

    onRefresh = () => {
        const { PostListStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                PostListStore.isFirstLoading = true;
                PostListStore.getPostData(this.state.page, 'Home', 'refresh')
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
        const { cardType } = this.state;

        if (cardType === 1) {
            return (
                <Card key={index} item={item} onPress={() => this.goToDetail(item)} />
            )
        }

        else if (cardType === 2) {
            return (
                <LeftImageCard key={index} item={item} onPress={() => this.goToDetail(item)} />
            )
        }

        else if (cardType === 3) {
            return (
                <RightImageCard key={index} item={item} onPress={() => this.goToDetail(item)} />
            )
        }
        else if (cardType === 4) {
            return (
                <TwoColumnGrid key={index} item={item} onPress={() => this.goToDetail(item)} />
            )
        }
    }
    //#endregion

    //#region  Design Functions
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
                    key={this.state.cardType}

                    onEndReached={this.loadMoreData}
                    onEndReachedThreshold={10}

                    refreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh}
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
                        <TouchableOpacity style={styles.gridChangeButton} onPress={() => this.ChangeGrid(1, 1)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/card-list.png')} />
                            <Text stlye={styles.buttonText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridChangeButton} onPress={() => this.ChangeGrid(2, 1)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/left-card-list.png')} />
                            <Text stlye={styles.buttonText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridChangeButton} onPress={() => this.ChangeGrid(3, 1)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/right-card-list.png')} />
                            <Text stlye={styles.buttonText}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridChangeButton} onPress={() => this.ChangeGrid(4, 2)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/two-grid-columns.png')} />
                            <Text stlye={styles.buttonText}>4</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </SafeAreaView>
        );
    }

}

