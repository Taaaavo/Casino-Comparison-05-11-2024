import React, { useEffect } from 'react';

export function AcceptCookieButton({ cookie }): React.ReactElement<string> {
  useEffect(() => {
    showCookies(cookie);
  }, [cookie]);

  return (
    <button className="bg-orange rounded-lg text-white py-2 px-10 sm:w-6/12 hover:scale-95 transition-all duration-200" onClick={() => acceptCookies(cookie)}>
      Yes
    </button>
  );
}

export function RejectCookieButton({ cookie }): React.ReactElement<string> {
  return (
    <button className="bg-transparent border-[1px] border-[#00000044] rounded-lg py-2 px-10 sm:w-6/12 hover:scale-95 transition-all duration-200" onClick={() => rejectCookies(cookie)}>
      No
    </button>
  );
}
