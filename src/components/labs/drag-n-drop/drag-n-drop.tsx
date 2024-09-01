import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { File, Trash } from "lucide-react"
import { ReactNode, useState } from "react"
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
		<div className="mx-auto flex w-full max-w-xl flex-col gap-2">
			<div
				ref={dropRef}
				className={cn( [
					"grid min-h-28 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-neutral-100 transition-colors hover:bg-neutral-50",
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
				<div className="flex max-h-56 flex-col gap-1 overflow-y-auto rounded-md border border-neutral-200 p-1">
					{selectedFiles.map( ( file, index ) => {
						return (
							<div
								key={index}
								className="flex flex-col rounded-md border border-neutral-100 bg-neutral-50 p-0.5"
							>
								<div className="flex gap-2">
									<div className="w-10">
										<FilePreview file={file} />
									</div>
									<div className="flex w-full flex-row items-center justify-between">
										<div className="flex flex-col items-start justify-between gap-0.5">
											<span className="text-sm font-medium text-neutral-600">
												{file.name}
											</span>
											<span className="text-xs font-light text-neutral-400">
												{formatBytes( file.size )}
											</span>
										</div>
										<div>
											<Button
												size={"icon"}
												variant={"ghost"}
												onClick={( ) => {
													setSelectedFiles(
														selectedFiles.filter( ( _, i ) => i !== index ),
													)
												}}
											>
												<Trash size={16} className="text-red-600" />
											</Button>
										</div>
									</div>
								</div>
							</div>
						)
					} )}
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
			<div className="grid h-full place-items-center rounded-md p-1">
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
			<div className="grid size-fit place-items-center rounded-md p-1">
				<video
					src={filePreview}
					className="aspect-square max-w-8 rounded object-cover"
					controls
				/>
			</div>
		)
	} else {
		return (
			<div className="grid h-full place-items-center rounded-md p-1">
				<File className="aspect-square max-w-8 stroke-1 text-neutral-400" />
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
