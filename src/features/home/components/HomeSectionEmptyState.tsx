type HomeSectionEmptyStateProps = {
  message: string
}

export function HomeSectionEmptyState({ message }: HomeSectionEmptyStateProps) {
  return <p className="text-[var(--color-text-muted)] font-semibold">{message}</p>
}
