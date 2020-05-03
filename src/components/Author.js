import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
//Axios
import axios from 'axios';
//Config
import config from '../config/index';

export default class Author extends Component {

    state = {
        authorName: '',
        authorImageUrl: '',
    }

    componentDidMount() {
        this.getAuthorInformation(this.props.authorId);
    }

    getAuthorInformation = async (authorId) => {

        try {
            const { data } = await axios.get(config.url + `/wp-json/wp/v2/users/${authorId}`);
            this.setState({
                authorName: data.name,
                authorImageUrl: data.avatar_urls[48], //48x48 image URL
            })
        } catch (error) {
            console.log("Error in getAuthorInformation inside Author component: : " + error);
        }
    };

    render() {
        return (
            <View style={[styles.authorView, {marginRight:this.props.marginRight}, {backgroundColor:this.props.backgroundColor}]}>
                <Image style={styles.authorAvatar} source={{ uri: this.state.authorImageUrl }} />
                <Text style={[styles.authorName, {color:this.props.color}]} >{this.state.authorName} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    authorView: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#1D7BF6',
        borderRadius: 15,
        paddingRight: 10,
    },
    authorAvatar: {
        height: 32,
        width: 32,
        borderRadius: 50,
        marginRight: 10,
        borderWidth:2,
        borderColor:'#fff',
        marginLeft:-1, 

    },
    authorName: {
        color: '#fff',
        fontWeight:'600',
    }
    
});

