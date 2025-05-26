import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { HeaderSelect } from './HeaderSelect';
import { OptionsListSelect } from './OptionsListSelect';

export const Select = ({
  options,
  value = '',
  onChange,
  placeholder = 'Select the option',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleFocusOut = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.relatedTarget)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return (
    <SelectContainer ref={inputRef} {...props}>
      <HeaderSelect
        placeholder={placeholder}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onChange={onChange}
        value={value}
      />
      {isOpen && (
        <OptionsListSelect
          options={options}
          onChange={onChange}
          setIsOpen={setIsOpen}
          value={value}
        />
      )}
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  display: flex;
  position: relative;
`;
