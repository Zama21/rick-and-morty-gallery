import styled from 'styled-components';
import { Logo } from './Logo';
import { FilterForm } from './FilterForm';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <FilterForm />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1520px) {
    flex-direction: row;
  }
`;
