import { defaultPopupSettings } from 'constants';
import { createContext, useContext, useState } from 'react';

export function PopupProvider({ children }) {
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

  return (
    <PopupContext.Provider value={{ popupSettings, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
}

const PopupContext = createContext();

export const usePopup = () => {
  return useContext(PopupContext);
};
