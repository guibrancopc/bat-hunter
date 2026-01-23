export function loadNewPage(route?: string) {
  if (!route) return;

  window.location.href = route;
}
