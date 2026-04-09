import { useLocalStorage, usePreferredDark } from '@vueuse/core';
import { computed, watch } from 'vue';
import type { ThemeType } from '@/types';

/**
 * 主题管理 Composable
 * 支持亮色、暗色和跟随系统三种主题模式
 */
export function useTheme() {
  /** 存储主题设置 */
  const themeSetting = useLocalStorage<ThemeType>('portal-theme', 'system');

  /** 系统偏好暗色模式 */
  const prefersDark = usePreferredDark();

  /** 当前实际应用的主题 */
  const currentTheme = computed(() => {
    if (themeSetting.value === 'system') {
      return prefersDark.value ? 'dark' : 'light';
    }
    return themeSetting.value;
  });

  /** 是否为暗色主题 */
  const isDark = computed(() => currentTheme.value === 'dark');

  /**
   * 设置主题
   * @param theme - 主题类型
   */
  const setTheme = (theme: ThemeType) => {
    themeSetting.value = theme;
  };

  /**
   * 切换主题（在亮色和暗色之间切换）
   */
  const toggleTheme = () => {
    if (themeSetting.value === 'system') {
      setTheme(prefersDark.value ? 'light' : 'dark');
    } else {
      setTheme(themeSetting.value === 'light' ? 'dark' : 'light');
    }
  };

  // 监听主题变化，应用到 document
  watch(
    currentTheme,
    (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      // 同时设置 Arco Design 的主题
      if (theme === 'dark') {
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        document.body.removeAttribute('arco-theme');
      }
    },
    { immediate: true }
  );

  return {
    themeSetting,
    currentTheme,
    isDark,
    setTheme,
    toggleTheme,
  };
}