const resourceDialog = document.querySelector('#resource-dialog');
const imageDialog = document.querySelector('#image-dialog');
function openDialog(dialog) {
  dialog.showModal();
  document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-resource]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('#resource-heading').textContent = link.dataset.resource;
    openDialog(resourceDialog);
  });
});
document.querySelectorAll('[data-zoom]').forEach(button => {
  button.addEventListener('click', () => {
    const source = button.querySelector('img');
    const enlarged = document.querySelector('#enlarged-image');
    enlarged.src = source.src;
    enlarged.alt = source.alt;
    document.querySelector('#image-download').href = source.src;
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
