export interface SvgIconsProps {
  name: 'show' | 'unshow';
  className?: string;
}

export default function SvgIcons(props: SvgIconsProps) {
  const { name, className } = props;

  switch (name) {
    case 'show': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            d="M18.076 7.395c-3.083-3.193-8.059-3.193-11.142 0L3 11.44l3.934 4.16c3.073 3.193 8.049 3.203 11.132.01l.01-.01L22 11.44l-3.924-4.045zm-1.422 6.697a5.724 5.724 0 01-8.308 0L5.833 11.44l2.513-2.579c2.302-2.371 6.006-2.371 8.308 0l2.513 2.58-2.513 2.651z"
            fill="currentColor"
          ></path>
          <path
            d="M14.732 11.44c.02 1.28-.96 2.34-2.192 2.361-1.231.02-2.252-.998-2.272-2.278-.02-1.279.96-2.34 2.192-2.36h.04v2.277h2.232z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'unshow': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            d="M13.03 15.652l1.712 1.71c-.73.219-1.481.329-2.242.329a7.92 7.92 0 01-5.576-2.299L3 11.505l2.913-2.948 2.393 2.378c-.02.18-.02.35 0 .53a4.23 4.23 0 004.194 4.227c.18 0 .35-.01.53-.04zM22 11.505l-3.934-3.997A7.842 7.842 0 0012.5 5.239c-.76 0-1.511.11-2.242.33l1.712 1.699c.18-.01.35-.01.53 0a4.232 4.232 0 014.235 4.227c0 .78-.21 1.539-.621 2.199L6.434 4 5.022 5.42l11.292 11.272.71.71L18.638 19l1.411-1.41-2.102-2.088L22 11.505z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    default: {
      return <></>;
    }
  }
}
