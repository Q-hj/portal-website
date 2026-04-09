/**
 * 网站信息接口
 */
export interface Website {
  /** 网站唯一标识 */
  id: string;
  /** 网站名称 */
  name: string;
  /** 网站地址 */
  url: string;
  /** 网站描述 */
  description: string;
  /** 网站图标URL */
  icon: string;
}

/**
 * 分类信息接口
 */
export interface Category {
  /** 分类唯一标识 */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类图标 */
  icon: string;
  /** 分类下的网站列表 */
  websites: Website[];
}

/**
 * 网站数据接口
 */
export interface WebsiteData {
  /** 所有分类 */
  categories: Category[];
}

/**
 * 主题类型
 */
export type ThemeType = 'light' | 'dark' | 'system';

/**
 * 主题配置
 */
export interface ThemeConfig {
  /** 主题类型 */
  type: ThemeType;
  /** 主题名称 */
  name: string;
}