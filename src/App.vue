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
</style>
