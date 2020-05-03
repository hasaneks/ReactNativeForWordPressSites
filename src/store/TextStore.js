import { observable, action, configure, runInAction } from 'mobx';
import { AllHtmlEntities } from 'html-entities'; // Used to Text cleaning

configure({
    enforceActions: 'observed'
});

class TextStore {
   
    // clearText function to decode HTML tag and HTML character. 
    @action clearText = (text) => {
        const regex = /(<([^>]+)>)/ig;
        text = text.replace(regex, '');
        return AllHtmlEntities.decode(text);
    };
}

export default new TextStore();