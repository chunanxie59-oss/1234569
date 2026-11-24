import {useState} from 'react';
import {CarFront} from 'lucide-react';

interface ResilientCarImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
}

export function ResilientCarImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientCarImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#161820] to-[#0D0E13] p-6 text-center ${className}`}
      >
        <CarFront className="h-10 w-10 text-[#E11D2E]" aria-hidden="true" />
        <p className="font-display text-lg font-bold text-[#F4F4F5]">{fallbackTitle}</p>
        <p className="text-xs text-[#A1A1AA]">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
