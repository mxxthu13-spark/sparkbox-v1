// 数据类型定义

export interface Idea {
  id: string;
  content: string;
  categoryId: string;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: number;
  sortOrder: number;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: '个人成长', icon: '📚', color: '#3B82F6', createdAt: Date.now(), sortOrder: 0 },
  { id: '2', name: '育儿', icon: '👶', color: '#EC4899', createdAt: Date.now(), sortOrder: 1 },
  { id: '3', name: '科技思考', icon: '💡', color: '#8B5CF6', createdAt: Date.now(), sortOrder: 2 },
  { id: '4', name: '工作', icon: '💼', color: '#F59E0B', createdAt: Date.now(), sortOrder: 3 },
  { id: '5', name: '生活', icon: '🏠', color: '#10B981', createdAt: Date.now(), sortOrder: 4 },
  { id: '6', name: '其他', icon: '💭', color: '#6B7280', createdAt: Date.now(), sortOrder: 5 },
];
