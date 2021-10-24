import Vue from "vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);

import Main from "./components/MainComponent";
import Sample from "./components/SampleComponent";


const routes = [
    // {
    //     path: "/" ,
    //     name: "hometwo" ,
    //     component: HomeTwo
    // },
    
    {
        path: "/",
        name: "main",
        component: Main
    },

    {
        path: "/sample",
        name: "sample",
        component: Sample
    },

    
];

export default new VueRouter ({
    //URLに#をつけなくする
    mode: "history",
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
});