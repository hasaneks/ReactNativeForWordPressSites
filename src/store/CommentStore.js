import { observable, action, configure, runInAction } from 'mobx';
import config from '../config/index'
import axios from 'axios';

configure({
    enforceActions: 'observed',
})

class CommentStore {
    @observable comments = [];
    @observable noResultImageVisible = true;

    @action async getComments(articleId) {
        console.log("getComments");
        this.comments = [];

        try {
            const { data } = await axios.get(config.url + `wp-json/wp/v2/comments?post=${articleId}&order=asc`);
            runInAction(() => {
                this.comments = data;
            })

        } catch (error) {
            console.log("getComments Error Message : " + error);
        }
    }
}

export default new CommentStore();
