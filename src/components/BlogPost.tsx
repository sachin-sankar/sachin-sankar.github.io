import "../styles/global.css";
import BlogPostLayout from "./BlogPostLayout";

interface BlogPostProps {
	title: string;
	description: string;
	pubDate: Date;
	banner?: string;
	tags: string[];
	readingTime: number;
	children: React.ReactNode;
}

export default function BlogPost({
	title,
	description,
	pubDate,
	banner,
	tags,
	readingTime,
	children,
}: BlogPostProps) {
	return (
		<BlogPostLayout
			title={title}
			description={description}
			pubDate={pubDate}
			banner={banner}
			tags={tags}
			readingTime={readingTime}
		>
			{children}
		</BlogPostLayout>
	);
}
