export interface SvgIconsProps {
  name: 'buyorder' | 'orderbook' | 'sellorder';
  className?: string;
  style?: React.CSSProperties;
}

export default function SvgIcons(props: SvgIconsProps) {
  const { name, className, style } = props;

  switch (name) {
    case 'buyorder': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 21V3H3v18h8zm-6-2V5h4v14H5z"
            fill="#2EBD85"
          ></path>
          <path
            fill="currentColor"
            d="M13 3h8v2h-8zM13 19h8v2h-8zM13 11h8v2h-8v-2zM13 7h8v2h-8V7zM13 15h8v2h-8v-2z"
          ></path>
        </svg>
      );
    }
    case 'orderbook': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 21v-8H3v8h8zm-6-2v-4h4v4H5z"
            fill="#2EBD85"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 11V3H3v8h8zM5 9V5h4v4H5z"
            fill="#F6465D"
          ></path>
          <path
            fill="currentColor"
            d="M13 3h8v2h-8zM13 19h8v2h-8zM13 11h8v2h-8v-2zM13 7h8v2h-8V7zM13 15h8v2h-8v-2z"
          ></path>
        </svg>
      );
    }
    case 'sellorder': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 21V3H3v18h8zm-6-2V5h4v14H5z"
            fill="#F6465D"
          ></path>
          <path
            fill="currentColor"
            d="M13 3h8v2h-8zM13 19h8v2h-8zM13 11h8v2h-8v-2zM13 7h8v2h-8V7zM13 15h8v2h-8v-2z"
          ></path>
        </svg>
      );
    }

    default: {
      return <></>;
    }
  }
}
