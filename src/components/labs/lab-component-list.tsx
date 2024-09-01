import { DragAndDrop } from "./drag-n-drop/drag-n-drop"
import { WindowManager } from "./window-manager/window-manager"

export const labComponents = {
	"drag and drop": {
		meta: {
			description: "A simple drag and drop component",
			tags: [ "react", "dnd" ],
			libs: [
				{
					name: "react-dnd",
					url: "https://react-dnd.github.io/react-dnd/about"
				},
				{
					name: "Sonner",
					url: "https://sonner.emilkowal.ski/"
				}
			]
		},
		component: () => <DragAndDrop />,
	},
	"window manager": { meta: {
		description: "A simple window manager",
		tags: [ "react", "window" ],
		libs:[
			{
				name: "swapy",
				url: "https://swapy.tahazsh.com/"
			}
		],
	}, component: () => <WindowManager /> },
}
