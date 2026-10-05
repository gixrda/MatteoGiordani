import { ProjectView } from '@/views/ProjectView';
import { pageMeta } from '@/lib/meta';
import { PROJECT_SLUGS, type ProjectSlug } from '@/lib/routes';

type Props = { params: Promise<{ slug: ProjectSlug }> };

export const dynamicParams = false;
export const generateStaticParams = () => PROJECT_SLUGS.map((slug) => ({ slug }));
export const generateMetadata = async ({ params }: Props) => pageMeta('en', { page: 'work', slug: (await params).slug });

export default async function Page({ params }: Props) {
  return <ProjectView locale="en" slug={(await params).slug} />;
}
