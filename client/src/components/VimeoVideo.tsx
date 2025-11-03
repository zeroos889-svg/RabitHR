interface VimeoVideoProps {
  videoId: string;
  title?: string;
  className?: string;
}

/**
 * Component لعرض فيديو Vimeo
 * استخدام: <VimeoVideo videoId="123456789" />
 */
export function VimeoVideo({ videoId, title = 'Vimeo Video', className = '' }: VimeoVideoProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-lg shadow-lg ${className}`}>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?h=&title=0&byline=0&portrait=0`}
          title={title}
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
