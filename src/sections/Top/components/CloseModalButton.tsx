import React from 'react';
import { useModalController } from '../../../hooks/useModalController';

interface IDModal {
  IDModal: string;
  isGallery?: boolean;
}

const { restartModalSection, hiddeAllInfoTabs } = useModalController();

const CloseModalButton: React.FC<IDModal> = ({ IDModal, isGallery }) => {
  function closeModal(idModal: string) {
    restartModalSection();
    hiddeAllInfoTabs();
    const modalSelected = document.getElementById(idModal);
    if (modalSelected) {
      modalSelected.classList.toggle('hidden');
    }
  }

  if (isGallery) {
    return (
      <button onClick={() => closeModal(`${IDModal}`)} className="absolute z-50 top-0 right-0 m-4">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTkgM0g1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0yVjVhMiAyIDAgMCAwLTItMm0tMy40IDE0TDEyIDEzLjRMOC40IDE3TDcgMTUuNmwzLjYtMy42TDcgOC40TDguNCA3bDMuNiAzLjZMMTUuNiA3TDE3IDguNEwxMy40IDEybDMuNiAzLjZ6Ii8+PC9zdmc+"
          alt="Close modal"
        />
      </button>
    );
  }
  return (
    <button id="button" className="closeInfoModal">
      <img
        className="hover:cursor-pointer absolute top-0 right-0 w-7 rounded-xs m-2 closeModal"
        onClick={() => closeModal(IDModal)}
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDIwRTNDIiBkPSJtNy4wNSA1LjYzNmw0Ljk1IDQuOTVsNC45NS00Ljk1bDEuNDE0IDEuNDE0bC00Ljk1IDQuOTVsNC45NSA0Ljk1bC0xLjQxNSAxLjQxNGwtNC45NS00Ljk1bC00Ljk0OSA0Ljk1bC0xLjQxNC0xLjQxNGw0Ljk1LTQuOTVsLTQuOTUtNC45NXoiLz48L3N2Zz4="
        alt="Close"
        title="Close icon"
      />
    </button>
  );
};

export default CloseModalButton;
