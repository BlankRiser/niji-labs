import { Outlet } from "@tanstack/react-router"

export const NonAuthLayout = () => {
	return  <div className="px-2 max-w-7xl mx-auto">
		<Outlet />
	</div>
}
