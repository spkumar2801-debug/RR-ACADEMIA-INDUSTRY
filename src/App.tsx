import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { LogoLoader } from "./components/common/LogoLoader";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin Portal
import { AdminAuthProvider } from "./admin/AdminAuthContext";
import { SiteContentProvider } from "./context/SiteContentContext";
import AdminLayout from "./admin/AdminLayout";
import AdminLoginPage from "./admin/AdminLoginPage";
import AdminDashboardPage from "./admin/AdminDashboardPage";
import AdminServicesPage from "./admin/AdminServicesPage";
import AdminPartnersPage from "./admin/AdminPartnersPage";
import AdminGalleryPage from "./admin/AdminGalleryPage";
import AdminContentPage from "./admin/AdminContentPage";
import AdminMediaPage from "./admin/AdminMediaPage";
import AdminEnquiriesPage from "./admin/AdminEnquiriesPage";

import { PageTransition } from "./components/common/PageTransition";

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <PageTransition>
        <div className="flex-1">
          <Outlet />
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AdminAuthProvider>
      <SiteContentProvider>
        <LogoLoader>
          <BrowserRouter>
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="services" element={<AdminServicesPage />} />
                <Route path="partners" element={<AdminPartnersPage />} />
                <Route path="gallery" element={<AdminGalleryPage />} />
                <Route path="content" element={<AdminContentPage />} />
                <Route path="media" element={<AdminMediaPage />} />
                <Route path="enquiries" element={<AdminEnquiriesPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LogoLoader>
      </SiteContentProvider>
    </AdminAuthProvider>
  );
};

export default App;
