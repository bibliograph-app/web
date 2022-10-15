import React from "react";

export const MouseFocusContext = React.createContext<{
  focus: string | null;
  setFocus(to: string | null): void;
}>({
  focus: null,
  setFocus: () => {},
});
