import { defaultPopupSettings } from 'constants';
import { useState } from 'react';

export function usePopup() {
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  const openPopup = (content) => {
    setPopupSettings({
      visible: true,
      content
    });
  };

  const closePopup = () => {
    setPopupSettings({
      visible: false,
      content: {}
    });
  };

  return { popupSettings, openPopup, closePopup };
}
