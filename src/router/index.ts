import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

/** 路由配置 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/Projects/index.vue'),
    meta: {
      title: '个人项目',
    },
  },
];

/** 创建路由实例 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

/** 路由守卫 - 设置页面标题 */
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string;
  if (title) {
    document.title = title;
  }
  next();
});

export default router;