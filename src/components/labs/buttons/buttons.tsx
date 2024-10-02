import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

export const Buttons = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap gap-2">
				<CVAButton size={"md"} variant={"cta"}>
					cta
				</CVAButton>
				<CVAButton size={"md"} variant={"cta"}>
					<X />
				</CVAButton>
			</div>
			<div className="flex flex-wrap gap-2">
				<CVAButton size={"md"} variant={"default"}>
					<X />
				</CVAButton>
				<CVAButton size={"md"} variant={"secondary"}>
					<X />
				</CVAButton>
				<CVAButton size={"md"} variant={"outline"}>
					<X />
				</CVAButton>
				<CVAButton size={"md"} variant={"destructive"}>
					<X />
				</CVAButton>
				<CVAButton size={"md"} variant={"ghost"}>
					<X />
				</CVAButton>
				<CVAButton size={"md"} variant={"link"}>
					<X />
				</CVAButton>
			</div>
			<div className="flex flex-wrap gap-2">
				<CVAButton size={"md"} variant={"default"}>
					default
				</CVAButton>
				<CVAButton size={"md"} variant={"secondary"}>
					secondary
				</CVAButton>
				<CVAButton size={"md"} variant={"outline"}>
					outline
				</CVAButton>
				<CVAButton size={"md"} variant={"destructive"}>
					destructive
				</CVAButton>
				<CVAButton size={"md"} variant={"ghost"}>
					ghost
				</CVAButton>
				<CVAButton size={"md"} variant={"link"}>
					link
				</CVAButton>
			</div>
		</div>
	)
}

type DefaultButtonProps = React.ComponentProps<"button"> & VariantProps<typeof baseButtonVariants>

const CVAButton: React.FC<DefaultButtonProps> = ( {
	children,
	variant,
	size,
	className,
	...props
} ) => {
	return (
		<button className={cn( [ baseButtonVariants( { variant, size } ), className ] )} {...props}>
			{children}
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
					"bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-700 active:bg-neutral-800",
				secondary:
					"bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200 active:bg-neutral-200/80 ",
				outline:
					"border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200",
				ghost: "hover:bg-neutral-100 hover:text-neutral-900",
				link: "text-neutral-900 underline underline-offset-4 hover:text-indigo-600 dark:text-neutral-50",
				destructive:
					"bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 active:bg-red-600 dark:bg-red-900",
				cta: "border border-transparent text-neutral-900 transition-colors [background:linear-gradient(#fafafa,#fafafa)_padding-box,linear-gradient(to_top,#e0e7ff,#818cf8)_border-box] hover:[background:linear-gradient(#f5f5f5,#f5f5f5)_padding-box,linear-gradient(to_top,#c7d2fe,#818cf8)_border-box] active:[background:linear-gradient(#e5e5e5,#e5e5e5)_padding-box,linear-gradient(to_top,#c7d2fe,#818cf8)_border-box]",
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
