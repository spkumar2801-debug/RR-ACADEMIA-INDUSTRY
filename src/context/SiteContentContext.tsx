import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getServices,
  getSiteSettings,
  getMediaRegistry,
  getPartners,
  getGalleryItems
} from "../services/contentService";
import type {
  ServiceItem,
  SiteSettings,
  PartnerItem,
  GalleryItem
} from "../config/siteContent";
import {
  defaultSiteSettings,
  verifiedServices,
  verifiedPartners,
  verifiedGalleryItems
} from "../config/siteContent";
import type { MediaItem } from "../config/media";
import { defaultMediaItems } from "../config/media";

interface SiteContentContextType {
  siteSettings: SiteSettings;
  services: ServiceItem[];
  partners: PartnerItem[];
  galleryItems: GalleryItem[];
  media: Record<string, MediaItem>;
  loading: boolean;
  refreshContent: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType>({
  siteSettings: defaultSiteSettings,
  services: verifiedServices,
  partners: verifiedPartners,
  galleryItems: verifiedGalleryItems,
  media: defaultMediaItems,
  loading: true,
  refreshContent: async () => {}
});

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [services, setServices] = useState<ServiceItem[]>(verifiedServices);
  const [partners, setPartners] = useState<PartnerItem[]>(verifiedPartners);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(verifiedGalleryItems);
  const [media, setMedia] = useState<Record<string, MediaItem>>(defaultMediaItems);
  const [loading, setLoading] = useState(true);

  const refreshContent = useCallback(async () => {
    try {
      const [fetchedSettings, fetchedServices, fetchedPartners, fetchedGallery, fetchedMedia] = await Promise.all([
        getSiteSettings(),
        getServices(),
        getPartners(),
        getGalleryItems(),
        getMediaRegistry()
      ]);
      setSiteSettings(fetchedSettings);
      setServices(fetchedServices);
      setPartners(fetchedPartners);
      setGalleryItems(fetchedGallery);
      setMedia(fetchedMedia);
    } catch (err) {
      console.warn("Using verified fallback site content:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  return (
    <SiteContentContext.Provider
      value={{
        siteSettings,
        services,
        partners,
        galleryItems,
        media,
        loading,
        refreshContent
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);

export default SiteContentContext;
