declare module 'next/image' {
  import * as React from 'react';
  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | { src: string; width: number; height: number; blurDataURL?: string };
    alt: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
  }
  const Image: React.ComponentType<ImageProps>;
  export default Image;
}
