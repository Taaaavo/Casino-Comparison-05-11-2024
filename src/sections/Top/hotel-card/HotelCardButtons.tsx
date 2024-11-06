import React from 'react';
import { removeClass, toogleButtonClass } from '../../../utils/toogleButtonClass';
import { toggleTabInfoModal } from '../../../utils/toogleTabInfoModal';
import { setKey } from '../../../utils/localStorage';

interface ButtonsProps {
  hotelID: string;
  typeButton?: string;
}

export const OpenGallery: React.FC<ButtonsProps> = ({ hotelID }) => {
  function clickModal(idModal: string) {
    const modalInfoSection = document.getElementById(idModal);
    if (modalInfoSection) modalInfoSection.classList.toggle('hidden');
  }

  return (
    <img
      onClick={() => clickModal(`images-${hotelID}`)}
      className="w-5 h-4 object-contain md:w-6 md:h-6 "
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTcgMmExIDEgMCAxIDAgMCAyaDEuNTg2bC00LjI5MyA0LjI5M2ExIDEgMCAwIDAgMS40MTQgMS40MTRMMjAgNS40MTRWN2ExIDEgMCAxIDAgMiAwVjNhMSAxIDAgMCAwLTEtMXpNNCAxOC41ODZWMTdhMSAxIDAgMSAwLTIgMHY0YTEgMSAwIDAgMCAxIDFoNGExIDEgMCAxIDAgMC0ySDUuNDE0bDQuMjkzLTQuMjkzYTEgMSAwIDAgMC0xLjQxNC0xLjQxNHoiLz48L3N2Zz4="
      alt="Open Gallery"
    />
  );
};

export const CompleteInfoModalButtons: React.FC<ButtonsProps> = ({ hotelID, typeButton }) => {
  function openCompleteInfoModal(hotelID: string, tabName) {
    setKey('hotelID', hotelID);
    setKey('currentModalSection', 1);
    const modalInfoSection = document.getElementById('info-modal-section');
    const hotelInfo = document.getElementById(`info-modal-section-${hotelID}`);
    if (modalInfoSection && hotelInfo) {
      toggleTabInfoModal(tabName, `tab-${tabName}-${hotelID}`);
      const btnIndicator = document.getElementById(`${tabName}-btn-${hotelID}`);
      if (btnIndicator) {
        const buttons = document.querySelectorAll('.toogle-btn');
        removeClass(buttons);

        toogleButtonClass(btnIndicator);
      }

      modalInfoSection.classList.toggle('hidden');
      hotelInfo.classList.toggle('hidden');
    }
  }

  if (typeButton === 'info') {
    return (
      <button
        className="flex justify-center items-center gap-2 bg-red rounded-xl py-2 lg:w-max px-4 2xl:w-4/12 hover:scale-95 transition-all duration-200 font-Normal bg-blueStrong text-white"
        onClick={() => openCompleteInfoModal(hotelID, 'info')}
      >
        <img src="public/assets/top/cards/info.png" alt="Info icon" title="Info" />
        <span className="text-[14px]/[18px] md:text-[16px]/[22px] xl:text-[17px]/[22px] font-medium ">More info</span>
      </button>
    );
  }

  if (typeButton === 'pricing') {
    return (
      <button
        className="flex justify-center items-center gap-2 rounded-xl py-2 border-2 border-blueStrong   lg:w-max px-4 2xl:w-4/12 hover:scale-95 transition-all duration-200 font-Normal"
        onClick={() => openCompleteInfoModal(hotelID, 'pricing')}
      >
        <img src="public/assets/top/cards/money.png" alt="Pricing icon" title="Pricing" />
        <span className="text-[14px]/[18px] md:text-[16px]/[22px] xl:text-[17px]/[22px] font-medium text-blueStrong">Prices and offers</span>
      </button>
    );
  }
};

export const AvailableSlots: React.FC<ButtonsProps> = ({ hotelID }) => {
  function getDestinations(): HTMLOptionsCollection | null {
    const selectElement = document.getElementById('booking-select') as HTMLSelectElement | null;

    const destinations = selectElement?.options as HTMLOptionsCollection;
    return destinations;
  }

  function showBookingModal(hotelID: string) {
    const modalInfoSection = document.getElementById('info-modal-section');
    const bookingTab = document.getElementById('booking-modal');
    setKey('currentModalSection', 2);
    if (modalInfoSection && bookingTab) {
      const destinations = getDestinations();

      if (!destinations) return;

      disabledDestination();

      for (let i = 0; i < destinations.length; i++) {
        if (destinations[i].value === hotelID) {
          destinations[i].setAttribute('selected', 'selected');
        }
      }

      modalInfoSection.classList.toggle('hidden');
      bookingTab.classList.toggle('hidden');
    }
  }

  function disabledDestination() {
    const destinations = getDestinations();

    if (!destinations) return;

    for (let i = 0; i < destinations.length; i++) {
      if (destinations[i].getAttribute('selected') === 'selected') {
        destinations[i].removeAttribute('selected');
      }
    }
  }

  return (
    <button
      className="flex justify-start items-center gap-2 rounded-xl py-2 lg:w-max px-4 2xl:w-4/12 hover:scale-95  transition-all duration-200 font-Normal"
      onClick={() => showBookingModal(hotelID)}
    >
      <img src="public/assets/top/cards/calendar.png" alt="Calendar icon" title="Calendar" />
      <span className="text-[14px]/[18px] md:text-[16px]/[22px] xl:text-[17px]/[22px] font-medium text-blueStrong">Available slots</span>
    </button>
  );
};
