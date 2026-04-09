<script setup lang="ts">
import type { Website } from '@/types';

/**
 * 网站卡片组件
 * 用于展示单个网站信息，包含图标、名称、描述和链接
 */

/** Props定义 */
const props = defineProps<{
  /** 网站信息 */
  website: Website;
}>();

/**
 * 打开网站链接
 * @param url - 网站地址
 */
const openWebsite = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<template>
  <a-card
    class="website-card"
    hoverable
    @click="openWebsite(props.website.url)"
  >
    <div class="card-content">
      <div class="icon-wrapper">
        <img
          :src="props.website.icon"
          :alt="props.website.name"
          class="website-icon"
          @error="(e) => ((e.target as HTMLImageElement).src = '/default-icon.svg')"
        />
      </div>
      <div class="info-wrapper">
        <h3 class="website-name">{{ props.website.name }}</h3>
        <p class="website-description">{{ props.website.description }}</p>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.website-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.website-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.icon-wrapper {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-fill-2);
  border-radius: 8px;
  overflow: hidden;
}

.website-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.info-wrapper {
  flex: 1;
  min-width: 0;
}

.website-name {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.website-description {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}

/* 暗色主题适配 */
[data-theme='dark'] .website-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
</style>