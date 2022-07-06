import styled from 'styled-components';
import { useThemeContext } from 'app/components/common/themeContext';

export interface ToggleProps {
  theme?: any;
  toggleTheme?: any;
}

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
`;
const Toggle = () => {
  const { theme, setTheme } = useThemeContext();
  const swapTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return <Button onClick={swapTheme}>Switch Theme</Button>;
};
export default Toggle;
