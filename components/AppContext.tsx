import { createContext } from "react";

// Can fill this in later if any global states are ever needed

interface AppContextProps {}

const AppContext = createContext<AppContextProps>({});

export default AppContext;
