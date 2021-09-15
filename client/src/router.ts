import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import RegRoot from './components/RegRoot.vue';
import RegEntity from './components/RegEntity.vue';
import RegAddEntity from './components/RegAddEntity.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/reg',
    name: 'RegRoot',
    component: RegRoot,
    children: [
      { path: 'entity/add', component: RegAddEntity },
      { path: 'entity', name: 'RegEntity', component: RegEntity },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
