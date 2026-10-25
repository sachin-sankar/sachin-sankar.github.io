import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import "../styles/global.css";

interface BlogCardProps {
	slug: string;
	title: string;
	description: string;
	pubDate: Date;
	banner?: string;
	tags: string[];
	readingTime: number;
}

export default function BlogCard({
	slug,
	title,
	description,
	pubDate,
	banner,
	tags,
	readingTime,
}: BlogCardProps) {
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(pubDate);

	return (
		<a
			href={`/blog/${slug}`}
			className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70"
		>
			{banner && (
				<div className="aspect-video w-full overflow-hidden rounded-t-2xl border-b border-zinc-800">
					<img
						src={banner}
						alt={title}
						className="h-full w-full object-cover"
					/>
				</div>
			)}
			<div className="flex flex-col p-6">
				<div className="flex items-start justify-between gap-4">
					<h2 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-violet-300">
						{title}
					</h2>
					<ArrowUpRight
						size={20}
						className="mt-1 shrink-0 text-zinc-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400"
					/>
				</div>

				<p className="mt-2 line-clamp-2 text-sm text-zinc-400">{description}</p>

				{tags?.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
						{tags.slice(0, 3).map((tag) => (
							<span
								key={tag}
								className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-300"
							>
								{tag}
							</span>
						))}
					</div>
				)}

				<div className="mt-5 flex items-center gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
					<span className="flex items-center gap-1.5">
						<Calendar size={13} />
						{formattedDate}
					</span>
					<span className="flex items-center gap-1.5">
						<Clock size={13} />
						{readingTime} min read
					</span>
				</div>
			</div>
		</a>
	);
}
