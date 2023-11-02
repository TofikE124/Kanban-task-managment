import { useContext } from "react";
import showSidebarIcon from "../../public/icon-show-sidebar.svg";
import Button from "../components/Button";
import { SidebarContext } from "../providers/SidebarProvider";

const ShowSidebar = () => {
  const { showSidebar, toggleSidebar } = useContext(SidebarContext);

  return (
    <>
      {!showSidebar ? (
        <Button
          className="show-sidebar"
          type="primary"
          size="lg"
          onClick={() => toggleSidebar()}
        >
          <img src={showSidebarIcon} />
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default ShowSidebar;
