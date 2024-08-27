import { Outlet } from "@tanstack/react-router"

export const NonAuthLayout = () => {
	return  <div className="mx-auto max-w-7xl px-2">
		<Outlet />
	</div>
}
