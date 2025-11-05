import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import RegularFetchPage from "./pages/regular-fetch/RegularFetchPage";
import TanstackFetchPage from "./pages/tanstack-fetch/TanstackFetchPage";
import RootLayout from "./layouts/RootLayout";
import TanstackQueryClick from "./pages/tanstack-query-click/TanstackQueryClick";
import TanstackQueryById from "./pages/tanstack-query-by-id/TanstackQueryById";
import PagenationPage from "./pages/pagenation/PagenationPage";
export default function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/regular-fetch" element={<RegularFetchPage />} />
          <Route path="/tanstack-fetch" element={<TanstackFetchPage />} />
          <Route
            path="/tanstack-query-click"
            element={<TanstackQueryClick />}
          />
          <Route
            path="/tanstack-query-by-id/:userId"
            element={<TanstackQueryById />}
          />

          <Route path="/pagenation" element={<PagenationPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
