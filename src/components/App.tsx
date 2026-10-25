/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
import {
	Blogger,
	Github,
	GnuPrivacyGuard,
	Goodreads,
	Letterboxd,
	Linkedin,
	Substack,
	Youtube,
} from "@thesvg/react";
import "../styles/global.css";
import Logo from "./assests/logo";
import { SocialBadge } from "./SocialBadge";

function App() {
	return (
		<div className="w-screen bg-onyx flex flex-col gap-0">
			<div className="w-screen h-screen flex justify-center items-center bg-[url('/hero-bg.svg')] bg-cover">
				<div className="flex flex-col font-sekuya text-[55px] lg:text-[150px] text-golden-orange items-center gap-0 leading-11 lg:leading-30">
					<span>Sachin</span>
					<span>Sankar</span>
				</div>
			</div>

			<div className="w-screen h-fit lg:h-screen grid grid-cols-1 lg:grid-cols-4">
				<div className="flex flex-col justify-center gap-8 font-red-rose text-white-smoke/85 text-lg lg:text-4xl self-center p-4 lg:ps-8 col-span-3">
					<div className="flex flex-col gap-1">
						<span>
							Developer from India. Building solutions to interesting problems &
							having some fun along the way.
						</span>
						<div className="flex gap-5">
							<SocialBadge
								color="#0a66c2"
								label="Linkedin"
								icon={Linkedin}
								href="https://www.linkedin.com/in/sachin-sankar/"
							/>
							<SocialBadge
								color="#2dba4e"
								label="Github"
								icon={Github}
								href="https://github.com/sachin-sankar"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<span>
							Sometimes i write about tech, the human experience, and everything
							in between.
						</span>
						<div className="flex gap-5">
							<SocialBadge
								color="#f56565"
								label="Writing"
								icon={Blogger}
								href="/blog"
							/>
							<SocialBadge
								color="#ff6719"
								label="Substack"
								icon={Substack}
								href="https://substack.com/@sachinsankar"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<span>
							Love consuming amazing pieces of content either in the form of
							feature films, YouTube documentaries, or books.
						</span>
						<div className="flex gap-3 lg:gap-5">
							<SocialBadge
								color="#40bcf4"
								label="Letterboxd"
								icon={Letterboxd}
								href="https://letterboxd.com/sachin-sankar/"
							/>
							<SocialBadge
								color="#c69259"
								label="Goodreads"
								icon={Goodreads}
								href="https://www.goodreads.com/user/show/184093236-sachin-sankar"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<span>
							Encryption is not a crime, never will be. I strongly believe in
							the right to encryption and privacy for all.
						</span>
						<div className="flex gap-5">
							<SocialBadge
								color="#0093DD"
								label="GPG Public Key"
								icon={GnuPrivacyGuard}
								href="https://keyserver.ubuntu.com/pks/lookup?op=get&search=0xa33ba241b4bc8310df63e510a536f62f57c64035"
							/>
						</div>
					</div>
				</div>
				<div className="relative overflow-hidden hidden lg:block">
					<Logo className="absolute -right-24 -top-24 w-full animate-[spin_60s_linear_infinite] fill-golden-orange" />
				</div>
				<div className="flex justify-center lg:hidden overflow-hidden">
					<Logo className="w-4/10 translate-y-1/2 animate-[spin_60s_linear_infinite] fill-golden-orange" />
				</div>
			</div>
		</div>
	);
}

export default App;
