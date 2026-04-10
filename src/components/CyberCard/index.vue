<script setup lang="ts">
import type { Website } from '@/types';

/**
 * 赛博朋克风格网站卡片组件
 */

const props = defineProps<{
  website: Website;
}>();

/** 打开网站 */
const openWebsite = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<template>
  <div class="cyber-card" @click="openWebsite(props.website.url)">
    <div class="card-border"></div>
    <div class="card-content">
      <div class="card-corner corner-tl"></div>
      <div class="card-corner corner-tr"></div>
      <div class="card-corner corner-bl"></div>
      <div class="card-corner corner-br"></div>

      <div class="card-icon">
        <img
          :src="props.website.icon"
          :alt="props.website.name"
          @error="(e) => ((e.target as HTMLImageElement).src = '/default-icon.svg')"
        />
      </div>

      <div class="card-info">
        <h3 class="card-name">{{ props.website.name }}</h3>
        <p class="card-desc">{{ props.website.description }}</p>
      </div>

      <div class="card-glow"></div>
    </div>
  </div>
</template>

<style scoped>
.cyber-card {
  position: relative;
  width: 200px;
  height: 180px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.cyber-card:hover {
  transform: translateY(-8px) scale(1.02);
}

.card-border {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(0, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
}

.cyber-card:hover .card-border {
  border-color: rgba(0, 255, 255, 0.8);
  box-shadow:
    0 0 10px rgba(0, 255, 255, 0.3),
    0 0 20px rgba(0, 255, 255, 0.2),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
}

.card-content {
  position: absolute;
  inset: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 1;
}

/* 角落装饰 */
.card-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 0, 255, 0.5);
}

.corner-tl {
  top: -1px;
  left: -1px;
  border-right: none;
  border-bottom: none;
}

.corner-tr {
  top: -1px;
  right: -1px;
  border-left: none;
  border-bottom: none;
}

.corner-bl {
  bottom: -1px;
  left: -1px;
  border-right: none;
  border-top: none;
}

.corner-br {
  bottom: -1px;
  right: -1px;
  border-left: none;
  border-top: none;
}

.cyber-card:hover .card-corner {
  border-color: rgba(255, 0, 255, 0.8);
  animation: cornerPulse 1s ease-in-out infinite;
}

@keyframes cornerPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 图标 */
.card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  overflow: hidden;
}

.card-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

/* 信息 */
.card-info {
  text-align: center;
}

.card-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.cyber-card:hover .card-name {
  text-shadow:
    0 0 5px #fff,
    0 0 10px #0ff,
    0 0 20px #0ff;
}

.card-desc {
  margin: 4px 0 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 160px;
}

/* 发光效果 */
.card-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-card:hover .card-glow {
  opacity: 1;
  animation: glowSlide 2s linear infinite;
}

@keyframes glowSlide {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

/* 响应式 */
@media (max-width: 768px) {
  .cyber-card {
    width: 160px;
    height: 150px;
  }

  .card-content {
    padding: 16px;
  }

  .card-icon {
    width: 40px;
    height: 40px;
  }

  .card-icon img {
    width: 28px;
    height: 28px;
  }

  .card-name {
    font-size: 14px;
  }

  .card-desc {
    font-size: 11px;
    max-width: 120px;
  }
}
</style>