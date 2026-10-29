
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GoogleAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);

  return null;
}
