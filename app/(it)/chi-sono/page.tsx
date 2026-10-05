import { AboutView } from '@/views/Pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('it', { page: 'about' });

export default function Page() {
  return <AboutView locale="it" />;
}
