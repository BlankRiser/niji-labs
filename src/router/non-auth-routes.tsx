import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import { Why } from "@/features/about-page/why";
import { Lab } from "@/features/lab-page/lab";
import { NonAuthLayout } from "@/features/layouts/non-auth-layout";
import { LabComponent } from "@/features/lab-page/lab-component";

export const nonAuthenticatedRoute = createRoute( {
	getParentRoute: () => rootRoute,
	path: "/",
    component: NonAuthLayout
} )
export const aboutRoute = createRoute( {
	getParentRoute: () => nonAuthenticatedRoute,
	path: "/about",
    component: Why
} )

export const labRoute = createRoute( {
	getParentRoute: () => nonAuthenticatedRoute,
	path: "lab",
} )
export const labIndexRoute = createRoute( {
	getParentRoute: () => labRoute,
	path: "/",
    component: Lab
} )
export const labComponentsRoute = createRoute( {
	getParentRoute: () => labRoute,
	path: "/$component",
    component: LabComponent
} )