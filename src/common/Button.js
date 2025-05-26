import styled from 'styled-components';
import { colors } from 'theme';

export const Button = ({ color = colors.accent, children, ...props }) => {
  return (
    <StyledButton color={color} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover,
  &:focus {
    background-color: ${(props) => props.color};
    color: white;
    outline: none;
  }
`;
