<script setup lang="ts">
import Portal from '@/views/Portal/index.vue';
</script>

<template>
  <Portal />
</template>

<style>
/* 全局样式 - 移除默认边距 */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
}

/* 确保应用占满全屏 */
#app {
  width: 100%;
  min-height: 100vh;
}

/* View Transitions API 全局样式 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 暗色模式过渡 */
::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
}

/* 禁用过渡期间的默认动画 */
[data-theme] {
  transition: none !important;
}
</style>
