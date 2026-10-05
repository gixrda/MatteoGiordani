import { InsightsView } from '@/views/Pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('en', { page: 'insights' });

export default function Page() {
  return <InsightsView locale="en" />;
}
