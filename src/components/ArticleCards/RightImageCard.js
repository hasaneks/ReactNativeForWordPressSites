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
        const { TextStore, item, key, onPress } = this.props;
        return (
            <TouchableOpacity key={key} style={styles.listItemAreas} onPress={onPress}>
                <View style={styles.listTextArea}>
                    <CategoryName categoryId={item.item.categories[0]} height={20} marginBottom={10} backgroundColor={'#1D7BF6'} color={'#fff'} />
                    <Text style={styles.listTitle} numberOfLines={2}>{TextStore.clearText(item.item.title.rendered)}</Text>
                </View>
                <View>
                    <ListImage mediaId={item.item.featured_media} imageHeight={'100%'} imageWidth={100} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    listItemAreas: {
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: "hidden"
    },
    listTextArea: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        marginHorizontal: 5,
        flex: 1,
    },
    listTitle: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 25,
    },
})

