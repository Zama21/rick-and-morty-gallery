import styled from 'styled-components';
import { ReactComponent as Chevron } from 'assets/chevronDown.svg';
import { ReactComponent as Cross } from 'assets/crossIcon.svg';
import { useCallback } from 'react';

export const HeaderSelect = ({
  placeholder,
  setIsOpen,
  isOpen,
  onChange,
  value
}) => {
  const handleInputClick = useCallback(
    (event) => {
      if (
        event.type === 'click' ||
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  const handleInputClear = useCallback(
    (event) => {
      if (
        event.type === 'click' ||
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();
        onChange('');
      }
    },
    [onChange]
  );

  return (
    <SelectHeader>
      <InputField
        value={value}
        placeholder={placeholder}
        onClick={handleInputClick}
        onKeyDown={handleInputClick}
        readOnly
      />
      {!value && (
        <Icon
          onClick={handleInputClick}
          onKeyDown={handleInputClick}
          $isActive={isOpen}
        />
      )}
      {value && (
        <CrossIcon
          onClick={handleInputClear}
          onKeyDown={handleInputClear}
          tabIndex={0}
        />
      )}
    </SelectHeader>
  );
};

const SelectHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const InputField = styled.input`
  cursor: text;
  padding: 12px 12px 12px 16px;
  border: 1px solid ${(props) => props.theme.colors.accent};
  border-radius: 8px;
  transition: all 0.3s;
  background-color: ${(props) => props.theme.colors.main};
  font-size: 16px;
  color: ${(props) => props.theme.colors.default2};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover,
  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.lightMain};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.tertiary};
  }
`;

const BaseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0;
  margin: 0 10px;
  color: ${(props) =>
    props.$isActive ? '#FFFFFF' : props.theme.colors.tertiary};
  transition: all 0.3s;
`;

const Icon = styled(BaseIcon).attrs({ as: Chevron })`
  transform: ${(props) =>
    props.$isActive ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const CrossIcon = styled(BaseIcon).attrs({ as: Cross })`
  color: ${(props) => props.theme.colors.tertiary};

  &:hover,
  &:focus {
    color: rgba(131, 191, 70, 1);
    outline: none;
  }
`;
