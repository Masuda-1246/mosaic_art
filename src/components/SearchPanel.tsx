import React from 'react';
import { Search } from 'lucide-react';
import { useMosaicStore } from '../store';

export const SearchPanel: React.FC = () => {
  const { tiles, searchQuery, setSearchQuery, setHighlightedTile } = useMosaicStore();

  const filteredTiles = tiles.filter(tile => 
    tile.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tile.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search messages or authors..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="mt-4 max-h-96 overflow-y-auto">
        {searchQuery && filteredTiles.map((tile, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => setHighlightedTile(tile.image)}
            onMouseEnter={() => setHighlightedTile(tile.image)}
            onMouseLeave={() => setHighlightedTile(null)}
          >
            <img
              src={tile.author?.avatar}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{tile.author?.name}</p>
              <p className="text-sm text-gray-600 truncate">{tile.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};