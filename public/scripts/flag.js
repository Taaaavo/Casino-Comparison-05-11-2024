const flagsArray = document.querySelectorAll('.country-flag'),
  flagsCodesArray = document.querySelectorAll('.country-code');

async function getCountryData() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const flagUrl = `https://flagcdn.com/16x12/${data.country_code.toLowerCase()}.png`;

    const countryCallingCode = data.country_calling_code;

    setFlag(flagUrl, flagsArray);
    setCode(countryCallingCode, flagsCodesArray);
  } catch (error) {
    console.error('Error obteniendo la información de IP:', error);
  }
}

function setFlag(flagUrl, flagArray) {
  flagArray.forEach(flag => {
    flag.src = flagUrl;
  });
}

function setCode(countryCallingCode, codesArray) {
  codesArray.forEach(code => {
    code.textContent = countryCallingCode;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getCountryData();
});
