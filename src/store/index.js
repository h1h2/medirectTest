import vuex from 'vuex';
import vue from 'vue';
import store from './modules/store'

//load vuex
vue.use(vuex);
export default new  vuex.Store({
    modules:{
        store
    }
});