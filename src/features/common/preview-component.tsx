import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Monitor, Smartphone, Tablet } from "lucide-react"
import { ReactNode, useRef, useState } from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

const PANEL_SIZES = {
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

export const PreviewComponent = ( { preview, code }: { preview: ReactNode; code: ReactNode } ) => {
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
							setSize( PANEL_SIZES[ value as keyof typeof PANEL_SIZES ].left )
							ref.current?.resize( PANEL_SIZES[ value as keyof typeof PANEL_SIZES ].left )
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
					className="min-h-[calc(100dvh-14rem)] rounded-md border border-neutral-200"
				>
					<ResizablePanel
						collapsible={false}
						minSize={matchesTablet ? 100 : 25}
						ref={ref}
						defaultSize={size}
						className="max-h-[calc(100dvh-14rem)] border border-red-400 p-4"
					>
						{preview}
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel collapsible>
						<div className="size-full max-h-[calc(100dvh-14rem)] bg-neutral-100" />
					</ResizablePanel>
				</ResizablePanelGroup>
			) : (
				<div id="code-panel" className="min-h-[calc(100dvh-14rem)] rounded-md border border-neutral-200">
					{code}
				</div>
			)}
		</div>
	)
}