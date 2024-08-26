import { Logo } from "@/components/ui/logo"
import { Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const RootComponent = () => {
	return (
		<div className="">
			<div className="border-b border-b-neutral-300">
				<div className="p-2 flex justify-between items-center gap-2  max-w-7xl mx-auto ">
					<Link
						to="/"
						className="text-md"
						activeProps={{
							className: "font-bold",
						}}
						activeOptions={{ exact: true }}
					>
						<Logo />
					</Link>
					<div className="flex items-center gap-4">
						<Link
							to="/lab"
							className="text-sm text-neutral-600"
							activeProps={{
								className: "text-indigo-600",
							}}
							activeOptions={{ exact: true }}
						>
							Lab
						</Link>
						<Link
							to="/about"
							className="text-sm text-neutral-600"
							activeProps={{
								className: "text-indigo-600",
							}}
							activeOptions={{ exact: true }}
						>
							About
						</Link>
					</div>
				</div>
			</div>
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
		</div>
	)
}
