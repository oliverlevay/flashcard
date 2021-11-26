export const goToLogin = () => {
  window.location.href = `/api/auth/login?returnTo=${document.location.pathname}`;
};

export const logout = () => {
  window.location.href = "api/auth/logout";
};
