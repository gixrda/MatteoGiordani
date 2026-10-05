import { ServiceView } from '@/views/ServiceView';
import { pageMeta } from '@/lib/meta';
import { SERVICE_SLUGS, type ServiceSlug } from '@/lib/routes';

type Props = { params: Promise<{ slug: ServiceSlug }> };

export const dynamicParams = false;
export const generateStaticParams = () => SERVICE_SLUGS.map((slug) => ({ slug }));
export const generateMetadata = async ({ params }: Props) => pageMeta('it', { page: 'service', slug: (await params).slug });

export default async function Page({ params }: Props) {
  return <ServiceView locale="it" slug={(await params).slug} />;
}
