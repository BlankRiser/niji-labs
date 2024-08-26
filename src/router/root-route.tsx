
import { RootComponent } from "@/features/layouts/root-layout";
import { QueryClient } from "@tanstack/react-query";
import {
    createRootRouteWithContext
} from "@tanstack/react-router";


export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()( {
  component: RootComponent,
} );

