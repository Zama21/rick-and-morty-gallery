import { useCallback } from 'react';
import styled from 'styled-components';

export const OptionsListSelect = ({ options, onChange, setIsOpen, value }) => {
  const handleOptionSelect = useCallback(
    (event, option) => {
      if (
        event.type === 'click' ||
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();
        onChange(option);
        setIsOpen(false);
      }
    },
    [onChange, setIsOpen]
  );

  return (
    <OptionsList>
      {options.map((option) => (
        <Option
          key={option}
          isSelected={option === value}
          tabIndex={0}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={(e) => handleOptionSelect(e, option)}
          // eslint-disable-next-line react/jsx-no-bind
          onKeyDown={(e) => handleOptionSelect(e, option)}
        >
          {option}
        </Option>
      ))}
    </OptionsList>
  );
};

const OptionsList = styled.ul`
  position: absolute;
  background: #ffffff;
  top: calc(100% + 5px);
  width: 100%;
  max-height: 175px;
  overflow-y: auto;
  border: 1px solid ${(props) => props.theme.colors.borderDefault};
  border-radius: 8px;
  z-index: 1000;
  list-style: none;

  box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05),
    0px 1px 4px rgba(12, 12, 13, 0.1);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    margin: 8px 4px;
    border: solid 4px transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(217, 217, 217, 1);
    border-radius: 4px;
    border: solid 4px transparent;
  }
`;

const Option = styled.li`
  padding: 7px;
  height: 35px;
  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover,
  &:focus {
    background-color: rgba(131, 191, 70, 0.2);
    outline: none;
  }

  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
`;
