import { Logo } from "@/components/ui/logo"
import { Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const RootComponent = () => {
	return (
		<div className="">
			<div className="border-b border-b-neutral-300">
				<div className="mx-auto flex max-w-7xl items-center justify-between  gap-2 p-2 ">
					<Link
						to="/"
						
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
								className: "underline underline-offset-4 underline-neutral-600",
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
