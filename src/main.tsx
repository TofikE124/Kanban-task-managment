import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import SidebarProvider from "./providers/SidebarProvider.tsx";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router.tsx";
import BoardProvider from "./providers/BoardProvider.tsx";
import Board from "./services/entities/Board.ts";
if (!localStorage.getItem("boards")) {
  const boards: Board[] = [];
  localStorage.setItem("boards", JSON.stringify(boards));
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <BoardProvider>
          <RouterProvider router={Router}></RouterProvider>
        </BoardProvider>
      </SidebarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
