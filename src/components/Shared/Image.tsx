import { FC, HTMLProps, useEffect, useRef, useState } from 'react';

interface ImageProps {
  opacity?: number;
  src: string;
}

const Image: FC<HTMLProps<HTMLImageElement> & ImageProps> = ({
  style,
  crossOrigin: _,
  opacity = 1,
  src,
  ...others
}) => {
  const [loaded, setLoaded] = useState(false);
  const [realSrc, setRealSrc] = useState('');

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handler = () => {
      setLoaded(true);
    };

    imageRef.current?.addEventListener('load', handler);

    setRealSrc(src);

    return () => imageRef.current?.removeEventListener('load', handler);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imageRef}
      style={{
        ...style,
        transition: '0.5s',
        opacity: loaded ? opacity : 0,
      }}
      alt=""
      src={realSrc}
      {...others}
    />
  );
};

export default Image;
