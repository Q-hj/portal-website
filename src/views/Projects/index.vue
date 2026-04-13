<script setup lang="ts">
import CyberCard from "@/components/CyberCard/index.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher/index.vue";
import { personSite } from "@/data/person-site";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

/**
 * 个人项目页面
 * 赛博朋克风格展示个人项目列表
 */

const router = useRouter();

/** 鼠标位置 */
const mouseX = ref(0);
const mouseY = ref(0);

/** 返回首页 */
const goBack = () => {
  router.push("/");
};

/** 鼠标移动追踪 */
const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <div class="projects-container">
    <!-- 鼠标跟随光效 -->
    <div
      class="cursor-glow"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    ></div>

    <!-- 星空背景 -->
    <div class="starfield">
      <div class="stars stars-sm"></div>
      <div class="stars stars-md"></div>
      <div class="stars stars-lg"></div>
    </div>

    <!-- 霓虹网格地面 -->
    <div class="grid-floor">
      <div class="grid-lines"></div>
    </div>

    <!-- 流动几何图形 -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <button class="neon-back-btn" @click="goBack">
          <icon-left />
          <span>返回首页</span>
        </button>
        <ThemeSwitcher />
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="main-content">
      <section class="page-title">
        <h1 class="neon-title">PROJECTS</h1>
        <p class="subtitle">我的项目作品集</p>
        <div class="title-line"></div>
      </section>

      <!-- 项目列表 -->
      <section class="project-section">
        <div class="project-grid">
          <CyberCard
            v-for="project in personSite"
            :key="project.id"
            :website="project"
          />
        </div>
      </section>
    </main>

    <!-- 扫描线效果 -->
    <div class="scanline"></div>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2026 · CYBER WORLD</p>
    </footer>
  </div>
</template>

<style scoped>
.projects-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a0f;
  overflow: hidden;
  position: relative;
}

/* 鼠标光效 */
.cursor-glow {
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(0, 255, 255, 0.15) 0%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 1;
}

/* 星空 */
.starfield {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.stars {
  position: absolute;
  inset: 0;
  background-repeat: repeat;
}

.stars-sm {
  background-image:
    radial-gradient(
      1px 1px at 10px 10px,
      rgba(255, 255, 255, 0.8),
      transparent
    ),
    radial-gradient(
      1px 1px at 150px 150px,
      rgba(255, 255, 255, 0.6),
      transparent
    ),
    radial-gradient(
      1px 1px at 300px 80px,
      rgba(255, 255, 255, 0.7),
      transparent
    );
  background-size: 350px 350px;
  animation: drift 60s linear infinite;
}

.stars-md {
  background-image:
    radial-gradient(
      2px 2px at 50px 50px,
      rgba(255, 255, 255, 0.9),
      transparent
    ),
    radial-gradient(
      2px 2px at 200px 200px,
      rgba(0, 255, 255, 0.8),
      transparent
    ),
    radial-gradient(2px 2px at 400px 120px, rgba(255, 0, 255, 0.7), transparent);
  background-size: 500px 500px;
  animation: drift 80s linear infinite reverse;
}

.stars-lg {
  background-image:
    radial-gradient(
      3px 3px at 100px 100px,
      rgba(255, 255, 255, 1),
      transparent
    ),
    radial-gradient(3px 3px at 250px 250px, rgba(0, 255, 255, 0.9), transparent);
  background-size: 600px 600px;
  animation: drift 100s linear infinite;
}

@keyframes drift {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-600px);
  }
}

/* 霓虹网格地面 */
.grid-floor {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  perspective: 500px;
  overflow: hidden;
}

.grid-lines {
  position: absolute;
  bottom: 0;
  left: -50%;
  right: -50%;
  height: 200%;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px);
  background-size: 50px 50px;
  transform: rotateX(60deg);
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 50px;
  }
}

/* 流动几何图形 */
.floating-shapes {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.shape {
  position: absolute;
  opacity: 0.4;
}

.shape-1 {
  width: 60px;
  height: 60px;
  border: 2px solid rgba(0, 255, 255, 0.5);
  top: 20%;
  right: 10%;
  animation: floatRotate 15s ease-in-out infinite;
}

.shape-2 {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 0, 255, 0.5);
  border-radius: 50%;
  top: 30%;
  left: 5%;
  animation: floatRotate 12s ease-in-out infinite reverse;
}

.shape-3 {
  width: 80px;
  height: 80px;
  border: 2px solid rgba(255, 255, 0, 0.4);
  top: 50%;
  right: 20%;
  transform: rotate(45deg);
  animation: floatRotate 18s ease-in-out infinite;
}

@keyframes floatRotate {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
  }
  50% {
    transform: translateY(-40px) rotate(180deg);
  }
  75% {
    transform: translateY(-20px) rotate(270deg);
  }
}

/* 头部样式 */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
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

.neon-back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: rgba(0, 255, 255, 0.8);
  background: transparent;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.neon-back-btn:hover {
  color: #0ff;
  border-color: rgba(0, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

/** 主体内容 */
.main-content {
  position: relative;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
  width: 100%;
  z-index: 10;
}

.page-title {
  margin-bottom: 48px;
  text-align: center;
}

.neon-title {
  margin: 0;
  font-size: 48px;
  font-weight: 900;
  letter-spacing: 8px;
  color: #fff;
  text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #0ff,
    0 0 40px #0ff,
    0 0 80px #0ff;
  animation: neonPulse 2s ease-in-out infinite alternate;
}

@keyframes neonPulse {
  from {
    text-shadow:
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #0ff,
      0 0 40px #0ff;
  }
  to {
    text-shadow:
      0 0 2px #fff,
      0 0 5px #fff,
      0 0 10px #0ff,
      0 0 20px #0ff,
      0 0 40px #f0f,
      0 0 80px #f0f;
  }
}

.subtitle {
  margin: 12px 0 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 4px;
}

.title-line {
  margin: 24px auto 0;
  width: 200px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 255, 255, 0.8),
    rgba(255, 0, 255, 0.8),
    transparent
  );
}

.project-section {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

/* 扫描线 */
.scanline {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 255, 255, 0.02) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 50;
}

/* 页脚 */
.footer {
  position: relative;
  padding: 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  z-index: 100;
}

.footer p {
  margin: 0;
  color: rgba(0, 255, 255, 0.6);
  font-size: 14px;
  letter-spacing: 2px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .header-content {
    padding: 12px 16px;
  }

  .main-content {
    padding: 40px 16px;
  }

  .neon-title {
    font-size: 28px;
    letter-spacing: 4px;
  }

  .subtitle {
    font-size: 14px;
    letter-spacing: 2px;
  }

  .title-line {
    width: 150px;
  }

  .project-grid {
    gap: 16px;
  }

  .cursor-glow {
    width: 150px;
    height: 150px;
  }

  .shape-1 {
    width: 30px;
    height: 30px;
  }
  .shape-2 {
    width: 20px;
    height: 20px;
  }
  .shape-3 {
    width: 40px;
    height: 40px;
  }
}
</style>
