import styled from 'styled-components';

export const TextInput = ({
  value = '',
  onChange,
  placeholder = 'Введите текст',
  ...props
}) => {
  return (
    <InputContainer {...props}>
      <StyledInput
        value={value}
        placeholder={placeholder}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={(e) => onChange(e.target.value)}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  position: relative;
`;

const StyledInput = styled.input`
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.colors.accent};
  border-radius: 8px;
  transition: all 0.3s;
  background-color: ${(props) => props.theme.colors.main};
  font-size: 16px;
  color: ${(props) => props.theme.colors.default2};

  &:hover,
  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.lightMain};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.tertiary};
  }
`;
