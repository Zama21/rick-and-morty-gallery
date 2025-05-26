import styled from 'styled-components';
import { Popup } from './popup';
import { useData, usePopup } from './providers';
import { Card } from './Card';

export function ItemsGrid() {
  const { characters } = useData();
  const { popupSettings } = usePopup();

  if (!characters.length) return null;

  return (
    <Container>
      {characters.map((props) => (
        <Card key={props.id} props={props} />
      ))}
      {popupSettings.visible && <Popup />}
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
