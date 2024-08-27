import { labComponents } from "@/components/labs/lab-component-list"
import { Input } from "@/components/ui/input"
import { labIndexRoute } from "@/router/non-auth-routes"
import { Link, useNavigate } from "@tanstack/react-router"

export const Lab = () => {
	const { search } = labIndexRoute.useSearch()
	const navigate = useNavigate( { from: labIndexRoute.fullPath } )

	return (
		<div className="mx-auto flex max-w-md flex-col gap-2 py-4">
			<Input
				type="text"
				placeholder="search components..."
				onChange={( e ) => {
					navigate( { search: () => ( { search: e.target.value } ) } )
				}}
			/>
			<div className="flex flex-col gap-2">
				{Object.keys( labComponents )
					.filter( ( c ) => c.includes( search ?? "" ) )
					.map( ( component ) => (
						<Link
							key={component}
							to={`/lab/${component}`}
							activeProps={{
								className: "text-indigo-600",
							}}
							className="rounded-md bg-neutral-100 p-2 capitalize text-neutral-800 transition-colors duration-150 ease-in-out hover:bg-indigo-100"
						>
							{component}
						</Link>
					) )}
			</div>
		</div>
	)
}
