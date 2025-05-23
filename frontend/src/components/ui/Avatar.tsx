import React from 'react';

export const Avatar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props} />
);

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className = '', ...props }) => (
  <img className={`aspect-square h-full w-full ${className}`} {...props} />
);

export const AvatarFallback: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className = '', ...props }) => (
  <span className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props} />
); 