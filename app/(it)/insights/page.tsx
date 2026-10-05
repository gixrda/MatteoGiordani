import { InsightsView } from '@/views/Pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('it', { page: 'insights' });

export default function Page() {
  return <InsightsView locale="it" />;
}
