import { DragAndDrop } from "./drag-n-drop/drag-n-drop"
import { MultiSelect } from "./multi-select/multi-select"
import { WindowManager } from "./window-manager/window-manager"

export const labComponents = {
	"drag and drop": {
		wip: true,
		meta: {
			createdAt: "2024-08-28",
			updatedAt: "2024-09-01",
			description: "A simple drag and drop component",
			tags: [ "react", "dnd" ],
			libs: [
				{
					name: "react-dnd",
					url: "https://react-dnd.github.io/react-dnd/about",
				},
				{
					name: "Sonner",
					url: "https://sonner.emilkowal.ski/",
				},
			],
		},
		component: () => <DragAndDrop />,
	},
	"window manager": {
		component: () => <WindowManager />,
		wip: true,
		meta: {
			createdAt: "2024-08-28",
			updatedAt: "2024-09-01",
			description: "A simple window manager",
			tags: [ "react", "window" ],
			libs: [
				{
					name: "swapy",
					url: "https://swapy.tahazsh.com/",
				},
			],
		},
	},
	"Multi-Select": {
		component: () => <MultiSelect />,
		wip: true,
		meta: {
			createdAt: "2024-08-28",
			updatedAt: "2024-09-01",
			description: "A simple multi select component",
			tags: [ "react", "cmdk" ],
			libs: [
				{
					name: "cmdk",
					url: "https://swapy.tahazsh.com/",
				},
			],
		},
	}
}
