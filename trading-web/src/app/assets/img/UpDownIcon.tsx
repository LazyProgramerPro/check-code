export interface SvgIconsProps {
  name: 'up' | 'down';
  className?: string;
}

export default function SvgIcons(props: SvgIconsProps) {
  const { name, className } = props;

  switch (name) {
    case 'up': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={className}
        >
          <path d="M8 15.24v-2L12.24 9l4.24 4.24v2H8z"></path>
        </svg>
      );
    }
    case 'down': {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={className}
        >
          <path d="M16 9v2l-4 4.24L8 11V9h8z"></path>
        </svg>
      );
    }
    default: {
      return <></>;
    }
  }
}
