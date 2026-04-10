<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import type { ThemeType } from "@/types";
import { computed, ref } from "vue";

/**
 * 高级主题切换器组件
 * 点击图标即可切换亮色/暗色主题，带有优雅的过渡动画
 */

const { themeSetting, currentTheme, setTheme } = useTheme();

/** 是否正在切换 */
const isSwitching = ref(false);

/** 当前图标显示的主题类型（实际生效的主题） */
const displayTheme = computed(() => currentTheme.value);

/** 下一个主题 */
const nextTheme = computed<ThemeType>(() =>
  themeSetting.value === "light" ? "dark" : "light",
);

/** 图标动画状态 */
const iconState = ref<"idle" | "rotating" | "scaling">("idle");

/**
 * 切换主题
 */
const handleToggle = () => {
  if (isSwitching.value) return;

  const newTheme = nextTheme.value;
  isSwitching.value = true;
  iconState.value = "scaling";

  // 使用 View Transitions API 实现平滑过渡
  if (!document.startViewTransition) {
    setTheme(newTheme);
    setTimeout(() => {
      iconState.value = "rotating";
      setTimeout(() => {
        iconState.value = "idle";
        isSwitching.value = false;
      }, 300);
    }, 100);
    return;
  }

  const transition = document.startViewTransition(() => {
    setTheme(newTheme);
  });

  transition.ready.then(() => {
    iconState.value = "rotating";
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });

  transition.finished.then(() => {
    iconState.value = "idle";
    isSwitching.value = false;
  });
};
</script>

<template>
  <button
    class="theme-toggle-btn"
    :class="{ switching: isSwitching }"
    @click="handleToggle"
    :aria-label="`切换到${nextTheme === 'light' ? '亮色' : '暗色'}模式`"
    :title="`当前：${currentTheme === 'light' ? '亮色' : '暗色'}（点击切换）`"
  >
    <div class="icon-container" :class="[displayTheme, iconState]">
      <!-- 太阳 -->
      <svg
        class="icon sun-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        />
      </svg>
      <!-- 月亮 -->
      <svg
        class="icon moon-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </div>

    <!-- 涟漪效果 -->
    <div class="ripple" :class="{ active: isSwitching }"></div>
  </button>
</template>

<style scoped>
.theme-toggle-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-bg-2);
  color: var(--color-text-1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.theme-toggle-btn:hover {
  border-color: var(--color-primary-light-4);
  background: var(--color-fill-1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.theme-toggle-btn:active {
  transform: scale(0.95);
}

.theme-toggle-btn.switching {
  pointer-events: none;
}

.icon-container {
  position: relative;
  width: 22px;
  height: 22px;
}

.icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 22px;
  height: 22px;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 亮色模式 */
.icon-container.light .sun-icon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
  stroke: #f59e0b;
}

.icon-container.light .moon-icon {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
  stroke: #8b5cf6;
}

/* 暗色模式 */
.icon-container.dark .sun-icon {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
  stroke: #f59e0b;
}

.icon-container.dark .moon-icon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
  stroke: #8b5cf6;
  filter: drop-shadow(0 0 4px rgba(139, 92, 246, 0.4));
}

/* 切换动画 */
.icon-container.scaling .sun-icon,
.icon-container.scaling .moon-icon {
  transform: scale(0) rotate(180deg);
}

.icon-container.rotating .sun-icon,
.icon-container.rotating .moon-icon {
  animation: spin-in 0.3s ease-out forwards;
}

@keyframes spin-in {
  from {
    transform: rotate(-180deg) scale(0);
  }
  to {
    transform: rotate(0deg) scale(1);
  }
}

/* 涟漪效果 */
.ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--color-primary-light-6);
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease-out;
}

.ripple.active {
  width: 200%;
  height: 200%;
  opacity: 0.3;
}
</style>
