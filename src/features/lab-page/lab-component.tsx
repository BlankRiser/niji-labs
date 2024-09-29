import { labComponents } from "@/components/labs/lab-component-list"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { labComponentsRoute } from "@/router/non-auth-routes"
import { useMemo } from "react"
import { PreviewComponent } from "../common/preview-component"

export const LabComponent = () => {
	const params = labComponentsRoute.useParams()
	const { component } = params

	const labComponent = labComponents[ component as keyof typeof labComponents ]
	const ComponentToRender = useMemo(
		() => labComponent.component ?? ( () => <div>Component not found</div> ),
		[ labComponent.component ],
	)
	return (
		<div className="flex flex-col gap-4 py-8">
			<div className="flex flex-col gap-1">
				<div className="flex items-start gap-1">
					<h3 className="text-2xl font-medium capitalize">{component}</h3>
					{labComponent.wip && (
						<Badge variant={'outline'} className="w-fit">
							WIP
						</Badge>
					)}
				</div>
				<span className="text-base text-neutral-500">{labComponent.meta.description}</span>
			</div>
			<PreviewComponent
				preview={
					<div className="grid size-full max-h-[calc(100dvh-14rem)] place-items-center overflow-y-auto">
						<ComponentToRender />
					</div>
				}
				code={
					<div className="size-full max-h-[calc(100dvh-14rem)] overflow-y-auto">
						<CodeBlock code={labComponent.code.toString()} />
					</div>
				}
			/>
		</div>
	)
}





