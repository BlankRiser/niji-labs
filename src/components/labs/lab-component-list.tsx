import { DragAndDrop } from "./drag-n-drop/drag-n-drop"
import { MultiSelect } from "./multi-select/multi-select"
import { SimpleTable } from "./table/simple-table"
import { WindowManager } from "./window-manager/window-manager"
import  DragAndDropCode  from "./drag-n-drop/drag-n-drop?raw"
import  MultiSelectCode  from "./multi-select/multi-select?raw"
import  SimpleTableCode  from "./table/simple-table?raw"
import  WindowManagerCode  from "./window-manager/window-manager?raw"

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
		code: DragAndDropCode,
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
		code: WindowManagerCode,
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
		code: MultiSelectCode,
	},
	"Table": {
		component: () => <SimpleTable />,
		wip: true,
		meta: {
			createdAt: "2024-09-07",
			updatedAt: "2024-09-07",
			description: "Variety of react table components",
			tags: [ "react", "react-table" ],
			libs: [
				{
					name: "@tanstack/react-table",
					url: "https://tanstack.com/table/latest",
				},
			],
		},
		code: SimpleTableCode,
	}
}
