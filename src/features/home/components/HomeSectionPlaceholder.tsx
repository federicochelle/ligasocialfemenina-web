import { PlaceholderBlock } from '../../../components/placeholders/PlaceholderBlock'

type HomeSectionPlaceholderProps = {
  title: string
}

export function HomeSectionPlaceholder({
  title,
}: HomeSectionPlaceholderProps) {
  return (
    <PlaceholderBlock
      title={title}
      description="Cargando informacion real de la liga."
      variant="grid"
      lines={4}
    />
  )
}
