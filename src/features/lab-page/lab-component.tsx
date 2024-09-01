import { labComponents } from "@/components/labs/lab-component-list"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { labComponentsRoute } from "@/router/non-auth-routes"
import { Smartphone, Monitor, Tablet } from "lucide-react"
import { useRef, useState } from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

export const LabComponent = () => {
	const params = labComponentsRoute.useParams()
	const { component } = params

	const ComponentToRender =
		labComponents[ component as keyof typeof labComponents ].component ??
		( () => <div>Component not found</div> )

	return (
		<div className="flex flex-col gap-4 py-8">
			<h3 className="text-2xl font-medium capitalize">{component}</h3>
			<Resize>
				<div className="grid size-full place-items-center">
					<ComponentToRender />
				</div>
			</Resize>
		</div>
	)
}

const panelSizes = {
	desktop: {
		left: 100,
		right: 0,
	},
	tablet: {
		left: 50,
		right: 50,
	},
	mobile: {
		left: 25,
		right: 75,
	},
}

const Resize = ( { children }: { children: React.ReactNode } ) => {
	const [ size, setSize ] = useState( 100 )
	const ref = useRef<ImperativePanelHandle>( null )

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center justify-end">
				<ToggleGroup
					size={"xs"}
					type="single"
					className="rounded-md border border-neutral-200 p-0.5 text-neutral-500"
					defaultValue="desktop"
					onValueChange={( value ) => {
						if ( value ) {
							setSize( panelSizes[ value as keyof typeof panelSizes ].left )
							ref.current?.resize( panelSizes[ value as keyof typeof panelSizes ].left )
						}
					}}
				>
					<ToggleGroupItem value="mobile">
						<Smartphone className="size-4" />
					</ToggleGroupItem>
					<ToggleGroupItem value="tablet">
						<Tablet className="size-4" />
					</ToggleGroupItem>
					<ToggleGroupItem value="desktop">
						<Monitor className="size-4" />
					</ToggleGroupItem>
				</ToggleGroup>
			</div>
			<ResizablePanelGroup
				direction="horizontal"
				className="min-h-[50dvh] rounded-md border border-neutral-200"
			>
				<ResizablePanel
					collapsible={false}
					minSize={25}
					ref={ref}
					defaultSize={size}
					className="p-4"
				>
					{children}
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel collapsible>
					<div className="size-full bg-neutral-100" />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}
