//zustand hook

import { create } from "zustand";

//this object would be accessible in the  global state


export const useThemeStore = create((set) => ({
  theme : localStorage.getItem("konvoTheme")||"synthwave",
  setTheme: (theme) => {
    localStorage.setItem("konvoTheme",theme);
    set({theme});//here if we reload the page then the default theme does not get applied if the localstorage is empty then default will be applied else thevalue of the localstorage is applied
  },
}));