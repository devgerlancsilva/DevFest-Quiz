import React from 'react';
import { RankTier } from '../types';

export const Badge: React.FC<{ tier: RankTier; size?: 'sm' | 'lg' }> = ({ tier, size = 'sm' }) => {
  const getColors = () => {
    switch (tier) {
      case 'DevFest Champion':
        return 'bg-gradient-to-r from-google-yellow via-orange-400 to-google-red text-white border-yellow-500';
      case 'DevFest Ninja':
        return 'bg-slate-800 text-white border-slate-600';
      case 'DevFest Smart':
        return 'bg-google-blue text-white border-blue-600';
      case 'DevFest Init':
      default:
        return 'bg-gray-200 text-gray-700 border-gray-300';
    }
  };

  const getIcon = () => {
    switch (tier) {
      case 'DevFest Champion': return '🏆';
      case 'DevFest Ninja': return '⚡';
      case 'DevFest Smart': return '🧠';
      case 'DevFest Init': return '🌱';
    }
  };

  const baseClasses = "rounded-full font-bold flex items-center justify-center border shadow-sm";
  const sizeClasses = size === 'lg' 
    ? "px-6 py-2 text-xl gap-2" 
    : "px-3 py-1 text-xs gap-1";

  return (
    <div className={`${baseClasses} ${sizeClasses} ${getColors()}`}>
      <span>{getIcon()}</span>
      <span>{tier}</span>
    </div>
  );
};