import { PrivacyView } from '@/views/Pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('en', { page: 'privacy' });

export default function Page() {
  return <PrivacyView locale="en" />;
}
