
import {
  Dimensions
} from 'react-native';

const width = Dimensions.get('screen').width;

export default {

    header: {
        flex: 1,
        height: 45,
        width: '100%',
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
    },
    changeGridButton: {
        alignSelf: 'flex-end',
        marginRight: 5,
        justifyContent: 'center',
    },
    changeImage: {
        margin: 10,
        height: 28,
        width: 28,
    },
    sliderItemAreas: {
        width,
        height: 'auto',
        padding: 10,
        marginBottom: 10,
    },
    imageCover: {
        position: 'absolute',
        top: 10,
        left: 10,
        opacity: 0.5,
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
    sliderTextArea: {
        position: 'absolute',
        padding: 10,
        left: 10,
        bottom: 30,
    },
    sliderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
    },
    changeButtonArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeText: {
        fontWeight: '600',
        paddingLeft: 10,
        borderLeftColor: '#0668b3',
        borderLeftWidth: 2,
        marginLeft: 30,
        marginTop: 20,
    },
    gridChangeButton: {
        padding: 15,
        margin: 15,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    changeButtonImage: {
        height: 32,
        width: 32,
        marginBottom: 15,
    },
    //Grid Style - 1
    listItemAreas: {
        margin: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        flex: 1,
    },
    listTextArea: {
        padding: 15,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    //Grid Style -2 
    listItemAreas2: {
        margin: 15,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    listTextArea2: {
        paddingHorizontal: 10,
        marginHorizontal: 5,
        flex: 1,
    },
    listTitle2: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 25,
    },
    //Grid Style - 3
    listItemAreas3: {
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: "hidden"
    },
    listTextArea3: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        marginHorizontal: 5,
        flex: 1,
    },
    listTitle3: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 25,
    },
    //Grid Style - 4
    listItemAreas4: {
        margin: 10,
        // marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column'
    },
    listTextArea4: {
        padding: 15,
    },
    listTitle4: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
}
