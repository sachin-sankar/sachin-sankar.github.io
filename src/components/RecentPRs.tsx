import { ExternalLink, GitBranch, GitPullRequestArrow } from "lucide-react";

interface PullRequest {
	html_url: string;
	title: string;
	repository_url: string;
	state: string;
}

export default function RecentPRs({ prs }: { prs: PullRequest[] | null }) {
	if (!prs) {
		return (
			<div className="flex flex-col lg:flex-row gap-1 lg:gap-4 lg:items-center">
				<div className="flex items-center gap-2 text-aqua-haze/60 text-sm font-medium lg:flex-col lg:items-start lg:gap-0 lg:border-e-2 lg:pe-4">
					<span>Recent</span>
					<span>Contributions</span>
				</div>
				<div className="flex items-center justify-start h-10">
					<div className="w-5 h-5 border-2 border-golden-orange border-t-transparent rounded-full animate-spin" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col lg:flex-row gap-1 lg:gap-4 lg:items-center">
			<div className="flex items-center gap-2 text-aqua-haze/60 text-sm font-medium lg:flex-col lg:items-start lg:gap-0 lg:border-e-2 lg:pe-4">
				<span>Recent</span>
				<span>Contributions</span>
			</div>
			<div className="flex gap-5 lg:gap-8 overflow-x-scroll">
				{prs.map((pr, i) => {
					const isClosed = pr.state === "closed";
					const Icon = isClosed ? GitBranch : GitPullRequestArrow;
					const iconColor = isClosed ? "#8957e5" : "#238636";
					return (
						<a
							key={i}
							href={pr.html_url}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-3 rounded-lg"
						>
							<div
								className="p-1 rounded-lg"
								style={{ backgroundColor: iconColor }}
							>
								<Icon
									size={18}
									className="shrink-0 transition-colors group-hover:brightness-125"
								/>
							</div>
							<div className="flex flex-col overflow-hidden">
								<span className="text-white-smoke text-sm lg:text-lg truncate group-hover:text-golden-orange transition-colors">
									{pr.title}
								</span>
								<span className="flex items-center gap-1 text-white-smoke/40 text-xs lg:text-sm truncate">
									{pr.repository_url.split("/").slice(-2).join("/")}
									<ExternalLink className="h-[1em] w-[1em]" />
								</span>
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
}
