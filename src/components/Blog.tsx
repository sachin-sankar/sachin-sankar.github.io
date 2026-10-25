import "../styles/global.css";
import Header from "./header";

interface Post {
	slug: string;
	title: string;
	description: string;
	pubDate: Date;
	banner?: string;
	tags: string[];
	readingTime: number;
}

interface BlogProps {
	posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
	if (posts.length === 0) {
		return (
			<main className="mx-auto max-w-5xl px-6 py-14">
				<p className="text-center text-zinc-500">
					No posts yet. Check back soon.
				</p>
			</main>
		);
	}

	return (
		<main className="w-screen min-h-screen bg-onyx flex flex-col">
			<Header />
			<div>
				<div className="flex flex-col w-9/10 lg:w-5/10 mx-auto mt-2">
					<div className="flex justify-end gap-5 text-xs lg:text-lg">
						<a
							className="text-white/60 hover:text-white transition-all py-2"
							href="/"
						>
							Home
						</a>
						<a
							className="text-golden-orange transition-all border-b-4 border-b-golden-orange py-2"
							href="/"
						>
							Writing
						</a>
					</div>
					<div className="flex flex-col gap-2 py-5 font-Questrial">
						<span className="text-2xl lg:text-4xl text-aqua-haze font-Questrial font-semibold tracking-wide">
							Writing
						</span>
						<span className="text-sm lg:text-lg text-aqua-haze/50 w-3/4">
							Notes on tech, the human experience, and everything in between.
						</span>
					</div>
					<div className="flex flex-col w-full divide-y divide-aqua-haze/30">
						{posts.map((post) => {
							return (
								<a
									key={post.slug}
									href={`/blog/${post.slug}`}
									className="group flex flex-col lg:flex-row gap-2 lg:gap-20 items-start hover:ps-4 py-5 lg:py-10 transition-all cursor-pointer"
								>
									<div className="flex gap-2 font-Questrial items-center lg:items-start ">
										<span className="text-aqua-haze/70 text-4xl lg:text-6xl group-hover:text-golden-orange">
											{post.pubDate.toLocaleDateString("en-US", {
												day: "numeric",
											})}
										</span>
										<span className="text-aqua-haze/50 font-semibold text-xs lg:text-xl text-nowrap group-hover:text-golden-orange">
											{post.pubDate.toLocaleDateString("en-US", {
												month: "short",
												year: "numeric",
											})}
										</span>
									</div>
									<div className="flex flex-col gap-1">
										<span className="text-lg lg:text-3xl font-Questrial text-aqua-haze">
											{post.title}
										</span>
										<span className="text-md lg:text-xl font-Questrial text-aqua-haze/30">
											{post.description}
										</span>
									</div>
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</main>
	);
}
