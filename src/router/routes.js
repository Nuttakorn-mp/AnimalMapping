import Vue from "vue/dist/vue.esm";
import Router from 'vue-router';
import CreateBox from '@/components/CreateBox';
import AnimalList from '@/components/AnimalList';
import Views from '@/components/Views';
import ViewsData from '@/components/ViewsData';


Vue.use(Router)
const routes = [
  {name:'add-data',path:'/add-data', component:CreateBox, props: true},
  {path:'/modify-data', component:AnimalList, props: true},
  {name:'views',path:'/Views', component:Views, props:true},
  {name:'views-data',path:'/views/:animalName', component:ViewsData, props:true},
  {name:'modify',path:'/modify-data', component:AnimalList, props:true},
  {path:'/', redirect:'/modify-data' ,component:AnimalList, props: true},
];
// Router.replace({ path: '*', redirect: '/modify-data' })
export default routes;  