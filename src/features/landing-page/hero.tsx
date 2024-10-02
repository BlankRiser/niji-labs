import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

export const Hero = () => {
	return (
		<div className="flex flex-col items-center gap-4">
				<h1 style={{
					filter: "url(#blur-and-scale)",
				}} className="bg-logo bg-clip-text font-sansita text-7xl font-bold text-transparent">
					Niji Labs
				</h1>
				<svg width="0" height="0">
					<filter id="blur-and-scale" y="-50%" x="-50%" width="200%" height="200%">
					<feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blurred"  />
					<feColorMatrix type="saturate" in="blurred" values="1" />
					<feComposite in="SourceGraphic" operator="over" />
					</filter>
				</svg>
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
	)
}
