import { observable, action, configure, runInAction } from 'mobx';
import config from '../config/index';
import axios from 'axios';

configure({
    enforceActions: 'observed',
});

class CategoryStore {
   
    @observable moreCategoryList = [];
    @observable isLoading = false;
    @observable categoryPosts;

    @action async getCategoryList(page) {
        console.log("getCategoryList");
        this.isLoading = false;
        try {
            const { data } = await axios.get(config.url + `wp-json/wp/v2/categories?per_page=20&page=${page}`);
            runInAction(() => {
                this.moreCategoryList = [...this.moreCategoryList, ...data];
                this.isLoading = true;
            })
        } catch (error) {
            console.log("getCategoryList Error Message : " + error);
        }
    }

    @action async getCategoryPosts(categoryId) {
        console.log("getCategoryPosts");
        this.categoryPosts = [];
        try {
            const { data } = await axios.get(config.url + `/wp-json/wp/v2/posts?categories=${categoryId}`);
            runInAction(() => {
                this.categoryPosts = [...this.categoryPosts, ...data]
            })
        } catch (error) {
            console.log("getCategoryPosts Error Message : " + error);
        }
    }
}

export default new CategoryStore();