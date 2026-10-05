import { ContactView } from '@/views/Pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('it', { page: 'contact' });

export default function Page() {
  return <ContactView locale="it" />;
}
