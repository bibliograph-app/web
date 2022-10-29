import React from "react";

export const BibliographyContext = React.createContext<{
  focusId: string | null;
  changeFocus(id: string | null): void;
  showId: string | null;
  changeShow(id: string): void;
}>({
  focusId: null,
  changeFocus: () => {},
  showId: null,
  changeShow: () => {},
});
