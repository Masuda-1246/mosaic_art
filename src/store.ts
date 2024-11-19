import { create } from 'zustand';
import { TileInfo, MosaicState } from './types';

export const useMosaicStore = create<MosaicState>((set) => ({
  tiles: [],
  selectedTile: null,
  searchQuery: '',
  highlightedTile: null,
  setTiles: (tiles) => set({ tiles }),
  setSelectedTile: (tile) => set({ selectedTile: tile }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setHighlightedTile: (image) => set({ highlightedTile: image }),
}));