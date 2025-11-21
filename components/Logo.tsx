import Image from 'next/image'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = '', width = 120, height = 40 }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/images/libertino-logo.png"
        alt="Libertino Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
        onError={(e) => {
          // Fallback if logo doesn't exist
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
        }}
      />
    </div>
  )
}


