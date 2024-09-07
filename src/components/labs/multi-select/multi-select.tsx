"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"

type Country = Record<"value" | "label", string>

const COUNTRIES = [
	{
		value: "IN",
		label: "India",
	},
	{
		value: "US",
		label: "United States",
	},
	{ value: "LU", label: "Luxembourg" },
	{ value: "IM", label: "Isle of Man" },
	{ value: "GR", label: "Greece" },
] satisfies Country[]

export const MultiSelect = () => {
	const inputRef = React.useRef<HTMLInputElement>( null )
	const [ open, setOpen ] = React.useState( false )
	const [ selected, setSelected ] = React.useState<Country[]>( [ COUNTRIES[ 0 ] ] )
	const [ inputValue, setInputValue ] = React.useState( "" )

	const handleUnselect = React.useCallback( ( country: Country ) => {
		setSelected( ( prev ) => prev.filter( ( s ) => s.value !== country.value ) )
	}, [] )

	const handleKeyDown = React.useCallback( ( e: React.KeyboardEvent<HTMLDivElement> ) => {
		const input = inputRef.current
		if ( input ) {
			if ( e.key === "Delete" || e.key === "Backspace" ) {
				if ( input.value === "" ) {
					setSelected( ( prev ) => {
						const newSelected = [ ...prev ]
						newSelected.pop()
						return newSelected
					} )
				}
			}
			if ( e.key === "Escape" ) {
				input.blur()
			}
		}
	}, [] )

	const selectables = COUNTRIES.filter( ( country ) => !selected.includes( country ) )

	return (
		<Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
			<div className="group rounded-md border border-neutral-400 p-2 text-sm focus-within:ring-1 focus-within:ring-indigo-400">
				<div className="flex flex-wrap gap-1">
					{selected.map( ( country ) => {
						return (
							<Badge key={country.value} variant="secondary">
								{country.label}
								<button
									className="ml-1 rounded-full outline-none ring-offset-white focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
									onKeyDown={( e ) => {
										if ( e.key === "Enter" ) {
											handleUnselect( country )
										}
									}}
									onMouseDown={( e ) => {
										e.preventDefault()
										e.stopPropagation()
									}}
									onClick={() => handleUnselect( country )}
								>
									<X className="size-3 text-neutral-400 hover:text-neutral-600" />
								</button>
							</Badge>
						)
					} )}
					{/* Avoid having the "Search" Icon */}
					<CommandPrimitive.Input
						ref={inputRef}
						value={inputValue}
						onValueChange={setInputValue}
						onBlur={() => setOpen( false )}
						onFocus={() => setOpen( true )}
						placeholder="Select Countries..."
						className="ml-2 flex-1 bg-transparent outline-none placeholder:text-neutral-400"
					/>
				</div>
			</div>
			<div className="relative mt-2">
				<CommandList>
					{open && selectables.length > 0 ? (
						<div className="bg-popover text-popover-foreground absolute top-0 z-10 w-full rounded-md border shadow-md outline-none animate-in">
							<CommandGroup className="h-full overflow-auto">
								{selectables.map( ( country ) => {
									return (
										<CommandItem
											key={country.value}
											onMouseDown={( e ) => {
												e.preventDefault()
												e.stopPropagation()
											}}
											onSelect={( value ) => {
												setInputValue( "" )
												setSelected( ( prev ) => [ ...prev, country ] )
											}}
											className={"cursor-pointer"}
										>
											{country.label}
										</CommandItem>
									)
								} )}
							</CommandGroup>
						</div>
					) : null}
				</CommandList>
			</div>
		</Command>
	)
}
