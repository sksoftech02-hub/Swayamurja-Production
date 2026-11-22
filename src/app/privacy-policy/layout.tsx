import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & India DPDP Act 2023 Notice',
  description:
    'Official Privacy Policy, Personal Data Protection Notice (DPDP Act, 2023), Data Principal Rights, Consent Withdrawal, and Grievance Officer contact for SwayamUrja Renewable Energy Pvt. Ltd.',
  alternates: {
    canonical: 'https://swayamurja.com/privacy-policy',
    languages: {
      'en-IN': 'https://swayamurja.com/privacy-policy?lang=en',
      'mr-IN': 'https://swayamurja.com/privacy-policy?lang=mr',
    },
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
