import { labComponents } from "@/components/labs/lab-component-list"
import { Badge } from "@/components/ui/badge"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { labComponentsRoute } from "@/router/non-auth-routes"
import { Smartphone, Monitor, Tablet } from "lucide-react"
import { useMemo, useRef, useState } from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

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
							<Badge color="neutral" className="w-fit">
								WIP
							</Badge>
						)}
				</div>
				<span className="text-base text-neutral-500">{labComponent.meta.description}</span>
			</div>
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
	const matchesTablet = useMediaQuery( "(max-width: 780px)" )

	return (
		<div className="flex flex-col gap-1">
			<div className={cn( [ matchesTablet ? "hidden" : "flex", "tems-center justify-end" ] )}>
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
					minSize={matchesTablet ? 100 : 25}
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
