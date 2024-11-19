export interface TileInfo {
  x: number;
  y: number;
  width: number;
  height: number;
  image: string;
  message?: string;
  author?: {
    name: string;
    avatar: string;
  };
}

export interface MosaicState {
  tiles: TileInfo[];
  selectedTile: TileInfo | null;
  searchQuery: string;
  highlightedTile: string | null;
  setTiles: (tiles: TileInfo[]) => void;
  setSelectedTile: (tile: TileInfo | null) => void;
  setSearchQuery: (query: string) => void;
  setHighlightedTile: (image: string | null) => void;
}