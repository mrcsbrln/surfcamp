import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";
import { BlogCard } from "@/components/BlogCard";
import { ContentList } from "@/components/ContentList";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogRoute() {
  const { blocks } = await loader("blog");
  return (
    <div className="blog-page">
      <BlockRenderer blocks={blocks} />;<p>Blog list section will go here</p>
      <ContentList
        headline="Ceckout out our latest articles"
        path="/api/articles"
        component={BlogCard}
        showSearch
      />
    </div>
  );
}
