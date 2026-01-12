import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lepdy - Hebrew Learning for Kids',
  description: 'Interactive Hebrew learning app for children',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
