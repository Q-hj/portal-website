<script setup lang="ts">
import ThemeSwitcher from '@/components/ThemeSwitcher/index.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

/**
 * 首页组件
 * 赛博朋克风格炫酷 banner
 */

const router = useRouter();

/** 打字机文字 */
const typedText = ref('');
const fullText = 'MY WORLD';
const typingComplete = ref(false);

/** 鼠标位置 */
const mouseX = ref(0);
const mouseY = ref(0);

/** 进入个人项目页 */
const goToProjects = () => {
  router.push('/projects');
};

/** 打字机动画 */
const startTyping = () => {
  let index = 0;
  const typeInterval = setInterval(() => {
    if (index < fullText.length) {
      typedText.value = fullText.slice(0, index + 1);
      index++;
    } else {
      clearInterval(typeInterval);
      typingComplete.value = true;
    }
  }, 150);
};

/** 鼠标移动追踪 */
const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

onMounted(() => {
  startTyping();
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <div class="home-container">
    <!-- 顶部导航 -->
    <header class="header">
      <ThemeSwitcher />
    </header>

    <!-- Banner 区域 -->
    <section class="banner">
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
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>

      <!-- 主标题区域 -->
      <div class="banner-content">
        <div class="glitch-container">
          <h1 class="main-title" :data-text="typedText">
            <span class="neon-text">{{ typedText }}</span>
            <span class="cursor" :class="{ hidden: typingComplete }">_</span>
          </h1>
        </div>

        <p class="subtitle" :class="{ visible: typingComplete }">
          探索创意 · 发现可能 · 创造未来
        </p>

        <!-- 霓虹按钮 -->
        <button
          class="neon-btn"
          :class="{ visible: typingComplete }"
          @click="goToProjects"
        >
          <span class="btn-text">进入我的世界</span>
          <span class="btn-glow"></span>
        </button>
      </div>

      <!-- 扫描线效果 -->
      <div class="scanline"></div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2026 · CYBER WORLD</p>
    </footer>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a0f;
  overflow: hidden;
  position: relative;
}

/* 头部 */
.header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  padding: 16px 24px;
}

/* 鼠标光效 */
.cursor-glow {
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 1;
  transition: opacity 0.3s;
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
    radial-gradient(1px 1px at 10px 10px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 150px 150px, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 300px 80px, rgba(255,255,255,0.7), transparent);
  background-size: 350px 350px;
  animation: drift 60s linear infinite;
}

.stars-md {
  background-image:
    radial-gradient(2px 2px at 50px 50px, rgba(255,255,255,0.9), transparent),
    radial-gradient(2px 2px at 200px 200px, rgba(0,255,255,0.8), transparent),
    radial-gradient(2px 2px at 400px 120px, rgba(255,0,255,0.7), transparent);
  background-size: 500px 500px;
  animation: drift 80s linear infinite reverse;
}

.stars-lg {
  background-image:
    radial-gradient(3px 3px at 100px 100px, rgba(255,255,255,1), transparent),
    radial-gradient(3px 3px at 250px 250px, rgba(0,255,255,0.9), transparent);
  background-size: 600px 600px;
  animation: drift 100s linear infinite;
}

@keyframes drift {
  from { transform: translateY(0); }
  to { transform: translateY(-600px); }
}

/* 霓虹网格地面 */
.grid-floor {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
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
  from { background-position: 0 0; }
  to { background-position: 0 50px; }
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
  opacity: 0.6;
}

.shape-1 {
  width: 80px;
  height: 80px;
  border: 2px solid rgba(0, 255, 255, 0.5);
  top: 15%;
  left: 10%;
  animation: floatRotate 15s ease-in-out infinite;
}

.shape-2 {
  width: 60px;
  height: 60px;
  border: 2px solid rgba(255, 0, 255, 0.5);
  border-radius: 50%;
  top: 25%;
  right: 15%;
  animation: floatRotate 12s ease-in-out infinite reverse;
}

.shape-3 {
  width: 100px;
  height: 100px;
  border: 2px solid rgba(255, 255, 0, 0.4);
  top: 40%;
  left: 20%;
  transform: rotate(45deg);
  animation: floatRotate 18s ease-in-out infinite;
}

.shape-4 {
  width: 40px;
  height: 40px;
  background: rgba(0, 255, 255, 0.2);
  top: 60%;
  right: 25%;
  animation: floatRotate 10s ease-in-out infinite reverse;
}

.shape-5 {
  width: 50px;
  height: 50px;
  border: 2px solid rgba(255, 0, 255, 0.4);
  top: 70%;
  left: 30%;
  border-radius: 50%;
  animation: floatRotate 14s ease-in-out infinite;
}

@keyframes floatRotate {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-30px) rotate(90deg);
  }
  50% {
    transform: translateY(-60px) rotate(180deg);
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
  }
}

/* 主内容 */
.banner {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  z-index: 10;
}

.banner-content {
  text-align: center;
  z-index: 20;
}

/* 标题 */
.glitch-container {
  position: relative;
  margin-bottom: 24px;
}

.main-title {
  font-size: 72px;
  font-weight: 900;
  letter-spacing: 8px;
  position: relative;
  display: inline-block;
}

.neon-text {
  color: #fff;
  text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #0ff,
    0 0 40px #0ff,
    0 0 80px #0ff,
    0 0 90px #0ff,
    0 0 100px #0ff,
    0 0 150px #0ff;
  animation: neonPulse 2s ease-in-out infinite alternate;
}

@keyframes neonPulse {
  from {
    text-shadow:
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #0ff,
      0 0 40px #0ff,
      0 0 80px #0ff;
  }
  to {
    text-shadow:
      0 0 2px #fff,
      0 0 5px #fff,
      0 0 10px #0ff,
      0 0 20px #0ff,
      0 0 40px #0ff,
      0 0 80px #f0f,
      0 0 120px #f0f;
  }
}

.cursor {
  color: #0ff;
  animation: blink 1s step-end infinite;
}

.cursor.hidden {
  animation: none;
  opacity: 0;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 副标题 */
.subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 4px;
  margin: 0 0 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.subtitle.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 霓虹按钮 */
.neon-btn {
  position: relative;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  color: #0ff;
  background: transparent;
  border: 2px solid #0ff;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  letter-spacing: 2px;
}

.neon-btn.visible {
  opacity: 1;
  transform: translateY(0);
}

.neon-btn:hover {
  color: #000;
  background: #0ff;
  text-shadow: none;
  box-shadow:
    0 0 20px #0ff,
    0 0 40px #0ff,
    0 0 60px #0ff,
    inset 0 0 20px rgba(0, 255, 255, 0.3);
}

.neon-btn:hover .btn-glow {
  opacity: 1;
}

.btn-text {
  position: relative;
  z-index: 2;
}

.btn-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent);
  opacity: 0;
  animation: btnGlow 2s linear infinite;
  transition: opacity 0.3s;
}

@keyframes btnGlow {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

/* 扫描线 */
.scanline {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 255, 255, 0.03) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 30;
}

/* 页脚 */
.footer {
  position: relative;
  padding: 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  z-index: 100;
}

.footer p {
  margin: 0;
  color: rgba(0, 255, 255, 0.6);
  font-size: 14px;
  letter-spacing: 2px;
}

/* 响应式 */
@media (max-width: 768px) {
  .header {
    padding: 12px 16px;
  }

  .main-title {
    font-size: 36px;
    letter-spacing: 4px;
  }

  .subtitle {
    font-size: 14px;
    letter-spacing: 2px;
  }

  .neon-btn {
    padding: 12px 32px;
    font-size: 14px;
  }

  .cursor-glow {
    width: 150px;
    height: 150px;
  }

  .shape-1 { width: 40px; height: 40px; }
  .shape-2 { width: 30px; height: 30px; }
  .shape-3 { width: 50px; height: 50px; }
  .shape-4 { width: 20px; height: 20px; }
  .shape-5 { width: 25px; height: 25px; }
}

/* 暗色主题下的额外效果 */
[data-theme='dark'] .home-container {
  /* 已经是深色风格，保持不变 */
}
</style>