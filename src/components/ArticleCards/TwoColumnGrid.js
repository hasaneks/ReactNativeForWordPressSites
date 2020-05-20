import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import ListImage from '../ListImage'
import { observer, inject } from 'mobx-react';

var number = 0;

@inject('TextStore')
@observer
export default class TwoColumnGrid extends Component {

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
                <ListImage mediaId={item.item.featured_media} imageHeight={150} imageWidth={'100%'} />
                <View style={styles.listTextArea}>
                    <Text style={styles.listTitle}>{TextStore.clearText(item.item.title.rendered)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    listItemAreas: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column'
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

