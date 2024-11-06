import React from 'react';
import { useModalController } from '../../../../../../hooks/useModalController';

const ConfirmButton: React.FC = () => {
  const { nextModalSection } = useModalController();

  return (
    <button onClick={() => nextModalSection()} className="bg-blueStrong text-white py-2 px-6 rounded-lg w-full lg:w-[30%] font-normal hover:scale-95 transition-all duration-200 text-center">
      Confirm
    </button>
  );
};

export default ConfirmButton;
