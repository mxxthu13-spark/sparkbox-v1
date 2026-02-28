'use client';

import { Idea, Category } from '@/types';
import { formatTime } from '@/lib/storage';

export default function IdeaList({ 
  ideas, 
  categories,
  onDelete 
}: { 
  ideas: Idea[];
  categories: Category[];
  onDelete: (id: string) => void;
}) {
  const getCategory = (categoryId: string) => {
    return categories.find(c => c.id === categoryId);
  };

  if (ideas.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">💭</p>
        <p>还没有想法，快记录一个吧</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {ideas.map((idea) => {
        const category = getCategory(idea.categoryId);
        return (
          <div
            key={idea.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 group"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <p className="text-gray-800 leading-relaxed">{idea.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  {category && (
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: category.color + '15', color: category.color }}
                    >
                      {category.icon} {category.name}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {formatTime(idea.createdAt)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onDelete(idea.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
