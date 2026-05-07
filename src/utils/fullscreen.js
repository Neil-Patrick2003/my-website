export function getFsElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}

export function isFsSupported() {
  if (typeof document === 'undefined') return false;
  const el = document.documentElement;
  return !!(el.requestFullscreen || el.webkitRequestFullscreen);
}

export function requestFs(el = document.documentElement) {
  if (el.requestFullscreen) return el.requestFullscreen();
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  return Promise.reject(new Error('Fullscreen not supported'));
}

export function exitFs() {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  return Promise.reject(new Error('Fullscreen not supported'));
}

export function onFsChange(handler) {
  document.addEventListener('fullscreenchange', handler);
  document.addEventListener('webkitfullscreenchange', handler);
  return () => {
    document.removeEventListener('fullscreenchange', handler);
    document.removeEventListener('webkitfullscreenchange', handler);
  };
}
