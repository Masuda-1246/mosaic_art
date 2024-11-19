import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useMosaicStore } from '../store';
import { TileInfo } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const CANVAS_SCALE = 1;
const MOVE_STEP = 100;
const ZOOM_STEP = 0.5;

export const MosaicViewer: React.FC = () => {
  const { tiles, setSelectedTile } = useMosaicStore();

  const handleTileClick = (tile: TileInfo) => {
    setSelectedTile(tile);
  };

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right', instance: any) => {
    const { positionX, positionY, scale } = instance.transformState;
    const step = MOVE_STEP / scale;

    const moves = {
      up: { x: positionX, y: positionY + step },
      down: { x: positionX, y: positionY - step },
      left: { x: positionX + step, y: positionY },
      right: { x: positionX - step, y: positionY }
    };

    const { x, y } = moves[direction];
    instance.setTransform(x, y, scale);
  };

  return (
    <TransformWrapper
      initialScale={0.1}
      minScale={0.1}
      maxScale={4}
      wheel={{ disabled: true }}
      panning={{ activationKeys: [] }}
      limitToBounds={false}
      centerZoomedOut={true}
      centerOnInit={true}
    >
      {({ zoomIn, zoomOut, resetTransform, instance }) => (
        <div className="relative w-full h-full bg-gray-50">
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => zoomIn(ZOOM_STEP)}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="拡大"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => zoomOut(ZOOM_STEP)}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="縮小"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={() => resetTransform()}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="リセット"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="grid grid-cols-3 gap-1">
              <div></div>
              <button
                onClick={() => handleMove('up', instance)}
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowUp size={20} />
              </button>
              <div></div>
              <button
                onClick={() => handleMove('left', instance)}
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div></div>
              <button
                onClick={() => handleMove('right', instance)}
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowRight size={20} />
              </button>
              <div></div>
              <button
                onClick={() => handleMove('down', instance)}
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowDown size={20} />
              </button>
              <div></div>
            </div>
          </div>

          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%", cursor: 'grab' }}
            contentStyle={{ cursor: 'grab' }}
          >
            <div 
              className="relative bg-white"
              style={{ 
                width: '8000px', 
                height: '8000px',
                backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
            >
              {tiles.map((tile, index) => (
                <div
                  key={index}
                  className="absolute cursor-pointer transition-all duration-200 hover:shadow-lg"
                  style={{
                    left: tile.x * CANVAS_SCALE,
                    top: tile.y * CANVAS_SCALE,
                    width: tile.width * CANVAS_SCALE,
                    height: tile.height * CANVAS_SCALE,
                  }}
                  onClick={() => handleTileClick(tile)}
                >
                  <img
                    src={tile.image}
                    alt=""
                    className="w-full h-full object-cover rounded-sm"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};