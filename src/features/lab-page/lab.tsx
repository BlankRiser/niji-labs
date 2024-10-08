import { labComponents } from "@/components/labs/lab-component-list"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { labIndexRoute } from "@/router/non-auth-routes"
import { Link, useNavigate } from "@tanstack/react-router"

export const Lab = () => {
	const { q } = labIndexRoute.useSearch()
	const navigate = useNavigate( { from: labIndexRoute.fullPath } )

	return (
		<div className="mx-auto flex max-w-md flex-col gap-2 py-4">
			<Input
				autoFocus
				type="text"
				placeholder="Search components..."
				onChange={( e ) => {
					navigate( { search: () => ( { q: e.target.value } ) } )
				}}
			/>
			<div className="flex flex-col gap-1">
				{Object.entries( labComponents )
					.filter( ( [ c, _ ] ) => c.toLowerCase().includes( q?.toLowerCase() ?? "" ) )
					.map( ( [ component, data ], index ) => (
						<Link
							key={index}
							to={`/lab/${component}`}
							activeProps={{
								className: "text-indigo-600",
							}}
							className="rounded-md border border-neutral-100 px-2 py-1 capitalize text-neutral-800 transition-colors duration-150 ease-in-out hover:bg-neutral-50"
						>
							<div className="flex items-center justify-between">
								<span className="text-sm">{component}</span>
								{data.wip && <Badge>WIP</Badge>}
							</div>
						</Link>
					) )}
			</div>
		</div>
	)
}
