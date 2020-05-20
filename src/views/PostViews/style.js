
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

}
