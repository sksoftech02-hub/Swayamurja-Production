import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Root Super Admin | SwayamUrja Platform',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
