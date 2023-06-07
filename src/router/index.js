import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/home.vue'),
    meta:{
      title:"渔港海浪预警报平台"
    }
  },
];

/**
 * createWebHashHistory： hash版本的路由，就是路径里面含有#
 * createWebHistory: history的路由，路径里面不含有#
 */
const router = createRouter({
  history: createWebHashHistory(),  // hash路由模式
  // history: createWebHistory(),  // history路由模式
  routes
});

// 修改浏览器标签文字
router.afterEach((to,from) => {
  document.title = to.meta.title
})

export default router;