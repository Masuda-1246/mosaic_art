import React, { useEffect, useCallback } from 'react';
import { X, MessageCircle, Calendar } from 'lucide-react';
import { useMosaicStore } from '../store';

export const TileModal: React.FC = () => {
  const { selectedTile, setSelectedTile } = useMosaicStore();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedTile(null);
    }
  }, [setSelectedTile]);

  useEffect(() => {
    if (selectedTile) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedTile, handleKeyDown]);

  if (!selectedTile) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedTile(null);
      }}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full mx-auto overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-3">
            {selectedTile.author?.avatar && (
              <img
                src={selectedTile.author.avatar}
                alt=""
                className="w-12 h-12 rounded-full border-2 border-gray-200 shadow-sm"
              />
            )}
            <div>
              <h3 className="font-medium text-lg">{selectedTile.author?.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar size={14} />
                {new Date().toLocaleDateString('ja-JP')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTile(null)}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={selectedTile.image}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          {selectedTile.message && (
            <div className="mt-6">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <MessageCircle size={20} />
                <h4 className="font-medium">メッセージ</h4>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-4 rounded-lg">
                {selectedTile.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};