export interface SvgIconsProps {
  name: 'detail' | 'up' | 'down';
  className?: string;
}

export default function SvgIcons(props: SvgIconsProps) {
  const { name, className } = props;

  switch (name) {
    case 'detail': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={className}
        >
          <path
            d="M9 10.368v-1.4L11.968 6l2.968 2.968v1.4H9zM14.936 13v1.4l-2.968 2.968L9 14.4V13h5.936z"
            fill="#C1C6CD"
          ></path>
        </svg>
      );
    }
    case 'up': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            opacity="0.5"
            d="M16 12.85v1.65L12.75 18 9.5 14.5v-1.65H16z"
            fill="#848E9C"
          ></path>
          <path
            d="M9.5 9.745v-1.65l3.25-3.5 3.25 3.5v1.65H9.5z"
            fill="url(#sorting-up-color-s24_svg__paint0_linear)"
          ></path>
          <defs>
            <linearGradient
              id="sorting-up-color-s24_svg__paint0_linear"
              x1="16"
              y1="4.594"
              x2="9.5"
              y2="4.594"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EFB80B"></stop>
              <stop offset="1" stopColor="#FBDA3C"></stop>
            </linearGradient>
          </defs>
        </svg>
      );
    }
    case 'down': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            opacity="0.5"
            d="M9 10.153V8.5L12.25 5l3.25 3.501v1.652H9z"
            fill="#848E9C"
          ></path>
          <path
            d="M15.5 13.257v1.652l-3.25 3.5L9 14.91v-1.652h6.5z"
            fill="url(#sorting-down-color-s24_svg__paint0_linear)"
          ></path>
          <defs>
            <linearGradient
              id="sorting-down-color-s24_svg__paint0_linear"
              x1="9"
              y1="18.41"
              x2="15.5"
              y2="18.41"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EFB80B"></stop>
              <stop offset="1" stopColor="#FBDA3C"></stop>
            </linearGradient>
          </defs>
        </svg>
      );
    }

    default: {
      return <></>;
    }
  }
}
