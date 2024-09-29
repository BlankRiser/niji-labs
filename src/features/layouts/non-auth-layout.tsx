import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

export const NonAuthLayout = () => {
	return (
		<div className="grid h-[calc(100dvh-3rem)] place-items-center">
			<div className="flex flex-col items-center gap-4">
				<h1 className="bg-logo bg-clip-text text-2xl font-bold text-transparent md:text-7xl">Niji Labs</h1>
				<p>
					<span className="text-neutral-900">A collection of experiments and projects by </span>
					<span className="text-neutral-700">Ram Shankar Choudhary</span>
				</p>
				<div className="flex items-center justify-center gap-2">
					<Button asChild variant={"outline"}>
						<Link to={"/about"}>About</Link>
					</Button>
					<Button asChild variant="secondary">
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
