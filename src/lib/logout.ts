export const logout = (redirectPath: string = "/login") => {
  if (typeof window !== "undefined") {
    try {
      document.cookie = `accessToken=; Path=/; Max-Age=0; SameSite=Lax`;
      document.cookie = `carPlaceAdminRefreshToken=; Path=/; Max-Age=0; SameSite=Lax`;
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    } catch {}
    window.location.href = redirectPath;
  }
};
