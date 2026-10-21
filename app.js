const resourceDialog = document.querySelector('#resource-dialog');
const imageDialog = document.querySelector('#image-dialog');
const openDialog = dialog => { dialog.showModal(); document.body.classList.add('modal-open'); };
document.querySelectorAll('[data-resource]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#resource-heading').textContent = button.dataset.resource;
    openDialog(resourceDialog);
  });
});
document.querySelectorAll('[data-zoom]').forEach(button => {
  button.addEventListener('click', () => {
    const original = button.querySelector('img');
    const enlarged = document.querySelector('#enlarged-image');
    enlarged.src = original.src;
    enlarged.alt = original.alt;
    document.querySelector('#image-download').href = original.src;
    openDialog(imageDialog);
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
const tabs = [...document.querySelectorAll('[role=tab]')];
function activateTab(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      activateTab(tabs[next]);
      tabs[next].focus();
    }
  });
});
