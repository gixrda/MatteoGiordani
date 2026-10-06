import { notFound } from 'next/navigation';
import { PostView } from '@/views/PostView';
import { postMeta } from '@/lib/meta';
import { isPublished, loadPost, postParams, publishedSlugs } from '@/lib/posts';

type Props = { params: Promise<{ slug: string }> };

// One static page per published post in content/blog/it.
export const dynamicParams = false;
export const generateStaticParams = () => postParams('it');

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!(await isPublished('it', slug))) return {};
  return postMeta(await loadPost('it', slug), await publishedSlugs());
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!(await isPublished('it', slug))) notFound();
  return <PostView locale="it" slug={slug} />;
}
