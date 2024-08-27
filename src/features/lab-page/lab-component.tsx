import { labComponents } from "@/components/labs/lab-component-list"
import { labComponentsRoute } from "@/router/non-auth-routes"


export const LabComponent = () => {
	const params = labComponentsRoute.useParams()
	const { component } = params

	const ComponentToRender =
		labComponents[ component as keyof typeof labComponents ] ??
		( () => <div>Component not found</div> )

	return (
		<div className="flex flex-col gap-4 py-8 ">
			<h3 className="text-2xl font-medium capitalize">{component}</h3>
			<div className="size-full rounded-md border border-neutral-200 p-4">
				<ComponentToRender />
			</div>
		</div>
	)
}


