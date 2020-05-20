import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import ListImage from '../ListImage'
import CategoryName from '../CategoryName'
import { observer, inject } from 'mobx-react';


@inject('TextStore')
@observer
export default class LeftImageCard extends Component {

    state = {
        articleItem: [],
    };

    componentDidMount() {
        this.setState({
            articleItem: this.props.item,
        })
    }

    render() {
        const { TextStore, item, onPress, key } = this.props;
        return (
            <TouchableOpacity key={key} style={styles.listItemAreas} onPress={onPress}>
                <View>
                    <ListImage mediaId={item.item.featured_media} imageHeight={75} imageWidth={75} borderRadius={10} />
                </View>
                <View style={styles.listTextArea}>
                    <CategoryName categoryId={item.item.categories[0]} height={20} marginBottom={10} backgroundColor={'#1D7BF6'} color={'#fff'} />
                    <Text style={styles.listTitle} numberOfLines={2}>{TextStore.clearText(item.item.title.rendered)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    listItemAreas: {
        margin: 15,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    listTextArea: {
        paddingHorizontal: 10,
        marginHorizontal: 5,
        flex: 1,
    },
    listTitle: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 25,
    },
})

