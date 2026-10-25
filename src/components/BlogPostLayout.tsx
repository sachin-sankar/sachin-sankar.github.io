import type { ReactNode } from "react";
import "../styles/global.css";
import Header from "./header";

interface BlogPostLayoutProps {
	title: string;
	description: string;
	pubDate: Date;
	banner?: string;
	tags: string[];
	readingTime: number;
	children: ReactNode;
}

export default function BlogPostLayout({
	title,
	description,
	pubDate,
	banner,
	readingTime,
	children,
}: BlogPostLayoutProps) {
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(pubDate);

	return (
		<div className="min-h-screen bg-onyx text-aqua-haze font-Questrial flex flex-col selection:bg-golden-orange selection:text-onyx">
			<Header />
			<div className="flex flex-col mx-auto px-6 pt-10 gap-8 w-6/10">
				{banner && (
					<img
						src={banner}
						alt={title}
						className="w-full object-cover rounded-sm border border-aqua-haze/10"
					/>
				)}

				<div className="flex flex-col gap-3 pb-7 border-b border-aqua-haze/15">
					<h1 className="font-archivo font-extrabold text-4xl sm:text-5xl leading-[1.05] text-aqua-haze">
						{title}
					</h1>
					<p className="text-aqua-haze/50 text-lg">
						<time
							dateTime={pubDate.toISOString()}
							className="text-golden-orange"
						>
							{formattedDate}
						</time>
						<span className="ml-3">{description}</span>
						<span className="ml-3 text-aqua-haze/35">
							{readingTime} min read
						</span>
					</p>
				</div>
			</div>

			<main className="w-6/10 mx-auto px-6 pb-20">
				<article
					className="
						prose prose-invert max-w-none
						prose-p:text-xl prose-p:leading-relaxed prose-p:text-aqua-haze/85
						prose-headings:font-Questrial prose-headings:font-normal prose-headings:text-aqua-haze

						prose-h2:text-3xl prose-h2:mt-14 prose-h2:pl-4 prose-h2:border-l-2 prose-h2:border-golden-orange
						prose-h3:text-2xl prose-h3:mt-9

						prose-a:text-golden-orange prose-a:underline prose-a:decoration-golden-orange/40 prose-a:underline-offset-4
						hover:prose-a:decoration-golden-orange

						prose-strong:font-normal prose-strong:text-aqua-haze
						prose-strong:border-b prose-strong:border-golden-orange

						prose-code:text-golden-orange prose-code:bg-golden-orange/10 prose-code:rounded-sm
						prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal
						prose-code:before:content-[''] prose-code:after:content-['']
						[&_pre_code]:p-0 [&_pre_code]:bg-transparent [&_pre_code]:text-inherit

						prose-pre:bg-[#181818] prose-pre:border prose-pre:border-aqua-haze/10
						prose-pre:border-l-4 prose-pre:border-l-aqua-haze/20 prose-pre:rounded-sm

						prose-blockquote:border-l-golden-orange prose-blockquote:text-aqua-haze/70
						prose-li:marker:text-golden-orange prose-li:-my-3
						prose-img:rounded-sm prose-img:mx-auto
					"
				>
					{children}
				</article>
			</main>

			<footer className="border-t border-aqua-haze/15 py-10">
				<div className="mx-auto max-w-3xl px-6 text-center text-aqua-haze/40">
					Thanks for reading.{" "}
					<a
						href="/blog"
						className="text-golden-orange underline decoration-golden-orange/40 underline-offset-4 hover:decoration-golden-orange"
					>
						Browse more posts
					</a>
				</div>
			</footer>
		</div>
	);
}
