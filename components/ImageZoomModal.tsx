import React, { useEffect } from 'react';

interface ImageZoomModalProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({ src, alt, onClose }) => {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full max-h-[90vh] flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt || ''}
          className="rounded-lg shadow-2xl max-h-[80vh] max-w-full object-contain"
        />
        <button
          className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-40 rounded-full px-2 py-1 hover:bg-opacity-70 transition"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageZoomModal; 