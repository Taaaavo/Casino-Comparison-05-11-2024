// ? Delete event default for all forms
const forms = document.querySelectorAll('form');
forms.forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });
});

function validateForm(formulario) {
  let inputs = formulario.querySelectorAll('input, textarea, checkbox, select');
  let isValid = true;

  inputs.forEach(function (input) {
    input.classList.remove('error');

    if (input.name === 'email' && !isValidEmail(input.value)) {
      isValid = false;
      input.classList.add('error');
      notify.warning('The email address is not valid', 3000);
    } else if (input.type === 'checkbox' && !input.checked) {
      isValid = false;
      input.classList.add('error');
      notify.warning('You must accept the terms and conditions', 3000);
    } else if (input.name === 'name' && (input.value.length < 3 || input.value.length > 50)) {
      isValid = false;
      input.classList.add('error');
      notify.warning('The name must be between 3 and 50 characters', 3000);
    } else if (input.name === 'lastname' && (input.value.length < 3 || input.value.length > 90)) {
      isValid = false;
      input.classList.add('error');
      notify.warning('The last names must be between 3 and 90 characters', 3000);
    } else if (input.name === 'phone' && !isValidPhone(input.value)) {
      isValid = false;
      input.classList.add('error');
      notify.warning('The phone number is not valid', 3000);
    } else if (input.name === 'dates' && !isValidDates(input.value)) {
      isValid = false;
      input.classList.add('error');
      notify.warning('Please enter a valid date range in the format YYYY-MM-DD to YYYY-MM-DD', 3000);
    } else if (input.name === 'guests') {
      let guests = parseInt(input.value);
      let rooms = parseInt(document.getElementById('rooms').value);

      if (guests < 1) {
        isValid = false;
        input.classList.add('error');
        notify.warning('The number of guests must be at least 1', 3000);
      } else if (guests > rooms * 4) {
        isValid = false;
        input.classList.add('error');
        notify.warning(`The number of guests cannot exceed ${rooms * 4} for the number of rooms selected`, 3000);
      }
    } else if (input.tagName.toLowerCase() === 'select' && input.name === 'hotel' && !input.value) {
      isValid = false;
      input.classList.add('error');
      notify.warning('Please select a hotel', 3000);
    }
  });

  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\d/.test(phone);
}

function isValidDates(dates) {
  const datePattern = /^\d{4}-\d{2}-\d{2} to \d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(dates)) return false;

  const [startDate, endDate] = dates.split(' to ').map(date => new Date(date));
  return startDate < endDate;
}
