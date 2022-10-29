import Vue from "vue/dist/vue.esm";
import Router from 'vue-router';
import CreateBox from '@/components/CreateBox';
import AnimalList from '@/components/AnimalList';
import NotFound from '@/components/NotFound';


Vue.use(Router)
const routes = [
  {name:'add-data',path:'/add-data', component:CreateBox, props: true},
  {path:'/modify-data', component:AnimalList, props: true},
  { path: "/add-data/*", component: NotFound },
  {path:'*', redirect:'/modify-data' ,component:AnimalList, props: true},// เด้งไปบรรทัดที่ 11
  // {path:'/', redirect:'/modify-data' ,component:AnimalList, props: true},// เด้งไปบรรทัดที่ 11
  // { path: "*", component: NotFound }
];
// Router.replace({ path: '*', redirect: '/modify-data' })
export default routes;  