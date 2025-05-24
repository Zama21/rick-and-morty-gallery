import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './Card';
import { usePopup } from 'hooks';
import { useCallback } from 'react';

export function ItemsGrid() {
  const { characters } = useData();
  const { popupSettings, openPopup, closePopup } = usePopup();

  const handleCardClick = useCallback((props) => openPopup(props), [openPopup]);

  if (!characters.length) return null;

  return (
    <Container>
      {characters.map((props) => (
        <Card key={props.id} onClickHandler={handleCardClick} props={props} />
      ))}
      <Popup settings={popupSettings} closePopup={closePopup} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
