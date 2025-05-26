import styled, { css } from 'styled-components';
import ReactDOM from 'react-dom';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { usePopup } from 'components/providers';

//@NOTE: Сейчас фокус выходит за пределы модального окна, это можно исправить, сделав "ловушку для фокуса".
export function Popup() {
  const { popupSettings, closePopup } = usePopup();
  const { visible, content = {} } = popupSettings;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    if (visible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, closePopup]);

  const togglePopup = useCallback(
    (e) => {
      if (e.currentTarget !== e.target) return;

      closePopup();
    },
    [closePopup]
  );

  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  return ReactDOM.createPortal(
    <PopupContainer onClick={togglePopup} visible={visible}>
      <StyledPopup>
        <CloseIcon onClick={closePopup} />
        <PopupHeader
          name={name}
          gender={gender}
          image={image}
          status={status}
          species={species}
          type={type}
        />
        <PopupInfo origin={origin} location={location} />
        <PopupEpisodes episodes={episodes} />
      </StyledPopup>
    </PopupContainer>,
    document.getElementById('modal')
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visible 0.3s;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      visibility: initial;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 930px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const CloseIcon = styled.button`
  position: fixed;
  right: calc(30% - 10px);
  top: calc(10vh - 30px);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83bf46aa;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
  }

  &:before {
    left: 4.5px;
    transform: rotate(-45deg);
  }

  &:after {
    right: 4.5px;
    transform: rotate(45deg);
  }

  @media (max-width: 930px) {
    right: calc(10% - 10px);
  }

  @media (max-width: 600px) {
    right: calc(3% - 10px);
  }
`;
