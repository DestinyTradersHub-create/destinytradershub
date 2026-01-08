// Google Ads conversion tracking utility

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    gtag_report_conversion: (url?: string) => boolean;
  }
}

const DERIV_SIGNUP_URL = "https://partners.deriv.com/rx?sidc=F310811B-4DCC-433A-B9AF-E14FA2AA0E6C&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942";

// Debounce flag to prevent duplicate conversion fires
let isConversionFiring = false;

export const trackDerivSignupClick = () => {
  // Prevent duplicate conversion fires
  if (isConversionFiring) {
    return;
  }
  
  isConversionFiring = true;
  
  // Fire the conversion event - let the native link handle navigation
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17748644314/sPBhCMqPotUbENqjm49C',
    });
  }
  
  // Reset flag after a short delay
  setTimeout(() => {
    isConversionFiring = false;
  }, 2000);
};
