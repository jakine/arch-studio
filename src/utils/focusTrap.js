// Keeps Tab and Shift+Tab cycling through `focusables`: past the last one
// focus wraps to the first, and back again
export const trapTab = (e, focusables) => {
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
};
