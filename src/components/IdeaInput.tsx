'use client';

import { useState, useEffect } from 'react';
import { Idea, Category } from '@/types';
import { getIdeas, saveIdea, deleteIdea, getCategories, formatTime } from '@/lib/storage';

export default function IdeaInput({ 
  categories, 
  onSaved 
}: { 
  categories: Category[]; 
  onSaved: () => void;
}) {
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    saveIdea(content.trim(), categoryId);
    setContent('');
    setIsExpanded(false);
    onSaved();
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-left text-gray-400 hover:shadow-md transition-all"
      >
        ✏️ 记录一个想法...
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-4 space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="在这里输入你的想法..."
        className="w-full p-3 bg-gray-50 rounded-xl border-0 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows={3}
        autoFocus
      />
      
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategoryId(cat.id)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              categoryId === cat.id
                ? 'ring-2 ring-offset-1'
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{ 
              backgroundColor: categoryId === cat.id ? cat.color + '20' : '#f3f4f6',
              color: categoryId === cat.id ? cat.color : '#6b7280',
              ['--tw-ring-color' as any]: categoryId === cat.id ? cat.color : 'transparent'
            }}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          保存
        </button>
      </div>
    </form>
  );
}
