import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface SidebarContext {
  showSidebar: boolean;
  toggleSidebar: () => void;
  showMobileSidebar: boolean;
  toggleMobileSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

const SidebarProvider = ({ children }: Props) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }
  function toggleMobileSidebar() {
    setShowMobileSidebar(!showMobileSidebar);
  }
  return (
    <SidebarContext.Provider
      value={{
        showSidebar,
        toggleSidebar,
        showMobileSidebar,
        toggleMobileSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
