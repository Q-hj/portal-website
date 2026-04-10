<script setup lang="ts">
import WebsiteCard from '@/components/WebsiteCard/index.vue';
import ThemeSwitcher from '@/components/ThemeSwitcher/index.vue';
import { useRouter } from 'vue-router';
import { personSite } from '@/data/person-site';

/**
 * 个人项目页面
 * 展示个人项目列表，支持主题切换和响应式布局
 */

const router = useRouter();

/** 返回首页 */
const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="projects-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <a-button type="text" @click="goBack" class="back-btn">
          <template #icon>
            <icon-left />
          </template>
          返回首页
        </a-button>
        <ThemeSwitcher />
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="main-content">
      <section class="page-title">
        <h1>个人项目</h1>
        <p>探索我的项目作品集</p>
      </section>

      <!-- 项目列表 -->
      <section class="project-section">
        <a-row :gutter="[16, 16]">
          <a-col
            v-for="project in personSite"
            :key="project.id"
            :xs="12"
            :sm="8"
            :md="6"
            :lg="4"
          >
            <WebsiteCard :website="project" />
          </a-col>
        </a-row>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2026 个人网站集合</p>
    </footer>
  </div>
</template>

<style scoped>
.projects-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-1);
}

/* 头部样式 */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.back-btn {
  color: var(--color-text-2);
}

.back-btn:hover {
  color: rgb(var(--primary-6));
}

/** 主体内容 */
.main-content {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  width: 100%;
}

.page-title {
  margin-bottom: 32px;
  text-align: center;
}

.page-title h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-title p {
  margin: 8px 0 0;
  font-size: 16px;
  color: var(--color-text-3);
}

.project-section {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 页脚 */
.footer {
  text-align: center;
  padding: 24px;
  background: var(--color-bg-2);
  border-top: 1px solid var(--color-border);
}

.footer p {
  margin: 0;
  color: var(--color-text-3);
  font-size: 14px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .header-content {
    padding: 12px 16px;
  }

  .main-content {
    padding: 16px;
  }

  .page-title h1 {
    font-size: 24px;
  }

  .page-title p {
    font-size: 14px;
  }
}

/* 暗色主题适配 */
[data-theme='dark'] .page-title h1 {
  background: linear-gradient(135deg, #8b9fef 0%, #a084ca 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>