import { getKey, setKey } from '../utils/localStorage';

export function useModalController() {
  const restartModalSection = () => {
    setKey('currentModalSection', 1);
  };

  const nextModalSection = () => {
    const currentModalSection = getKey('currentModalSection');
    if (currentModalSection < 4) {
      setKey('currentModalSection', currentModalSection + 1);
      activeTab();
    }
  };

  const previousModalSection = () => {
    let currentModalSection = getKey('currentModalSection');

    if (currentModalSection > 1) {
      setKey('currentModalSection', currentModalSection - 1);
      activeTab();
    }
  };

  const activeTab = () => {
    const currentModalSection = getKey('currentModalSection');
    let infoTabGlobal = null;
    let bookingTab = null;
    let sumaryTab = null;
    let thankYouTab = null;
    const hotel = getKey('hotelID');

    switch (currentModalSection) {
      case 1:
        infoTabGlobal = document.getElementById(`info-modal-section-${hotel}`);
        bookingTab = document.getElementById('booking-modal');
        if (infoTabGlobal && bookingTab) {
          infoTabGlobal.classList.toggle('hidden');
          bookingTab.classList.toggle('hidden');
        }
        break;

      case 2:
        infoTabGlobal = document.getElementById(`info-modal-section-${hotel}`);
        bookingTab = document.getElementById('booking-modal');
        if (infoTabGlobal && bookingTab) {
          infoTabGlobal.classList.toggle('hidden');
          bookingTab.classList.toggle('hidden');
        }
        break;

      case 3:
        sumaryTab = document.getElementById('sumary-modal');
        bookingTab = document.getElementById('booking-modal');
        if (sumaryTab && bookingTab) {
          sumaryTab.classList.toggle('hidden');
          bookingTab.classList.toggle('hidden');
        }
        break;

      case 4:
        thankYouTab = document.getElementById('thank-you-modal');
        sumaryTab = document.getElementById('sumary-modal');
        if (thankYouTab && sumaryTab) {
          thankYouTab.classList.toggle('hidden');
          sumaryTab.classList.toggle('hidden');
        }
        break;

      default:
        break;
    }
  };

  const hiddeAllInfoTabs = () => {
    const infoTabs = document.querySelectorAll('.info-modal');
    const sumaryTab = document.getElementById('sumary-modal');
    const bookingTab = document.getElementById('booking-modal');
    const thankYou = document.getElementById('thank-you-modal');
    if (infoTabs && sumaryTab) {
      infoTabs.forEach(tab => {
        tab.classList.add('hidden');
      });

      sumaryTab.classList.add('hidden');

      if (bookingTab) {
        bookingTab.classList.add('hidden');
      }

      if (thankYou) {
        thankYou.classList.add('hidden');
      }
    }
  };

  return { restartModalSection, nextModalSection, previousModalSection, hiddeAllInfoTabs };
}
