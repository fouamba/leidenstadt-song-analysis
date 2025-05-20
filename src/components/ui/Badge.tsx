
import React from "react";
import { Badge as BadgeType } from "../../models/types";

interface BadgeProps {
  badge: BadgeType;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ badge, className = "" }) => {
  return (
    <div
      className={`relative rounded-lg p-4 transition-all ${
        badge.unlocked
          ? "bg-white shadow-md border border-primary/20"
          : "bg-slate-100 border border-slate-200"
      } ${className}`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              badge.unlocked ? "" : "grayscale opacity-50"
            }`}
          >
            {badge.imageUrl ? (
              <img
                src={badge.imageUrl}
                alt={badge.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
            )}
          </div>
          {badge.unlocked && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3
            className={`font-medium ${
              badge.unlocked ? "text-slate-900" : "text-slate-500"
            }`}
          >
            {badge.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{badge.description}</p>
          {!badge.unlocked && badge.progress > 0 && (
            <div className="mt-2">
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary/60 rounded-full"
                  style={{ width: `${badge.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {Math.round(badge.progress)}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
