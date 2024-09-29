import { createRouter, ErrorComponent } from "@tanstack/react-router"
import {
	aboutRoute,
	labComponentsRoute,
	labIndexRoute,
	labRoute,
	nonAuthenticatedRoute,
} from "./non-auth-routes"
import { rootRoute } from "./root-route"
import { QueryClient } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"

const queryClient = new QueryClient()

const routeTree = rootRoute.addChildren( [
	nonAuthenticatedRoute.addChildren( [
		aboutRoute,
		labRoute.addChildren( [ labIndexRoute, labComponentsRoute ] ),
	] ),
] )

export const router = createRouter( {
	routeTree,
	defaultPendingMs: 0,
	context: {
		queryClient,
	},
	defaultPendingComponent: () => (
		<div className={`p-2 text-2xl`}>
			<Spinner />
		</div>
	),
	defaultErrorComponent: ( { error } ) => <ErrorComponent error={error} />,
	defaultPreload: "intent",
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
} )

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}
