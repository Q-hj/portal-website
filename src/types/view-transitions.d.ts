/**
 * View Transitions API 类型声明
 * 用于实现主题切换时的平滑过渡动画
 */

interface ViewTransition {
  /** 过渡准备完成的 Promise */
  ready: Promise<void>;
  /** 过渡完成的 Promise */
  finished: Promise<void>;
  /** 更新过渡捕获层 */
  updateCallbackDone: Promise<void>;
  /** 跳过过渡动画 */
  skipTransition: () => void;
}

interface Document {
  /** 开始视图过渡 */
  startViewTransition: (callback: () => void) => ViewTransition;
}