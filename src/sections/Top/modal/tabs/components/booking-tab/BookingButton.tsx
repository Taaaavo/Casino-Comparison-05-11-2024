import React, { useState } from 'react';
import { setKey, getKey } from '../../../../../../utils/localStorage';
import { useModalController } from '../../../../../../hooks/useModalController';

type IDForm = string;

interface BookingButtonProps {
  IDForm: IDForm;
}

const BookingButton: React.FC<BookingButtonProps> = ({ IDForm }) => {
  const { nextModalSection } = useModalController();
  const [isLoading, setLoading] = useState(false);
  function sendForm(IDForm: string, message = 'Form sent successfully') {
    const form = document.getElementById(IDForm) as HTMLFormElement;

    if (!form || !validateForm(form)) return;

    setLoading(true);

    setTimeout(() => {
      notify.success(message, 3000);
    }, 2000);
    saveInLocalStorage(form);
  }

  function saveInLocalStorage(form: HTMLFormElement) {
    const formData = new FormData(form);
    const guestNumber = getInputValue('guests');
    const roomsNumber = getInputValue('rooms');

    const formValues = {
      ...Object.fromEntries(formData.entries()),
      guestNumber,
      roomsNumber,
    };

    createSummary(formValues);

    setKey('booking-info', formValues);
    setTimeout(() => {
      nextModalSection();
    }, 4000);
  }

  function createSummary(formValues: Record<string, string>) {
    const summaryElements = {
      name: 'sumary-name',
      lastname: 'sumary-lastname',
      phone: 'sumary-phone',
      email: 'sumary-email',
      destination: 'sumary-destination',
      guestsRooms: 'sumary-guests',
      package: 'sumary-package',
      dates: 'sumary-dates',
      packagePay: 'selected-package',
      rooms: 'sumary-rooms',
    };

    const dataToUpdate = {
      name: formValues['name'],
      lastname: formValues['lastname'],
      phone: formValues['phone'],
      email: formValues['email'],
      destination: formValues['destination'].replace(/_/g, ' '),
      guestsRooms: `${formValues['guestNumber']} guests and ${formValues['roomsNumber']} rooms`,
      package: formValues['package'].toUpperCase(),
      dates: formValues['dates'],
      packagePay: `${formValues['package'].toUpperCase()}`,
      rooms: `${formValues['roomsNumber']} ${+formValues['roomsNumber'] > 1 ? 'rooms' : 'room'}`,
    };

    Object.entries(summaryElements).forEach(([key, elementId]) => {
      const element = document.getElementById(elementId) as HTMLInputElement;
      if (element && dataToUpdate[key]) {
        element.value = dataToUpdate[key];
      }
    });

    setPackageSelected(formValues['package']);
    setNightsAndPrice(formValues['dates'], formValues['package'], +formValues['roomsNumber']);
    setTotalRooms(+formValues['roomsNumber'], formValues['package']);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  function setPackageSelected(packageName: string) {
    const packageSelect = document.getElementById('total-package') as HTMLInputElement;
    const packagesPrices = getKey('packagesPrices');

    console.log('El paquete es: ');

    console.log(packagesPrices[packageName]);

    if (packageSelect && packagesPrices) {
      packageSelect.value = `$${packagesPrices[packageName]} USD`;
    }
  }

  function setNightsAndPrice(date: string, packagePrice: string, rooms: number) {
    const packagesPrices = getKey('packagesPrices');
    const { numberOfNights, totalNightsPrice } = calculateNights(date, packagesPrices[packagePrice]);

    updateInputValue('sumary-nights', `${numberOfNights} ${numberOfNights > 1 ? 'nights' : 'night'}`);
    updateInputValue('sumary-total-nights', `$${totalNightsPrice} USD`);
    setTotal(packagePrice, rooms, numberOfNights);
  }

  function setTotalRooms(rooms: number, price: string) {
    const packagePrice = getKey('packagesPrices');
    updateInputValue('total-rooms', `$${rooms * packagePrice[price]} USD`);
  }

  function calculateNights(date: string, packagePrice: number) {
    const [startDateStr, endDateStr] = date.split(' to ');
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const numberOfNights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalNightsPrice = numberOfNights * packagePrice;

    return { numberOfNights, totalNightsPrice };
  }

  function calculateTotal(packageSelected: string, rooms: number, nights: number) {
    const packagesPrices = getKey('packagesPrices');
    return rooms * packagesPrices[packageSelected] * nights;
  }

  function setTotal(packageSelected: string, rooms: number, nights: number) {
    const total = calculateTotal(packageSelected, rooms, nights);
    updateInputValue('sumary-total', `$${total} USD`);
  }

  function getInputValue(id: string): string {
    const input = document.getElementById(id) as HTMLInputElement;
    return input ? input.value : '';
  }

  function updateInputValue(id: string, value: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) input.value = value;
  }

  return (
    <button className="bg-red flex justify-center text-white bg-blueStrong py-2 px-6 rounded-lg w-full font-normal hover:scale-95 transition-all duration-200" onClick={() => sendForm(IDForm)}>
      {isLoading ? (
        <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
            <stop offset="0" stop-color="#FFFFFF"></stop>
            <stop offset=".3" stop-color="#FFFFFF" stop-opacity=".9"></stop>
            <stop offset=".6" stop-color="#FFFFFF" stop-opacity=".6"></stop>
            <stop offset=".8" stop-color="#FFFFFF" stop-opacity=".3"></stop>
            <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop>
          </radialGradient>
          <circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70">
            <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
          </circle>
          <circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle>
        </svg>
      ) : (
        <span>Send</span>
      )}
    </button>
  );
};

export default BookingButton;
