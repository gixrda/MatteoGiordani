import { ContactView } from '@/views/Pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('en', { page: 'contact' });

export default function Page() {
  return <ContactView locale="en" />;
}
