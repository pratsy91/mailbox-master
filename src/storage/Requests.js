export function getauthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getauthToken();
}
