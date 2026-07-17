import { Link } from 'react-router-dom'

type SectionActionProps = {
  to: string
  label: string
}

export function SectionAction({ to, label }: SectionActionProps) {
  return (
    <Link
      to={to}
      className="inline-flex w-fit items-center justify-center rounded-full bg-[rgba(11,27,69,0.06)] px-[1.2rem] py-[0.88rem] font-extrabold text-[var(--color-primary)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px focus-visible:-translate-y-px"
    >
      {label}
    </Link>
  )
}
