// LocalStorage 存储工具
import { Idea, Category, DEFAULT_CATEGORIES } from '@/types';

const IDEAS_KEY = 'idea-capture-ideas';
const CATEGORIES_KEY = 'idea-capture-categories';

// 生成唯一ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 想法存储
export function getIdeas(): Idea[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(IDEAS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveIdea(content: string, categoryId: string): Idea {
  const ideas = getIdeas();
  const newIdea: Idea = {
    id: generateId(),
    content,
    categoryId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isDeleted: false,
  };
  ideas.unshift(newIdea);
  localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
  return newIdea;
}

export function deleteIdea(id: string): void {
  const ideas = getIdeas();
  const index = ideas.findIndex(i => i.id === id);
  if (index !== -1) {
    ideas[index].isDeleted = true;
    localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
  }
}

export function getIdeasByCategory(categoryId: string): Idea[] {
  return getIdeas().filter(i => i.categoryId === categoryId && !i.isDeleted);
}

export function searchIdeas(keyword: string): Idea[] {
  const keywordLower = keyword.toLowerCase();
  return getIdeas().filter(i => 
    i.content.toLowerCase().includes(keywordLower) && !i.isDeleted
  );
}

// 分类存储
export function getCategories(): Category[] {
  if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
  const data = localStorage.getItem(CATEGORIES_KEY);
  if (!data) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  }
  return JSON.parse(data);
}

export function saveCategory(name: string, icon: string, color: string): Category {
  const categories = getCategories();
  const newCategory: Category = {
    id: generateId(),
    name,
    icon,
    color,
    createdAt: Date.now(),
    sortOrder: categories.length,
  };
  categories.push(newCategory);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  return newCategory;
}

export function updateCategory(id: string, name: string, icon: string, color: string): void {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories[index] = { ...categories[index], name, icon, color };
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
}

export function deleteCategory(id: string): void {
  const categories = getCategories().filter(c => c.id !== id);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

// 工具函数
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  return date.toLocaleDateString('zh-CN');
}
