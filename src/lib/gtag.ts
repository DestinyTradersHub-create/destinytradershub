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

export const trackDerivSignupClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  // Prevent default navigation - we'll handle it via callback
  e.preventDefault();
  
  // Prevent duplicate clicks
  if (isConversionFiring) {
    return;
  }
  
  isConversionFiring = true;
  
  if (typeof window !== 'undefined' && window.gtag_report_conversion) {
    // Use the global gtag_report_conversion function
    window.gtag_report_conversion(DERIV_SIGNUP_URL);
  } else if (typeof window !== 'undefined' && window.gtag) {
    // Fallback if global function isn't available
    const callback = () => {
      window.open(DERIV_SIGNUP_URL, '_blank');
    };
    
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17748644314/sPBhCMqPotUbENqjm49C',
      'event_callback': callback
    });
  } else {
    // Final fallback - just open the URL
    window.open(DERIV_SIGNUP_URL, '_blank');
  }
  
  // Reset flag after a short delay
  setTimeout(() => {
    isConversionFiring = false;
  }, 2000);
};
