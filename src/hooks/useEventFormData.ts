import { useState, useEffect, useCallback } from "react";
import { getEventById } from "@/src/apis/events";
import { loadImageFilesFromUrls } from "@/src/utils/urlToFile.utils";

export const useEventFormData = (eventId: string) => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "offline",
    venueName: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    categoryId: 1,
    description: "",
    orgName: "",
    orgDescription: "",
    settingsMessage: "",
    settingsType: "public",
    settingsLink: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    localBranch: "",
    businessType: "company",
    thumbnail: null as File | null,
    banner: null as File | null,
    orgThumbnail: null as File | null,
  });

  // Load event data when component mounts
  useEffect(() => {
    const loadEventData = async () => {
      try {
        const eventData = await getEventById(eventId);
        if (eventData) {
          const imageFiles = await loadImageFilesFromUrls({
            thumbnail: eventData.thumbnail as string,
            banner: eventData.banner as string,
            org_thumbnail: eventData.org_thumbnail as string,
          });

          setFormData({
            eventName: eventData.name || "",
            eventType: eventData.type || "offline",
            venueName: eventData.name_address || "",
            province: eventData.province || "",
            district: eventData.district || "",
            ward: eventData.ward || "",
            street: eventData.street || "",
            categoryId: eventData.category_id || 0,
            description: eventData.description || "",
            orgName: eventData.org_name || "",
            orgDescription: eventData.org_description || "",
            settingsMessage: "",
            settingsType: "public",
            settingsLink: "",
            accountName: "",
            accountNumber: "",
            bankName: "",
            localBranch: "",
            businessType: "company",
            thumbnail: imageFiles.thumbnail,
            banner: imageFiles.banner,
            orgThumbnail: imageFiles.orgThumbnail,
          });
        }
      } catch (error) {
        console.error("Failed to load event data:", error);
      }
    };

    if (eventId) {
      loadEventData();
    }
  }, [eventId]);

  // Tạo các setter functions cho từng field
  const setEventName = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, eventName: value }));
  }, []);

  const setEventType = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, eventType: value }));
  }, []);

  const setVenueName = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, venueName: value }));
  }, []);

  const setProvince = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, province: value }));
  }, []);

  const setDistrict = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, district: value }));
  }, []);

  const setWard = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, ward: value }));
  }, []);

  const setStreet = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, street: value }));
  }, []);

  const setCategoryId = useCallback((value: number) => {
    setFormData(prev => ({ ...prev, categoryId: value }));
  }, []);

  const setDescription = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
  }, []);

  const setOrgName = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, orgName: value }));
  }, []);

  const setOrgDescription = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, orgDescription: value }));
  }, []);

  const setSettingsMessage = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, settingsMessage: value }));
  }, []);

  const setSettingsType = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, settingsType: value }));
  }, []);

  const setSettingsLink = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, settingsLink: value }));
  }, []);

  const setAccountName = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, accountName: value }));
  }, []);

  const setAccountNumber = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, accountNumber: value }));
  }, []);

  const setBankName = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, bankName: value }));
  }, []);

  const setLocalBranch = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, localBranch: value }));
  }, []);

  const setBusinessType = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, businessType: value }));
  }, []);

  const setThumbnail = useCallback((value: File | null) => {
    console.log("Setting thumbnail:", value);
    setFormData(prev => ({ ...prev, thumbnail: value }));
  }, []);

  const setBanner = useCallback((value: File | null) => {
    console.log("Setting banner:", value);
    setFormData(prev => ({ ...prev, banner: value }));
  }, []);

  const setOrgThumbnail = useCallback((value: File | null) => {
    console.log("Setting orgThumbnail:", value);
    setFormData(prev => ({ ...prev, orgThumbnail: value }));
  }, []);

  return { 
    formData, 
    setFormData,
    // Individual setters
    setEventName,
    setEventType,
    setVenueName,
    setProvince,
    setDistrict,
    setWard,
    setStreet,
    setCategoryId,
    setDescription,
    setOrgName,
    setOrgDescription,
    setSettingsMessage,
    setSettingsType,
    setSettingsLink,
    setAccountName,
    setAccountNumber,
    setBankName,
    setLocalBranch,
    setBusinessType,
    setThumbnail,
    setBanner,
    setOrgThumbnail,
  };
};