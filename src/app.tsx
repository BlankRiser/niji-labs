import { RouterProvider } from "@tanstack/react-router"
import { router } from "./router/router"
import { Toaster } from "./components/ui/sonner"

export const App = () => {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	)
}
