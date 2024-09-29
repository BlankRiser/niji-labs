import { cn } from "@/lib/utils"
import { useEffect, useLayoutEffect, useState } from "react"
import { createSwapy } from "swapy"

const DraggableCounter = ( { title, swapyItemId }: { title: string; swapyItemId: string } ) => {
	const [ count, setCount ] = useState( 0 )
	useEffect( () => {
		const id = setInterval( () => {
			setCount( ( c ) => c + 1 )
		}, 1000 )

		return () => clearInterval( id )
	}, [] )

	return (
		<div
			data-swapy-item={swapyItemId}
			className={cn( [
				"w-full rounded-md bg-gradient-to-br from-neutral-600 to-neutral-900 p-4 text-white",
			] )}
		>
			<span className="text-2xl">
				{title}: {count}
			</span>
		</div>
	)
}
export const WindowManager = () => {
	return (
		<div className="h-[75dvh] w-full">
			<div className="grid grid-cols-3 gap-2"></div>
			<DroppableArea />
		</div>
	)
}

const DroppableArea = () => {
	useLayoutEffect( () => {
		const container = document.querySelector( `#swapy-container` )!
		const swapy = createSwapy( container )
		swapy.onSwap( ( { data } ) => {
			localStorage.setItem( "slotItem", JSON.stringify( data.object ) )
		} )
	}, [] )

	return (
		<div>
			<div id="swapy-container" className="flex w-full flex-col gap-2">
				<div data-swapy-slot="1">
					<DraggableCounter swapyItemId={"1"} title={"Component 1"} />
				</div>
				<div className="grid grid-cols-2 gap-2">
					<div data-swapy-slot="2">
						<DraggableCounter swapyItemId={"2"} title={"Component 2"} />
					</div>
					<div data-swapy-slot="3">
						<DraggableCounter swapyItemId={"3"} title={"Component 3"} />
					</div>
				</div>
				<div data-swapy-slot="4">
					<DraggableCounter swapyItemId={"4"} title={"Component 4"} />
				</div>
			</div>
		</div>
	)
}
