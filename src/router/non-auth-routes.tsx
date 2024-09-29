import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./root-route"
import { Why } from "@/features/about-page/why"
import { Lab } from "@/features/lab-page/lab"
import { NonAuthLayout } from "@/features/layouts/non-auth-layout"
import { LabComponent } from "@/features/lab-page/lab-component"
import { z } from "zod"

export const nonAuthenticatedRoute = createRoute( {
	getParentRoute: () => rootRoute,
	path: "/",
	component: NonAuthLayout,
	staticData: {
		title: "Niji Labs",
		description: "A collection of experiments and projects by Ram Shankar Choudhary",
	},
} )

export const aboutRoute = createRoute( {
	getParentRoute: () => rootRoute,
	path: "/about",
	component: Why,
} )

export const labRoute = createRoute( {
	getParentRoute: () => rootRoute,
	path: "lab",
} )

const labIndexRouteSearchParams = z.object( {
	q: z.string().optional(),
} )

export const labIndexRoute = createRoute( {
	getParentRoute: () => labRoute,
	path: "/",
	component: Lab,
	validateSearch: ( search ) => labIndexRouteSearchParams.parse( search ),
} )

export const labComponentsRoute = createRoute( {
	getParentRoute: () => labRoute,
	path: "/$component",
	component: LabComponent,
} )
