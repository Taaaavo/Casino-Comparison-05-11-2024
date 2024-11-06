import React from 'react';
import { setKey } from '../../../../../../utils/localStorage';
import { useModalController } from '../../../../../../hooks/useModalController';

type hotelID = string;
type packageID = 'standard' | 'premium' | 'vip';

interface OpenBookingButtonProps {
  hotelID: hotelID;
  packageID: packageID;
  packagesPrices: packagesPrices;
  hotelName: string;
}

type packagesPrices = {
  standard?: number;
  premium?: number;
  vip?: number;
};

const { nextModalSection, previousModalSection } = useModalController();

const OpenBookingButton: React.FC<OpenBookingButtonProps> = ({ hotelID, packageID, packagesPrices, hotelName }) => {
  const openBookingModal = (hotelID: hotelID, packageID: packageID) => {
    const bookingSelect = document.getElementById('booking-select') as HTMLSelectElement;
    disabledDestination(bookingSelect);
    selectDestinationOnBookingForm(hotelID, bookingSelect);
    selectPackageSelected(packageID);

    const bookingModalTitle = document.getElementById('booking-modal-hotel-name');

    if (bookingModalTitle) {
      bookingModalTitle.innerHTML = hotelName;
    }

    savePackagesPricesInLocalStorage(packagesPrices);

    nextModalSection();
  };

  const selectDestinationOnBookingForm = (destination: string, bookingSelect: HTMLSelectElement) => {
    const options = bookingSelect.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === destination) {
        options[i].setAttribute('selected', 'selected');
        return;
      }
    }
  };

  const disabledDestination = (bookingSelect: HTMLSelectElement) => {
    const options = bookingSelect.options;
    for (let i = 0; i < options.length; i++) {
      options[i].removeAttribute('selected');
    }
  };

  const selectPackageSelected = (packageID: packageID) => {
    const packageSelect = document.getElementById('package-select') as HTMLSelectElement;
    const options = packageSelect.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === packageID) {
        options[i].setAttribute('selected', 'selected');
        return;
      }
    }
  };

  const savePackagesPricesInLocalStorage = (packagesPrices: packagesPrices) => {
    setKey('packagesPrices', packagesPrices);
  };

  return (
    <button className="flex items-center gap-2 text-base font-medium   sm:text-lg md:text-lg text-[#033860]" onClick={() => openBookingModal(hotelID, packageID)}>
      {packageID === 'vip' && <img src="/public/assets/top/cards/crown.png" className="object-contain w-4" alt="Crown" title="Crown" />}
      <u>Slots Available</u>
    </button>
  );
};

export default OpenBookingButton;
