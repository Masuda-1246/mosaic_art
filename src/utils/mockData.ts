import { TileInfo } from '../types';

// ユーザーアバターのプレースホルダーとして Unsplash の人物画像を使用
const AVATAR_URLS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
];

const SAMPLE_MESSAGES = [
  'この写真は去年の夏休みに撮影しました！',
  '素敵な思い出になりました✨',
  'みんなでワイワイ楽しかった！また行きたいな〜',
  '初めての挑戦でしたが、良い経験になりました',
];

const SAMPLE_NAMES = [
  '田中さくら',
  '山田太郎',
  '佐藤美咲',
  '鈴木健一',
];

export const enrichTileData = (tiles: TileInfo[]): TileInfo[] => {
  return tiles.map(tile => ({
    ...tile,
    author: {
      name: SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)],
      avatar: `${AVATAR_URLS[Math.floor(Math.random() * AVATAR_URLS.length)]}?w=100&h=100&fit=crop`,
    },
    message: SAMPLE_MESSAGES[Math.floor(Math.random() * SAMPLE_MESSAGES.length)],
  }));
};