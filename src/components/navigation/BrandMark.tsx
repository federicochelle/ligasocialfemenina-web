import logo from '../../../logo.webp'

type BrandMarkProps = {
  className?: string
  imageClassName?: string
}

export function BrandMark({ className, imageClassName }: BrandMarkProps) {
  return (
    <span className={className}>
      <img
        src={logo}
        alt="Liga Social Femenina de Basquetbol"
        className={imageClassName}
      />
    </span>
  )
}
