export interface SvgIconsProps {
  name:
    | 'alert'
    | 'next'
    | 'prev'
    | 'change'
    | 'connect'
    | 'docs'
    | 'download'
    | 'information'
    | 'lock'
    | 'more'
    | 'openIcon'
    | 'nextArrow'
    | 'play'
    | 'search'
    | 'star'
    | 'wallet'
    | 'documents'
    | 'menuUnfold'
    | 'menuFold'
    | 'copy'
    | 'QR';
  className?: string;
  style?: React.CSSProperties;
  onClick?: any;
}

export default function SvgIcons(props: SvgIconsProps) {
  const { name, className, style, onClick } = props;

  switch (name) {
    case 'alert': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            d="M12.867 18.47l5.13-.94L15.517 4l-5.18.95-3.25 3.94-4.85.89.5 2.71-1.97.36.36 1.97 1.97-.36.44 2.42 1.97-.36.79 4.28 1.97-.36-.79-4.28.98-.18 4.41 2.49zm-5.76-4.28l-1.97.36-.58-3.17 3.61-.66 3.25-3.92 2.5-.46 1.76 9.59-2.46.45-4.4-2.51-1.71.32zM22.871 8.792l-2.99.55.362 1.967 2.99-.55-.362-1.967zM19.937 13.183l-1.135 1.647 2.503 1.725 1.135-1.646-2.503-1.726zM19.006 4.052l-1.725 2.503 1.646 1.135 1.726-2.503-1.647-1.135z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'next': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            d="M13.5 12L7 18.6 8.4 20l8-8-8-8L7 5.4l6.5 6.6z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'prev': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            d="M16.414 18.586L15 20l-8-8 8-8 1.414 1.414L9.828 12l6.586 6.586z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'change': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            d="M9.1 13.11L3.88 7.89l1.41-1.41 3.82-3.82 1.41 1.41L7.7 6.89h11.78v2H7.7l2.81 2.8-1.41 1.42zM14.88 10.89l5.21 5.22-1.41 1.41-3.81 3.82-1.41-1.41 2.82-2.82H4.5v-2h11.78l-2.81-2.8 1.41-1.42z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'connect': {
      return (
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          onClick={onClick}
        >
          <rect y="9.667" width="1.67" height="2.5" fill="#0ECB81"></rect>
          <rect
            x="4.44446"
            y="5.667"
            width="1.66667"
            height="6.67"
            fill="#0ECB81"
          ></rect>
          <rect
            x="8.88892"
            y="3"
            width="1.66667"
            height="10.83"
            fill="#0ECB81"
          ></rect>
          <rect x="13.3333" width="1.66667" height="15" fill="#0ECB81"></rect>
        </svg>
      );
    }
    case 'docs': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path d="M6 8h12v2H6V8zM6 12h7v2H6v-2z" fill="#76808F"></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 3v16h4v4h2.414l4-4H22V3H2zm7.586 16l2-2H20V5H4v12h4v3.586L9.586 19z"
            fill="#76808F"
          ></path>
        </svg>
      );
    }
    case 'download': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            d="M7 11H5V2h14v9h-2V4H7v7zM5 22v-6h2v4h10v-4h2v6H5z"
            fill="#76808F"
          ></path>
          <path
            d="M15.586 12.086L17 13.5l-5 5-5-5 1.414-1.414L11 14.672V6h2v8.671l2.586-2.585z"
            fill="#76808F"
          ></path>
        </svg>
      );
    }
    case 'information': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path d="M13 8V6h-2v2h2zM13 18v-8h-2v8h2z" fill="currentColor"></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10zm-2 0a8 8 0 10-16 0 8 8 0 0016 0z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'lock': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            d="M16.27 10.5V8.07C16.27 5.82 14.45 4 12.2 4S8.13 5.82 8.13 8.07v2.43H6v8.94h12.43V10.5h-2.16zm-3.07 6.46h-2v-4h2v4zm1.07-6.46h-4.14V8.07c0-1.14.93-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07v2.43z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'more': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            d="M10.5 20v-3h3v3h-3zM10.5 7V4h3v3h-3zM10.5 10.5v3h3v-3h-3z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'openIcon': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            d="M15.11 5.63L6 6.89 15.11 4v1.63zM17.61 6.89v11.2h-1.25V8.33L6 6.89h11.61z"
            fill="currentColor"
          ></path>
          <path
            d="M6 6.89v11.16l.1.01.07.01.17.03h-.27l9.04 2.86V9.77L6 6.89zm3.4 3.2l1.87.6v1.84l-1.87-.59v-1.85zm1.87 7.66l-1.87-.59.03-3.85 1.88.59-.04 3.85z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'nextArrow': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21 11.999l-7.071-7.071-1.768 1.768 4.055 4.054H2.999v2.5h13.216l-4.054 4.053 1.768 1.768L21 12v-.001z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'play': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            d="M12 3.35c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8s8.8-3.9 8.8-8.8c0-4.8-4-8.8-8.8-8.8zm0 15.6c-3.7 0-6.8-3-6.8-6.8 0-3.7 3-6.8 6.8-6.8s6.8 3 6.8 6.8c0 3.7-3.1 6.8-6.8 6.8z"
            fill="currentColor"
          ></path>
          <path
            d="M16.5 12.15l-6.8-3.9v7.8l6.8-3.9z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'search': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            d="M3 10.982c0 3.845 3.137 6.982 6.982 6.982 1.518 0 3.036-.506 4.149-1.416L18.583 21 20 19.583l-4.452-4.452c.81-1.113 1.416-2.631 1.416-4.149 0-1.922-.81-3.643-2.023-4.958C13.726 4.81 11.905 4 9.982 4 6.137 4 3 7.137 3 10.982zM13.423 7.44a4.819 4.819 0 011.416 3.441c0 1.315-.506 2.53-1.416 3.44a4.819 4.819 0 01-3.44 1.417 4.819 4.819 0 01-3.441-1.417c-1.012-.81-1.518-2.023-1.518-3.339 0-1.315.506-2.53 1.416-3.44.911-1.012 2.227-1.518 3.542-1.518 1.316 0 2.53.506 3.44 1.416z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'star': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.06 1.579l1.811-.008 2.736 5.765 6.046.937.563 1.686-4.415 4.526 1.015 6.357-1.473 1.032-5.375-2.987-5.375 2.987-1.472-1.04 1.074-6.353-4.41-4.522.562-1.686 6.04-.936 2.674-5.758z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'wallet': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.06 1.579l1.811-.008 2.736 5.765 6.046.937.563 1.686-4.415 4.526 1.015 6.357-1.473 1.032-5.375-2.987-5.375 2.987-1.472-1.04 1.074-6.353-4.41-4.522.562-1.686 6.04-.936 2.674-5.758z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'documents': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 3v18h14V7l-4-4H5zm3 6.5h8V12H8V9.5zm0 5h8V17H8v-2.5z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'menuUnfold': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 4h3v3H4V4zm0 13h3v3H4v-3zm0-6.5h3v3H4v-3zM10 4h10v3H10V4zm0 13h10v3H10v-3zm0-6.5h10v3H10v-3z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'menuFold': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 4v7h7V4H4zm9 7V4h7v7h-7zm3.5 9.743L12.257 16.5l4.243-4.243 4.243 4.243-4.243 4.243zM4 13h7v7H4v-7z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'copy': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    case 'QR': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
          onClick={onClick}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm11 0h-2v4h4v-2h3v-2h-4v2h-1v-2zm5 3h-2v2h-2v2h4v-4zm-5 2h-2v2h2v-2zM13 4h7v7h-7V4zM8.5 6.5h-2v2h2v-2zm-2 9h2v2h-2v-2zm11-9h-2v2h2v-2z"
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
