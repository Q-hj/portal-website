<script setup lang="ts">
import WebsiteCard from '@/components/WebsiteCard/index.vue';
import { useTheme } from '@/composables/useTheme';
import type { Category, ThemeType } from '@/types';
import { computed, ref } from 'vue';
import websiteData from '@/data/websites.json';

/**
 * 门户网站主页面
 * 展示各分类下的网站列表，支持主题切换和响应式布局
 */

/** 所有分类数据 */
const categories = ref<Category[]>(websiteData.categories);

/** 当前选中的分类ID */
const activeCategory = ref<string>(categories.value[0]?.id || '');

/** 主题管理 */
const { themeSetting, setTheme, isDark } = useTheme();

/** 主题选项 */
const themeOptions: { value: ThemeType; label: string; icon: string }[] = [
  { value: 'light', label: '亮色', icon: 'icon-sun' },
  { value: 'dark', label: '暗色', icon: 'icon-moon' },
  { value: 'system', label: '跟随系统', icon: 'icon-desktop' },
];

/**
 * 切换分类
 * @param categoryId - 分类ID
 */
const handleCategoryChange = (categoryId: string) => {
  activeCategory.value = categoryId;
};

/** 获取当前分类下的网站列表 */
const currentWebsites = computed(() => {
  const category = categories.value.find((cat) => cat.id === activeCategory.value);
  return category?.websites || [];
});
</script>

<template>
  <div class="portal-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <h1 class="site-title">网站导航</h1>
        <div class="theme-switcher">
          <a-button-group>
            <a-button
              v-for="option in themeOptions"
              :key="option.value"
              :type="themeSetting === option.value ? 'primary' : 'secondary'"
              @click="setTheme(option.value)"
            >
              <template #icon>
                <icon-font :type="option.icon" />
              </template>
              {{ option.label }}
            </a-button>
          </a-button-group>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="main-content">
      <!-- 分类导航 -->
      <nav class="category-nav">
        <a-space wrap>
          <a-tag
            v-for="category in categories"
            :key="category.id"
            :color="activeCategory === category.id ? 'arcoblue' : 'gray'"
            size="large"
            checked
            :checkable="true"
            :default-checked="activeCategory === category.id"
            @check="handleCategoryChange(category.id)"
          >
            <template #icon>
              <icon-font :type="category.icon" />
            </template>
            {{ category.name }}
          </a-tag>
        </a-space>
      </nav>

      <!-- 网站列表 -->
      <section class="website-section">
        <a-row :gutter="[16, 16]">
          <a-col
            v-for="website in currentWebsites"
            :key="website.id"
            :xs="12"
            :sm="8"
            :md="6"
            :lg="4"
          >
            <WebsiteCard :website="website" />
          </a-col>
        </a-row>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2026 网站导航 - 您的互联网入口</p>
    </footer>
  </div>
</template>

<style scoped>
.portal-container {
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

.site-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.theme-switcher {
  display: flex;
  gap: 8px;
}

/* 主体内容 */
.main-content {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  width: 100%;
}

.category-nav {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.website-section {
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
    flex-direction: column;
    align-items: flex-start;
  }

  .site-title {
    font-size: 20px;
  }

  .main-content {
    padding: 16px;
  }

  .category-nav {
    margin-bottom: 16px;
  }
}

/* 暗色主题适配 */
[data-theme='dark'] .site-title {
  background: linear-gradient(135deg, #8b9fef 0%, #a084ca 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>