import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import RegRoot from './components/RegRoot.vue';
import RegEntity from './components/RegEntity.vue';

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
      {
        path: 'entity',
        name: 'RegEntity',
        component: RegEntity,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
