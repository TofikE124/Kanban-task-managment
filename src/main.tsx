import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import SidebarProvider from "./providers/SidebarProvider.tsx";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router.tsx";
import BoardProvider from "./providers/BoardProvider.tsx";
import data from "./data/data.ts";
// console.log(
//   data.map((b) => ({
//     ...b,
//     columns: b.columns.map((c) => ({
//       ...c,
//       tasks: c.tasks.map((t, index) => ({ ...t, index, recent: false })),
//     })),
//   }))
// );
// localStorage.setItem("boards", JSON.stringify(data));
console.log(JSON.parse(localStorage.getItem("boards") || ""));
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
