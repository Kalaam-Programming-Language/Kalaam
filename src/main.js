import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import VueRouter from 'vue-router';
import router from './router';
import './quasar';
import './styles/kalaam.css';




Vue.config.productionTip = false;

new Vue({
    store,
    VueRouter,
    router,
    render: h => h(App),
}).$mount('#app');