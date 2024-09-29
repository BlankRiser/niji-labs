import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300",
	{
		variants: {
			variant: {
				default:
					"bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 active:bg-neutral-800",
				secondary:
					"bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200 active:bg-neutral-200/80 ",
				outline:
					"border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200",
				ghost: "hover:bg-neutral-100 hover:text-neutral-900",
				link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
				destructive:
					"bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 active:bg-red-600 dark:bg-red-900",
			},
			size: {
				default: "h-9 px-4 py-2",
				icon: "size-9",
				xs: "h-6 min-w-6 gap-1 rounded px-1 text-xs [&>svg]:size-3",
				sm: "h-8 min-w-8 gap-2 rounded px-3 text-sm [&>svg]:size-4",
				md: "h-10 min-w-10 gap-2 rounded-md px-3 text-base [&>svg]:size-4",
				lg: "h-12 min-w-12 gap-2 rounded-md px-3 text-base [&>svg]:size-4",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	( { className, variant, size, asChild = false, ...props }, ref ) => {
		const Comp = asChild ? Slot : "button"
		return (
			<Comp
				className={cn( buttonVariants( { variant, size, className } ) )}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = "Button"

export { Button, buttonVariants }
