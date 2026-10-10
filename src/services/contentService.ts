import { db, isFirebaseInitialized } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
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
import type {
  MediaItem
} from "../config/media";
import {
  defaultMediaItems,
  setMediaOverrides
} from "../config/media";

export interface EnquirySubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  serviceCategory?: string;
  message: string;
  createdAt?: any;
  status: 'new' | 'reviewed' | 'contacted';
}

const LOCAL_STORAGE_SERVICES_KEY = "rr_academia_services_override";
const LOCAL_STORAGE_SETTINGS_KEY = "rr_academia_settings_override";
const LOCAL_STORAGE_MEDIA_KEY = "rr_academia_media_override";
const LOCAL_STORAGE_ENQUIRIES_KEY = "rr_academia_enquiries_cache";
const LOCAL_STORAGE_PARTNERS_KEY = "rr_academia_partners_override";
const LOCAL_STORAGE_GALLERY_KEY = "rr_academia_gallery_override";

export async function getServices(): Promise<ServiceItem[]> {
  if (isFirebaseInitialized && db) {
    try {
      const colRef = collection(db, "services");
      const q = query(colRef, orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => ({
          ...docSnap.data(),
          id: docSnap.id
        })) as ServiceItem[];
      }
    } catch (e) {
      console.warn("Could not fetch services from Firestore, falling back to verified seed:", e);
    }
  }

  const local = localStorage.getItem(LOCAL_STORAGE_SERVICES_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {}
  }

  return verifiedServices;
}

export async function saveService(service: ServiceItem): Promise<void> {
  const current = await getServices();
  const index = current.findIndex((s) => s.id === service.id || s.slug === service.slug);
  let updated: ServiceItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = service;
  } else {
    updated = [...current, service];
  }
  localStorage.setItem(LOCAL_STORAGE_SERVICES_KEY, JSON.stringify(updated));

  if (isFirebaseInitialized && db) {
    try {
      const docRef = doc(db, "services", service.id);
      await setDoc(docRef, {
        ...service,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn("Firestore saveService skipped or failed (local copy saved):", e);
    }
  }
}

export async function deleteService(serviceId: string): Promise<void> {
  const current = await getServices();
  const updated = current.filter((s) => s.id !== serviceId);
  localStorage.setItem(LOCAL_STORAGE_SERVICES_KEY, JSON.stringify(updated));

  if (isFirebaseInitialized && db) {
    try {
      await deleteDoc(doc(db, "services", serviceId));
    } catch (e) {
      console.warn("Firestore deleteService failed:", e);
    }
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isFirebaseInitialized && db) {
    try {
      const docRef = doc(db, "siteSettings", "main");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { ...defaultSiteSettings, ...snapshot.data() } as SiteSettings;
      }
    } catch (e) {
      console.warn("Could not fetch siteSettings from Firestore:", e);
    }
  }

  const local = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
  if (local) {
    try {
      return { ...defaultSiteSettings, ...JSON.parse(local) };
    } catch {}
  }

  return defaultSiteSettings;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings));

  if (isFirebaseInitialized && db) {
    try {
      const docRef = doc(db, "siteSettings", "main");
      await setDoc(docRef, {
        ...settings,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn("Firestore saveSiteSettings failed:", e);
    }
  }
}

export async function getMediaRegistry(): Promise<Record<string, MediaItem>> {
  let overrides: Record<string, MediaItem> = {};

  if (isFirebaseInitialized && db) {
    try {
      const colRef = collection(db, "media");
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        snapshot.docs.forEach((docSnap) => {
          overrides[docSnap.id] = docSnap.data() as MediaItem;
        });
      }
    } catch (e) {
      console.warn("Could not fetch media registry from Firestore:", e);
    }
  }

  const local = localStorage.getItem(LOCAL_STORAGE_MEDIA_KEY);
  if (local) {
    try {
      const parsed = JSON.parse(local);
      overrides = { ...overrides, ...parsed };
    } catch {}
  }

  setMediaOverrides(overrides);
  return { ...defaultMediaItems, ...overrides };
}

export async function saveMediaItem(slotKey: string, item: MediaItem): Promise<void> {
  const local = localStorage.getItem(LOCAL_STORAGE_MEDIA_KEY);
  let parsed: Record<string, MediaItem> = {};
  if (local) {
    try { parsed = JSON.parse(local); } catch {}
  }
  parsed[slotKey] = item;
  localStorage.setItem(LOCAL_STORAGE_MEDIA_KEY, JSON.stringify(parsed));
  setMediaOverrides({ [slotKey]: item });

  if (isFirebaseInitialized && db) {
    try {
      const docRef = doc(db, "media", slotKey);
      await setDoc(docRef, {
        ...item,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn("Firestore saveMediaItem failed:", e);
    }
  }
}

export async function submitEnquiry(data: Omit<EnquirySubmission, 'id' | 'createdAt' | 'status'>): Promise<string> {
  const enquiry: EnquirySubmission = {
    ...data,
    id: `enq_${Date.now()}`,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  const current = await getEnquiries();
  localStorage.setItem(LOCAL_STORAGE_ENQUIRIES_KEY, JSON.stringify([enquiry, ...current]));

  if (isFirebaseInitialized && db) {
    try {
      const colRef = collection(db, "enquiries");
      const docRef = await addDoc(colRef, {
        ...data,
        status: 'new',
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (e) {
      console.warn("Firestore submitEnquiry failed, saved locally:", e);
    }
  }

  return enquiry.id!;
}

export async function getEnquiries(): Promise<EnquirySubmission[]> {
  if (isFirebaseInitialized && db) {
    try {
      const colRef = collection(db, "enquiries");
      const q = query(colRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => ({
          ...docSnap.data(),
          id: docSnap.id
        })) as EnquirySubmission[];
      }
    } catch (e) {
      console.warn("Could not fetch enquiries from Firestore:", e);
    }
  }

  const local = localStorage.getItem(LOCAL_STORAGE_ENQUIRIES_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {}
  }

  return [
    {
      id: "sample-1",
      name: "Dr. K. S. Rao",
      email: "principal@cbit.ac.in",
      phone: "+91 98480 12345",
      organization: "Chaitanya Bharathi Institute of Technology",
      serviceCategory: "Industry–Academia Collaboration",
      message: "We would like to explore institutional partnership and placement training for our 2026 engineering batch.",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: "new"
    }
  ];
}

export async function updateEnquiryStatus(id: string, status: 'new' | 'reviewed' | 'contacted'): Promise<void> {
  const current = await getEnquiries();
  const updated = current.map((e) => (e.id === id ? { ...e, status } : e));
  localStorage.setItem(LOCAL_STORAGE_ENQUIRIES_KEY, JSON.stringify(updated));

  if (isFirebaseInitialized && db) {
    try {
      const docRef = doc(db, "enquiries", id);
      await setDoc(docRef, { status }, { merge: true });
    } catch (e) {
      console.warn("Firestore updateEnquiryStatus failed:", e);
    }
  }
}

// --------------------------------------------------------------------------
// Partners Management
// --------------------------------------------------------------------------

export async function getPartners(): Promise<PartnerItem[]> {
  if (isFirebaseInitialized && db) {
    try {
      const colRef = collection(db, "partners");
      const q = query(colRef, orderBy("sortOrder", "asc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => ({
          ...docSnap.data(),
          id: docSnap.id
        })) as PartnerItem[];
      }
    } catch (e) {
      console.warn("Could not fetch partners from Firestore, falling back to local/seed:", e);
    }
  }

  const local = localStorage.getItem(LOCAL_STORAGE_PARTNERS_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {}
  }

  return verifiedPartners;
}

export async function savePartner(partner: PartnerItem): Promise<void> {
  const current = await getPartners();
  const index = current.findIndex((p) => p.id === partner.id);
  let updated: PartnerItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...partner, updatedAt: new Date().toISOString() };
  } else {
    updated = [...current, { ...partner, createdAt: new Date().toISOString() }];
  }
  localStorage.setItem(LOCAL_STORAGE_PARTNERS_KEY, JSON.stringify(updated));

  if (isFirebaseInitialized && db) {
    try {
      const docRef = doc(db, "partners", partner.id);
      await setDoc(docRef, {
        ...partner,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn("Firestore savePartner failed (saved locally):", e);
    }
  }
}

export async function deletePartner(partnerId: string): Promise<void> {
  const current = await getPartners();
  const updated = current.filter((p) => p.id !== partnerId);
  localStorage.setItem(LOCAL_STORAGE_PARTNERS_KEY, JSON.stringify(updated));

  if (isFirebaseInitialized && db) {
    try {
      await deleteDoc(doc(db, "partners", partnerId));
    } catch (e) {
      console.warn("Firestore deletePartner failed:", e);
    }
  }
}

// --------------------------------------------------------------------------
// Gallery Management
// --------------------------------------------------------------------------

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (isFirebaseInitialized && db) {
    try {
      const colRef = collection(db, "gallery");
      const q = query(colRef, orderBy("sortOrder", "asc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => ({
          ...docSnap.data(),
          id: docSnap.id
        })) as GalleryItem[];
      }
    } catch (e) {
      console.warn("Could not fetch gallery from Firestore, falling back to local/seed:", e);
    }
  }

  const local = localStorage.getItem(LOCAL_STORAGE_GALLERY_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {}
  }

  return verifiedGalleryItems;
}

export async function saveGalleryItem(item: GalleryItem): Promise<void> {
  const current = await getGalleryItems();
  const index = current.findIndex((g) => g.id === item.id);
  let updated: GalleryItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...item, updatedAt: new Date().toISOString() };
  } else {
    updated = [...current, { ...item, createdAt: new Date().toISOString() }];
  }
  localStorage.setItem(LOCAL_STORAGE_GALLERY_KEY, JSON.stringify(updated));

  if (isFirebaseInitialized && db) {
    try {
      const docRef = doc(db, "gallery", item.id);
      await setDoc(docRef, {
        ...item,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn("Firestore saveGalleryItem failed (saved locally):", e);
    }
  }
}

export async function deleteGalleryItem(itemId: string): Promise<void> {
  const current = await getGalleryItems();
  const updated = current.filter((g) => g.id !== itemId);
  localStorage.setItem(LOCAL_STORAGE_GALLERY_KEY, JSON.stringify(updated));

  if (isFirebaseInitialized && db) {
    try {
      await deleteDoc(doc(db, "gallery", itemId));
    } catch (e) {
      console.warn("Firestore deleteGalleryItem failed:", e);
    }
  }
}
