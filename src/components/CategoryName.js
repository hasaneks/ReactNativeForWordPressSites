import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios';
import config from './../config/index';
import { observer, inject } from 'mobx-react';

@inject('CategoryStore')
@observer
export default class CategoryName extends Component {

    state = {
        categoryName: "",
    }

    componentDidMount() {
        this.getCategoryName(this.props.categoryId);
    }

    getCategoryName = async (categoryId) => {
        console.log("getCategoryName" + categoryId);
        try {
            const { data } = await axios.get(config.url + `/wp-json/wp/v2/categories/${categoryId}`);
            this.setState({
                categoryName: data.name,
            })
        } catch (error) {
            console.log("getCategoryName Error Message : " + error);
        }
    }

    changeData = () => {
        const {CategoryStore} = this.props;
        CategoryStore.getCategoryPosts(this.props.categoryId);
    }

    render() {
        return (
            <TouchableOpacity style={[styles.categoryArea, { height: this.props.height, marginBottom: this.props.marginBottom, backgroundColor: this.props.backgroundColor }]} onPress={this.changeData}>
                <Text style={[styles.listCategory, { color: this.props.color }]}> {this.state.categoryName} </Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    categoryArea: {
        backgroundColor: '#1D7BF6',
        paddingHorizontal: 10,
        height: 32,
        justifyContent: 'center',
        borderRadius: 15,
        alignSelf: 'flex-start',

    },
    listCategory: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
    }
})