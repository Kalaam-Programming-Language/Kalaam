import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';


Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
},
{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/About.vue'),
},
{
    path: '/documentation',
    name: 'Documentation',
    // route level code-splitting
    // this generates a separate chunk (Documentation.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "Documentation" */ '../views/Documentation.vue'),
},
{
    path: '/Practice',
    name: 'Practise',
    // route level code-splitting
    // this generates a separate chunk (Practise.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "Practise" */ '../views/Practise.vue'),
},
{
    path: '/FourOhFour',
    name: 'FourOhFour',
    // route level code-splitting
    // this generates a separate chunk (FourOhFour.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "FourOhFour" */ '../views/FourOhFour.vue'),
},

/* {
        path: "/Support",
        name: "Support",
        // route level code-splitting
        // this generates a separate chunk (Support.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Support"  "../views/Support.vue"),
    },
*/

{
    path: '/Examples',
    name: 'Examples',
    // route level code-splitting
    // this generates a separate chunk (Examples.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "Examples" */ '../views/Examples.vue'),
},

];

const router = new VueRouter({
    mode: 'history',
    //base: process.env.BASE_URL,
    routes,
});

export default router;