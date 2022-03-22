export function copyTextToClipboard(e) {
  const element = e.currentTarget;
  console.log(element.textContent);
  navigator.clipboard.writeText(element.textContent);
  element.classList.add('copied');
  setTimeout(() => {
    element.classList.remove('copied');
  }, 200);
}
