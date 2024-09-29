export const Why = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-4 p-8">
			<h1 className="text-2xl font-medium">
				About <span className="bg-logo bg-clip-text font-bold text-transparent">Niji</span>{" "}
				Labs
			</h1>
			<div className="flex flex-col gap-2 text-neutral-600">
				<p>
					<span className="mr-1 bg-logo bg-clip-text text-transparent">Niji</span>
					meaning "Rainbow" in Japanese, symbolizes the vibrant and diverse range of UI
					components, tools, and libraries that make up this lab space.
				</p>
				<p></p>
				<p>
					<span className="bg-logo bg-clip-text font-bold text-transparent">Niji</span>{" "}
					leverages a combination of CSS libraries and accessibility tools to create
					inclusive and beautiful user interfaces. I wanted a library like Shadcn for
					myself but using various libraries like ark-ui, ariakit...etc. Just as a rainbow
					encompasses a spectrum of colors,{" "}
					<span className="bg-logo bg-clip-text font-bold text-transparent">Niji</span>{" "}
					integrates multiple tools and libraries to cover a broad range of design and
					accessibility needs.
				</p>
			</div>
		</div>
	)
}
