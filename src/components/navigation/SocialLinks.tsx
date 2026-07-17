import { socialLinks as socialLinkUrls } from '../../constants/socialLinks'

const socialLinks = [
  {
    href: socialLinkUrls.instagram,
    label: 'Instagram',
    icon: (
      <path d="M7 2.75h10A4.25 4.25 0 0 1 21.25 7v10A4.25 4.25 0 0 1 17 21.25H7A4.25 4.25 0 0 1 2.75 17V7A4.25 4.25 0 0 1 7 2.75Zm9.85 1.5H7A2.75 2.75 0 0 0 4.25 7v10A2.75 2.75 0 0 0 7 19.75h10A2.75 2.75 0 0 0 19.75 17V7A2.75 2.75 0 0 0 17 4.25h-.15Zm-4.85 2.5A5.25 5.25 0 1 1 6.75 12 5.26 5.26 0 0 1 12 6.75Zm0 1.5A3.75 3.75 0 1 0 15.75 12 3.75 3.75 0 0 0 12 8.25Zm5.75-2.13a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13Z" />
    ),
  },
  {
    href: socialLinkUrls.whatsapp,
    label: 'WhatsApp',
    icon: (
      <path d="M12 2.75A9.25 9.25 0 0 0 4.1 16.84L2.75 21.25l4.55-1.31A9.25 9.25 0 1 0 12 2.75Zm0 1.5a7.75 7.75 0 0 1 6.66 11.71l-.17.27.8 2.63-2.71-.78-.26.16A7.75 7.75 0 1 1 12 4.25Zm-3.1 3.2c-.2 0-.43.01-.65.23-.22.22-.84.82-.84 1.99s.86 2.31.98 2.46c.12.16 1.69 2.71 4.18 3.69 2.07.81 2.49.65 2.94.61.45-.04 1.45-.59 1.66-1.17.21-.57.21-1.06.15-1.16-.06-.1-.22-.16-.46-.28s-1.45-.72-1.67-.8c-.22-.08-.38-.12-.55.12-.16.24-.63.8-.77.97-.14.16-.29.18-.53.06-.24-.12-1.03-.38-1.96-1.22-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.1-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.4-.55-.41h-.47Z" />
    ),
  },
] as const

type SocialLinksProps = {
  className?: string
  linkClassName?: string
  iconClassName?: string
}

export function SocialLinks({
  className,
  linkClassName,
  iconClassName,
}: SocialLinksProps) {
  return (
    <div className={className}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={linkClassName}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={iconClassName} aria-hidden="true">
            {link.icon}
          </svg>
        </a>
      ))}
    </div>
  )
}
