'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Idea, Category } from '@/types';
import { getIdeas, getCategories, deleteIdea, searchIdeas } from '@/lib/storage';
import IdeaList from '@/components/IdeaList';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setCategories(getCategories());
  }, [refreshKey]);

  useEffect(() => {
    if (searchKeyword) {
      setIdeas(searchIdeas(searchKeyword));
    } else {
      setIdeas(getIdeas());
    }
  }, [searchKeyword, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(k => k + 1);
  };

  const handleDelete = (id: string) => {
    deleteIdea(id);
    handleRefresh();
  };

  const filteredIdeas = selectedCategory === 'all' 
    ? ideas 
    : ideas.filter(i => i.categoryId === selectedCategory);

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
          <h1 className="text-xl font-bold text-gray-800">📂 SparkBox</h1>
          <div className="w-10" />
        </div>

        {/* 搜索框 */}
        <div className="max-w-lg mx-auto mt-3">
          <div className="relative">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜索想法..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="max-w-lg mx-auto mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
              selectedCategory === 'all' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === cat.id 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
              style={{ 
                backgroundColor: selectedCategory === cat.id ? cat.color : '#f3f4f6',
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4">
        <IdeaList ideas={filteredIdeas} categories={categories} onDelete={handleDelete} />
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-lg mx-auto flex justify-around py-2">
          <Link href="/" className="flex flex-col items-center p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            <span className="text-xs mt-1">首页</span>
          </Link>
          <Link href="/ideas" className="flex flex-col items-center p-2 text-blue-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="text-xs mt-1">想法</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center p-2 text-gray-400">
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
