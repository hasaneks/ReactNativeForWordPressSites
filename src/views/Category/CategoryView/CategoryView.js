import React, { Component } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../../components/index'



@inject('CategoryStore', 'PostDetailStore')
@observer
export class CategoryView extends Component {

    renderCategoryItem = (item, index) => {
        return (
            <Card key={index} item={item} onPress={() => this.goToDetail(item)} />
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
            <SafeAreaView>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={CategoryStore.categoryPosts}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        )
    }
}

export default CategoryView
