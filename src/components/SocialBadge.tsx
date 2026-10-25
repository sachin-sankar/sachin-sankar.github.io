import type { SvgIconProps } from "@thesvg/react";
import type { ComponentType } from "react";

interface SocialBadgeProps {
	icon: ComponentType<SvgIconProps>;
	label: string;
	color: string;
	href: string;
}

export const SocialBadge = ({
	icon: Icon,
	label,
	color,
	href,
}: SocialBadgeProps) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="flex gap-1 items-center hover:opacity-80"
		style={{ color }}
	>
		<Icon variant={"mono"} fill={color} className="size-4 lg:size-6" />
		<span>{label}</span>
	</a>
);
