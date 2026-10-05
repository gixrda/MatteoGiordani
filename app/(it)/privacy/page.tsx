import { PrivacyView } from '@/views/Pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('it', { page: 'privacy' });

export default function Page() {
  return <PrivacyView locale="it" />;
}
