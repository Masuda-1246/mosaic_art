import React, { useEffect } from 'react';
import { MosaicViewer } from './components/MosaicViewer';
import { TileModal } from './components/TileModal';
import { useMosaicStore } from './store';
import { enrichTileData } from './utils/mockData';

function App() {
  const { setTiles } = useMosaicStore();

  useEffect(() => {
    const loadTileInfo = async () => {
      try {
        const response = await fetch('/tile_info.json');
        const data = await response.json();
        const enrichedData = enrichTileData(data);
        setTiles(enrichedData);
      } catch (error) {
        console.error('Error loading tile info:', error);
      }
    };

    loadTileInfo();
  }, [setTiles]);

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="flex-1 relative overflow-hidden">
        <MosaicViewer />
      </div>
      <TileModal />
    </div>
  );
}

export default App;