import { HomeView } from '@/views/HomeView';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('it', { page: 'home' });

export default function Page() {
  return <HomeView locale="it" />;
}
