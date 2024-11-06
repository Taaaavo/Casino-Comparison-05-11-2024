import React, { useState } from 'react';
import { removeClass, toogleButtonClass } from '../../../../../../utils/toogleButtonClass';
import { toggleTabInfoModal } from '../../../../../../utils/toogleTabInfoModal';

interface ToogleProps {
  hotelID: string;
}

const ToogleButtons: React.FC<ToogleProps> = ({ hotelID }) => {
  const [activeButton, setActiveButton] = useState('');
  function showTab(idTab: string) {
    if (activeButton === idTab) return;

    toggleTabInfoModal(idTab, `tab-${idTab}-${hotelID}`);

    const buttons = document.querySelectorAll('.toogle-btn');
    removeClass(buttons);

    const btnIndicator = document.getElementById(`${idTab}-btn-${hotelID}`);
    if (btnIndicator) {
      toogleButtonClass(btnIndicator);
      return;
    }

    setActiveButton(idTab);
  }

  return (
    <>
      <button onClick={() => showTab('info')} id={`info-btn-${hotelID}`} className="py-2 px-4 rounded-md toogle-btn">
        Info
      </button>
      <button onClick={() => showTab('pricing')} id={`pricing-btn-${hotelID}`} className="py-2 px-4 rounded-md toogle-btn">
        Prices & Offers
      </button>
    </>
  );
};

export default ToogleButtons;
