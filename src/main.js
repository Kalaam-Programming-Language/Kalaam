import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import VueRouter from 'vue-router';
import router from './router';
import './quasar';
import './styles/kalaam.css';
import { kalaamCode } from './components/kalaamHighlight';




Vue.config.productionTip = false;
Vue.directive('kalaam-code', kalaamCode);

new Vue({
    store,
    VueRouter,
    router,
    render: h => h(App),
}).$mount('#app');