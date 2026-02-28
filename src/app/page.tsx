'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Idea, Category } from '@/types';
import { getIdeas, getCategories, deleteIdea } from '@/lib/storage';
import IdeaInput from '@/components/IdeaInput';
import IdeaList from '@/components/IdeaList';

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setIdeas(getIdeas());
    setCategories(getCategories());
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(k => k + 1);
  };

  const handleDelete = (id: string) => {
    deleteIdea(id);
    handleRefresh();
  };

  // 获取今日想法
  const todayIdeas = ideas.filter(i => {
    const today = new Date();
    const ideaDate = new Date(i.createdAt);
    return ideaDate.toDateString() === today.toDateString();
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部 */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">✨ SparkBox</h1>
          <Link 
            href="/categories"
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-6">
        {/* 记录输入 */}
        <IdeaInput categories={categories} onSaved={handleRefresh} />

        {/* 今日想法 */}
        {todayIdeas.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-3">今日想法 ({todayIdeas.length})</h2>
            <IdeaList ideas={todayIdeas} categories={categories} onDelete={handleDelete} />
          </div>
        )}

        {/* 最近想法 */}
        {ideas.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-3">全部想法 ({ideas.length})</h2>
            <IdeaList ideas={ideas} categories={categories} onDelete={handleDelete} />
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-lg mx-auto flex justify-around py-2">
          <Link href="/" className="flex flex-col items-center p-2 text-blue-500">
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
