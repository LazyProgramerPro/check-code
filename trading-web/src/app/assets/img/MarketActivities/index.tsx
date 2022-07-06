export interface SvgIconsProps {
  name?: 'detail';
  className?: string;
  style?: React.CSSProperties;
}

export default function SvgIcons(props: SvgIconsProps) {
  const { name, className, style } = props;

  switch (name) {
    case 'detail': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          style={style}
        >
          <path
            d="M9 7.143L11.857 10l2.857-2.857 1.143 1.143-4 4-4-4L9 7.143z"
            fill="currentColor"
          ></path>
          <path
            d="M9 11.714l2.857 2.857 2.857-2.857 1.143 1.143-4 4-4-4L9 11.714z"
            fill="currentColor"
          ></path>
        </svg>
      );
    }
    // case 'down': {
    //   return (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       className={className}
    //       style={style}
    //     >
    //       <path
    //         d="M9 7.143L11.857 10l2.857-2.857 1.143 1.143-4 4-4-4L9 7.143z"
    //         fill="currentColor"
    //       ></path>
    //       <path
    //         d="M9 11.714l2.857 2.857 2.857-2.857 1.143 1.143-4 4-4-4L9 11.714z"
    //         fill="currentColor"
    //       ></path>
    //     </svg>
    //   );
    // }

    default: {
      return <></>;
    }
  }
}
