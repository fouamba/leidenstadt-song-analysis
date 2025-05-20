
import React from "react";

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  className = "",
}) => {
  // S'assurer que la progression est entre 0 et 100
  const validProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${validProgress}%` }}
        ></div>
      </div>
      <div className="text-xs text-slate-500 mt-1 text-right">{Math.round(validProgress)}%</div>
    </div>
  );
};
