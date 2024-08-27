import { cn } from "@/lib/utils"
import { ReactNode, SVGProps, useState } from "react"
import { DndProvider, DropTargetMonitor, useDrop } from "react-dnd"
import { HTML5Backend, NativeTypes } from "react-dnd-html5-backend"
import { toast } from "sonner"

export const DragAndDrop = () => {
	return (
		<DndRoot>
			<DropFile />
		</DndRoot>
	)
}

const DndRoot = ( { children }: { children: ReactNode } ) => {
	return <DndProvider backend={HTML5Backend}>{children}</DndProvider>
}

const DropFile = () => {
	const [ selectedFiles, setSelectedFiles ] = useState<Array<File>>( [] )

	const handleFileDrop = ( files: Array<File> ) => {
		if ( files ) {
			if ( files.length >= 2 || files?.length > 2 ) {
				return toast.error( "Only one file is allowed" )
			}
			for ( const f of files ) {
				if ( f ) {
					setSelectedFiles( ( prevFiles ) => [ ...prevFiles, f ] )
				}
			}
		}
	}

	const [ { canDrop, isOver }, dropRef ] = useDrop(
		() => ( {
			accept: [ NativeTypes.FILE ],
			drop( item: { files: Array<File> } ) {
				handleFileDrop( item.files )
			},
			canDrop() {
				return true
			},
			collect: ( monitor: DropTargetMonitor ) => {
				return {
					isOver: monitor.isOver(),
					canDrop: monitor.canDrop(),
				}
			},
		} ),
		[ handleFileDrop ],
	)

	const handleFileInput = ( e: React.ChangeEvent<HTMLInputElement> ) => {
		if ( e.target.files ) {
			handleFileDrop( [ ...e.target.files ] )
		}
	}

	const isActive = canDrop && isOver

	return (
		<div className="mx-auto max-w-md">
			<div
				ref={dropRef}
				className={cn( [
					"grid min-h-28 cursor-pointer place-items-center rounded-lg border-2 border-dashed",
					isOver ? "border-indigo-500 bg-blue-50" : "border-gray-300",
				] )}
			>
				<input
					type="file"
					multiple
					onChange={handleFileInput}
					className="hidden"
					id="fileInput"
				/>
				<label htmlFor="fileInput" className="cursor-pointer">
					{isActive ? (
						<p className="text-blue-500">Drop the files here ...</p>
					) : (
						<p>
							Drag & drop or <span className="text-indigo-500"> Choose file </span> to
							upload
						</p>
					)}
				</label>
			</div>

			{selectedFiles.length > 0 && (
				<div className="mt-4">
					<h4 className="mb-2 text-lg font-semibold">Previews:</h4>
					<div className="flex flex-col gap-2">
						{selectedFiles.map( ( file, index ) => {
							return (
								<div
									key={index}
									className="flex flex-col rounded-md border border-neutral-200 p-2"
								>
									<div className="flex gap-2">
										<FilePreview file={file} />
										<div className="flex flex-col gap-0.5">
											<span className="mt-1 text-sm font-medium text-neutral-900">
												{file.name}
											</span>
											<span className="mt-1 text-xs text-neutral-400">
												{formatBytes( file.size )}
											</span>
										</div>
									</div>
								</div>
							)
						} )}
					</div>
				</div>
			)}
		</div>
	)
}

const SUPPORTED_FORMATS = {
	images: [ "webp", "jpg", "jpeg", "png", "gif" ],
	videos: [ "mp4", "webm", "ogg" ],
}

const FilePreview: React.FC<{ file: File }> = ( { file } ) => {
	if ( !file ) return null

	const fileName = file.name.split( "." )
	const extension = file.name.includes( "." ) ? fileName[ fileName.length - 1 ] : "unknown"

	if ( SUPPORTED_FORMATS.images.includes( extension ) ) {
		const filePreview = URL.createObjectURL( file )
		return (
			<div className="grid size-fit place-items-center rounded-md border border-neutral-300 bg-neutral-50 p-1">
				<img
					src={filePreview}
					alt={file.name}
					className="aspect-square max-w-8 rounded object-cover"
				/>
			</div>
		)
	} else if ( SUPPORTED_FORMATS.videos.includes( extension ) ) {
		const filePreview = URL.createObjectURL( file )
		return (
			<div className="grid size-fit place-items-center rounded-md border border-neutral-300 bg-neutral-50 p-1">
				<video
					src={filePreview}
					className="aspect-square max-w-8 rounded object-cover"
					controls
				/>
			</div>
		)
	} else {
		return (
			<div className="grid size-fit place-items-center rounded-md border border-neutral-300 bg-neutral-50 p-1">
				<FileIcon className="aspect-square max-w-8 rounded object-cover" />
			</div>
		)
	}
}

const formatBytes = ( bytes: number, decimals = 2 ) => {
	if ( bytes === 0 ) return "0 Bytes"

	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = [ "Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ]

	const i = Math.floor( Math.log( bytes ) / Math.log( k ) )

	return parseFloat( ( bytes / Math.pow( k, i ) ).toFixed( dm ) ) + " " + sizes[ i ]
}

const FileIcon = ( props: SVGProps<SVGSVGElement> ) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 256 256" {...props}>
		<path d="m213.66 82.34-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8 8 0 0 0-2.34-5.66ZM160 51.31 188.69 80H160ZM200 216H56V40h88v48a8 8 0 0 0 8 8h48v120Z" />
	</svg>
)
