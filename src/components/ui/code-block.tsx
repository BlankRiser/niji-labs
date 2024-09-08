import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { codeToHtml } from "shiki/bundle/web"

type CodeBlockProps = {
	code: string
	isHidden?: boolean
	language?: string
	theme?: string
}

export const CodeBlock = ( { code, isHidden }: CodeBlockProps ) => {
	const [ html, setHtml ] = useState<string>( "" )

	useEffect( () => {
		codeToHtml( code, { lang: "typescript", theme: "vitesse-light" } ).then( ( value ) => {
			setHtml( value )
		} )
	}, [ code ] )

	return (
		<div className={cn( [ isHidden ? "hidden" : "overflow-auto rounded-md p-2" ] )} dangerouslySetInnerHTML={{ __html: html }} />
	)
}
