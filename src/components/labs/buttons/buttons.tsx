import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

export const Buttons = () => {
	return (
		<div className="flex flex-col gap-4">
			{( [ "xs", "sm", "md", "lg" ] as const ).map( ( size ) => (
				<div key={size} className="flex gap-2">
					<CVAButton onlyIcon size={size} variant={"default"} />
					<CVAButton onlyIcon size={size} variant={"secondary"} />
					<CVAButton onlyIcon size={size} variant={"outline"} />
					<CVAButton onlyIcon size={size} variant={"destructive"} />
					<CVAButton onlyIcon size={size} variant={"ghost"} />
					<CVAButton onlyIcon size={size} variant={"link"} />
				</div>
			) )}

			{( [ "xs", "sm", "md", "lg" ] as const ).map( ( size ) => (
				<div key={size} className="flex gap-2">
					<CVAButton size={size} variant={"default"} />
					<CVAButton size={size} variant={"secondary"} />
					<CVAButton size={size} variant={"outline"} />
					<CVAButton size={size} variant={"destructive"} />
					<CVAButton size={size} variant={"ghost"} />
					<CVAButton size={size} variant={"link"} />
                   
				</div>
			) )}
		</div>
	)
}

type DefaultButtonProps = React.ComponentProps<"button"> &
	VariantProps<typeof baseButtonVariants> & { onlyIcon?: boolean }

const CVAButton: React.FC<DefaultButtonProps> = ( { onlyIcon, variant, size, ...props } ) => {
	return (
		<button className={cn( baseButtonVariants( { variant, size } ) )} {...props}>
			{onlyIcon ? <X /> : `Button 1 ${variant} ${size}`}
		</button>
	)
}

const baseButtonVariants = cva(
	"relative inline-flex select-none items-center justify-center whitespace-nowrap accent-red-600 transition-colors focus-visible:outline-none focus-visible:ring-1",
	{
		variants: {
			variant: {
				none: "",
				default:
					"bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 active:bg-neutral-800",
				secondary:
					"bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200 active:bg-neutral-200/80 ",
				outline:
					"border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200",
				ghost: "hover:bg-neutral-100 hover:text-neutral-900",
				link: "text-neutral-900 underline underline-offset-4 hover:text-indigo-600 dark:text-neutral-50",
				destructive:
					"bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 active:bg-red-600 dark:bg-red-900",
            },
			size: {
				xs: "h-6 min-w-6 gap-1 rounded px-1 text-xs [&>svg]:size-3",
				sm: "h-8 min-w-8 gap-2 rounded px-2 text-sm [&>svg]:size-3",
				md: "h-9 min-w-9 gap-2 rounded-md px-3 text-base [&>svg]:size-3",
				lg: "h-10 min-w-10 gap-2 rounded-md px-3 text-base [&>svg]:size-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
)
