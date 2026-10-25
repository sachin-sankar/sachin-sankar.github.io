import type { ReactNode } from "react";
import "../styles/global.css";
import Header from "./header";

interface BlogPostProps {
	title: string;
	description: string;
	pubDate: Date;
	banner?: string;
	tags: string[];
	readingTime: number;
	children: ReactNode;
}

export default function BlogPost({
	title,
	description,
	pubDate,
	banner,
	readingTime,
	children,
}: BlogPostProps) {
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(pubDate);

	return (
		<div className="min-h-screen bg-onyx text-aqua-haze font-Questrial flex flex-col selection:bg-golden-orange selection:text-onyx">
			<Header />
			<div className="flex flex-col lg:mx-auto lg:px-6 pt-10 gap-6 lg:gap-8 w-screen lg:w-6/10">
				{banner && (
					<img
						src={banner}
						alt={title}
						className="w-full object-cover max-h-48 lg:max-h-100 lg:rounded-sm border border-aqua-haze/10"
					/>
				)}

				<div className="flex flex-col ps-6 lg:ps-0 gap-3 pb-7">
					<h1 className="font-archivo lg:font-extrabold text-2xl lg:text-4xl lg:leading-[1.05] text-aqua-haze">
						{title}
					</h1>
					<p className="flex flex-col text-aqua-haze/50 text-xs lg:text-lg">
						<time
							dateTime={pubDate.toISOString()}
							className="text-golden-orange"
						>
							{formattedDate}
						</time>
						<span>{description}</span>
						<span className="text-aqua-haze/35">{readingTime} min read</span>
					</p>
				</div>
			</div>

			<main className="w-9/10 lg:w-6/10 lg:mx-auto ps-6 lg:px-6 pb-20">
				<article
					className="
						prose prose-invert max-w-none
						prose-p:text-sm lg:prose-p:text-xl prose-p:leading-relaxed prose-p:text-aqua-haze/85
						prose-headings:font-Questrial prose-headings:font-normal prose-headings:text-aqua-haze

						prose-h1:text-2xl prose-h1:my-5 prose-h1:font-semibold
						prose-h2:text-xl prose-h2:my-3 prose-h2:font-semibold
						prose-h3:text-lg prose-h3:my-1

						lg:prose-h1:text-4xl lg:prose-h1:my-7 lg:prose-h1:font-semibold
						lg:prose-h2:text-3xl lg:prose-h2:my-5 lg:prose-h2:font-semibold
						lg:prose-h3:text-2xl lg:prose-h3:my-3

						prose-a:text-golden-orange prose-a:underline prose-a:decoration-golden-orange/40 prose-a:underline-offset-4
						hover:prose-a:decoration-golden-orange

						prose-strong:font-normal prose-strong:text-aqua-haze
						prose-strong:border-b prose-strong:border-golden-orange

						prose-code:text-golden-orange prose-code:bg-golden-orange/10 prose-code:rounded-sm
						prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal
						prose-code:before:content-[''] prose-code:after:content-['']
						[&_pre_code]:p-0 [&_pre_code]:bg-transparent [&_pre_code]:text-inherit
            prose-code:text-xs lg:prose-code:text-lg

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
