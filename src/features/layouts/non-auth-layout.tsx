import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

export const NonAuthLayout = () => {
	return (
		<div className="grid h-[calc(100dvh-3rem)] place-items-center">
			<div className="flex flex-col items-center gap-4">
				<h1 className="bg-logo bg-clip-text font-sansita text-2xl font-bold text-transparent md:text-7xl">
					Niji Labs
				</h1>
				<p>
					<span className="text-neutral-900">
						A collection of experiments and projects by{" "}
					</span>
					<span className="text-neutral-700">Ram Shankar Choudhary</span>
				</p>
				<div className="flex items-center justify-center gap-2">
					<Button asChild variant={"outline"}>
						<Link to={"/about"}>About</Link>
					</Button>
					<Button
						asChild
						variant={"outline"}
						className={cn( [
							"[background:linear-gradient(white,white)_padding-box,linear-gradient(to_top,#11998e,#38ef7d)_border-box]",	
							"hover:[background:linear-gradient(#f5f5f5,#f5f5f5)_padding-box,linear-gradient(to_top,#11998e,#38ef7d)_border-box]",							
							"rounded-lg border border-transparent",
						] )}
					>
						<Link to={"/lab"}>
							<span>Browse</span>
							<ArrowRight />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
