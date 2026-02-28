'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import { getCategories, saveCategory, updateCategory, deleteCategory, getIdeas } from '@/lib/storage';

const COLORS = [
  '#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B', '#10B981', 
  '#EF4444', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

const ICONS = ['📚', '👶', '💡', '💼', '🏠', '💭', '🎯', '🚀', '❤️', '⭐', '🎨', '📖'];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('💭');
  const [color, setColor] = useState('#3B82F6');

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleRefresh = () => {
    setCategories(getCategories());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      updateCategory(editingId, name.trim(), icon, color);
    } else {
      saveCategory(name.trim(), icon, color);
    }
    
    setName('');
    setIcon('💭');
    setColor('#3B82F6');
    setShowForm(false);
    setEditingId(null);
    handleRefresh();
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setIcon(cat.icon);
    setColor(cat.color);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const ideas = getIdeas();
    const hasIdeas = ideas.some(i => i.categoryId === id);
    if (hasIdeas) {
      alert('该分类下有想法，无法删除');
      return;
    }
    deleteCategory(id);
    handleRefresh();
  };

  const resetForm = () => {
    setName('');
    setIcon('💭');
    setColor('#3B82F6');
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部 */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <Link href="/" className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">🏷️ SparkBox</h1>
          <button
            onClick={() => setShowForm(true)}
            className="p-2 text-blue-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* 分类列表 */}
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: cat.color + '15' }}
              >
                {cat.icon}
              </span>
              <span className="font-medium text-gray-800">{cat.name}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(cat)}
                className="p-2 text-gray-400 hover:text-blue-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 添加/编辑表单弹窗 */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white rounded-t-2xl w-full p-6 animate-slide-up">
            <div className="max-w-lg mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  {editingId ? '编辑分类' : '新建分类'}
                </h3>
                <button onClick={resetForm} className="text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 名称输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">分类名称</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="输入分类名称"
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>

                {/* 图标选择 */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">选择图标</label>
                  <div className="flex flex-wrap gap-2">
                    {ICONS.map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIcon(i)}
                        className={`w-12 h-12 rounded-xl text-2xl transition-all ${
                          icon === i ? 'ring-2 ring-offset-2' : 'opacity-50'
                        }`}
                        style={{ 
                          backgroundColor: icon === i ? color : 'transparent',
                          borderColor: icon === i ? color : 'transparent'
                        }}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 颜色选择 */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">选择颜色</label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`w-10 h-10 rounded-full transition-all ${
                          color === c ? 'ring-2 ring-offset-2' : ''
                        }`}
                        style={{ backgroundColor: c, outline: color === c ? `2px solid ${c}` : 'none' }}
                      />
                    ))}
                  </div>
                </div>

                {/* 预览 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-2">预览</p>
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: color + '15' }}
                    >
                      {icon}
                    </span>
                    <span className="font-medium text-gray-800">{name || '分类名称'}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full py-3 rounded-xl font-medium text-white disabled:opacity-50"
                  style={{ backgroundColor: color }}
                >
                  {editingId ? '保存修改' : '创建分类'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-lg mx-auto flex justify-around py-2">
          <Link href="/" className="flex flex-col items-center p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            <span className="text-xs mt-1">首页</span>
          </Link>
          <Link href="/ideas" className="flex flex-col items-center p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="text-xs mt-1">想法</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center p-2 text-blue-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-xs mt-1">分类</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
