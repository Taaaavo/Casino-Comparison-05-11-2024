export function toggleTabInfoModal(tab, tabModal) {
  const tabToActivate = document.getElementById(tabModal);

  if (!tabToActivate) return;

  tabToActivate.classList.remove('hidden');

  const siblingTab = tab === 'info' ? tabToActivate.nextElementSibling : tab === 'pricing' ? tabToActivate.previousElementSibling : null;

  if (siblingTab) siblingTab.classList.add('hidden');
}
