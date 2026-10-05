"use client";

import { useEffect } from "react";

import { getAndroidIntentUrl, getAppEventUrl } from "@/lib/events";

type OpenInstalledAppProps = {
  eventId: string;
};

export function OpenInstalledApp({ eventId }: OpenInstalledAppProps) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("web") === "1") return;

    const storageKey = `confraria-open-app:${eventId}`;
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, "1");

    const android = /Android/i.test(navigator.userAgent);
    window.location.href = android ? getAndroidIntentUrl(eventId) : getAppEventUrl(eventId);
  }, [eventId]);

  return null;
}
