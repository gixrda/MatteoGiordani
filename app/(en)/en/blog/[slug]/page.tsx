import { notFound } from 'next/navigation';
import { PostView } from '@/views/PostView';
import { postMeta } from '@/lib/meta';
import { isPublished, loadPost, postParams, publishedSlugs } from '@/lib/posts';

type Props = { params: Promise<{ slug: string }> };

// One static page per published post in content/blog/en.
export const dynamicParams = false;
export const generateStaticParams = () => postParams('en');

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!(await isPublished('en', slug))) return {};
  return postMeta(await loadPost('en', slug), await publishedSlugs());
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!(await isPublished('en', slug))) notFound();
  return <PostView locale="en" slug={slug} />;
}
