import { useState, useEffect, useCallback } from 'react';

type CookieConsentStatus = 'accepted' | 'declined' | null;

export function useCookieConsent() {
  const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedConsent = localStorage.getItem('cookie_consent') as CookieConsentStatus;
      setConsentStatus(storedConsent);
    }
  }, []);

  const acceptCookies = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie_consent', 'accepted');
      setConsentStatus('accepted');
    }
  }, []);

  const declineCookies = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie_consent', 'declined');
      setConsentStatus('declined');
    }
  }, []);

  return {
    consentStatus,
    acceptCookies,
    declineCookies,
    hasConsent: consentStatus === 'accepted',
    showBanner: isClient && consentStatus === null,
  };
}
