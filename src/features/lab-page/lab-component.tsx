import { labComponents } from "@/components/labs/lab-component-list"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { labComponentsRoute } from "@/router/non-auth-routes"
import { Monitor, Smartphone, Tablet } from "lucide-react"
import { ReactNode, useMemo, useRef, useState } from "react"
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
			<PreviewComponent
				preview={
					<div className="grid size-full max-h-[50dvh] place-items-center overflow-y-auto">
						<ComponentToRender />
					</div>
				}
				code={
					<div className=" size-full max-h-[50dvh] overflow-y-auto">
						<CodeBlock code={labComponent.code.toString()} />
					</div>
				}
			/>
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

type View = "preview" | "code"
const PreviewComponent = ( { preview, code }: { preview: ReactNode; code: ReactNode } ) => {
	const [ size, setSize ] = useState( 100 )
	const [ view, setView ] = useState<View>( "preview" )
	const ref = useRef<ImperativePanelHandle>( null )
	const matchesTablet = useMediaQuery( "(max-width: 780px)" )

	return (
		<div className="flex flex-col gap-1">
			<div className={cn( [ "flex items-center justify-end gap-1" ] )}>
				<ToggleGroup
					size={"sm"}
					type="single"
					className={cn( [ "rounded-md border border-neutral-200 p-0.5 text-neutral-500" ] )}
					value={view}
					onValueChange={( value ) => {
						if ( value ) {
							setView( value as View )
						}
					}}
				>
					<ToggleGroupItem value="preview">Preview</ToggleGroupItem>
					<ToggleGroupItem value="code">Code</ToggleGroupItem>
				</ToggleGroup>
				<ToggleGroup
					size={"sm"}
					type="single"
					className={cn( [
						matchesTablet ? "hidden" : "block",
						"rounded-md border border-neutral-200 p-0.5 text-neutral-500",
					] )}
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
			{view === "preview" ? (
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
						{preview}
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel collapsible>
						<div className="size-full bg-neutral-100" />
					</ResizablePanel>
				</ResizablePanelGroup>
			) : (
				<div id="code-panel" className="min-h-[50dvh] rounded-md border border-neutral-200">
					{code}
				</div>
			)}
		</div>
	)
}

