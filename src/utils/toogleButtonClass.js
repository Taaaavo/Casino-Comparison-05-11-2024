export function removeClass(buttons) {
  buttons.forEach(button => {
    button.classList.remove('bg-[#087CA7]', 'font-semibold', 'text-white');
  });
}

export function toogleButtonClass(btnIndicator) {
  if (btnIndicator) {
    btnIndicator.classList.toggle('bg-[#087CA7]');
    btnIndicator.classList.toggle('font-semibold');
    btnIndicator.classList.toggle('text-white');
  }
}
