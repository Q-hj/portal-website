<script setup lang="ts">
import ThemeSwitcher from '@/components/ThemeSwitcher/index.vue';
import { useRouter } from 'vue-router';

/**
 * 首页组件
 * 包含炫酷 banner 和个人项目入口
 */

const router = useRouter();

/** 进入个人项目页 */
const goToProjects = () => {
  router.push('/projects');
};
</script>

<template>
  <div class="home-container">
    <!-- 顶部导航 -->
    <header class="header">
      <ThemeSwitcher />
    </header>

    <!-- Banner 区域 -->
    <section class="banner">
      <div class="banner-content">
        <div class="banner-bg">
          <div class="gradient-orb orb-1"></div>
          <div class="gradient-orb orb-2"></div>
          <div class="gradient-orb orb-3"></div>
          <div class="particle-field"></div>
        </div>

        <div class="banner-text">
          <h1 class="main-title">
            <span class="title-line">欢迎来到</span>
            <span class="title-highlight">我的世界</span>
          </h1>
          <p class="subtitle">探索创意，发现可能</p>
        </div>
      </div>
    </section>

    <!-- 项目入口区域 -->
    <section class="entry-section">
      <div class="entry-card" @click="goToProjects">
        <div class="entry-icon">
          <icon-folder />
        </div>
        <h2 class="entry-title">个人项目</h2>
        <p class="entry-desc">查看我的项目作品集</p>
        <div class="entry-arrow">
          <icon-right />
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2026 个人网站集合</p>
    </footer>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-1);
  overflow: hidden;
}

/* 头部 */
.header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  padding: 16px 24px;
}

/* Banner */
.banner {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.banner-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 背景装饰 */
.banner-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  top: 60%;
  right: 15%;
  animation-delay: -3s;
}

.orb-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  bottom: 10%;
  left: 50%;
  animation-delay: -5s;
}

.particle-field {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 40px 40px;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

/* 文字内容 */
.banner-text {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 40px;
}

.main-title {
  margin: 0;
  font-size: 48px;
  font-weight: 800;
  line-height: 1.3;
}

.title-line {
  display: block;
  color: var(--color-text-2);
  margin-bottom: 8px;
}

.title-highlight {
  display: block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

.subtitle {
  margin: 16px 0 0;
  font-size: 20px;
  color: var(--color-text-3);
  opacity: 0.8;
}

/* 项目入口 */
.entry-section {
  padding: 40px 24px 80px;
  display: flex;
  justify-content: center;
}

.entry-card {
  position: relative;
  width: 320px;
  padding: 32px;
  background: var(--color-bg-2);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.entry-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: rgb(var(--primary-6));
}

.entry-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  opacity: 0;
  transition: opacity 0.3s;
}

.entry-card:hover::before {
  opacity: 1;
}

.entry-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  font-size: 24px;
  margin-bottom: 16px;
}

.entry-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-1);
}

.entry-desc {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--color-text-3);
}

.entry-arrow {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-3);
  font-size: 20px;
  opacity: 0;
  transition: all 0.3s;
}

.entry-card:hover .entry-arrow {
  opacity: 1;
  transform: translateY(-50%) translateX(4px);
}

/* 页脚 */
.footer {
  padding: 24px;
  text-align: center;
  background: var(--color-bg-2);
  border-top: 1px solid var(--color-border);
}

.footer p {
  margin: 0;
  color: var(--color-text-3);
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 768px) {
  .header {
    padding: 12px 16px;
  }

  .main-title {
    font-size: 32px;
  }

  .subtitle {
    font-size: 16px;
  }

  .entry-card {
    width: 100%;
    max-width: 280px;
    padding: 24px;
  }

  .orb-1 {
    width: 200px;
    height: 200px;
  }

  .orb-2 {
    width: 150px;
    height: 150px;
  }

  .orb-3 {
    width: 120px;
    height: 120px;
  }
}

/* 暗色主题 */
[data-theme='dark'] .gradient-orb {
  opacity: 0.4;
}

[data-theme='dark'] .entry-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

[data-theme='dark'] .title-highlight {
  background: linear-gradient(135deg, #8b9fef 0%, #a084ca 50%, #c5a3d0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>