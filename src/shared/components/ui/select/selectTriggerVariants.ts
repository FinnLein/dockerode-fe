import { cva } from 'class-variance-authority';

const selectTriggerVariants = cva(
	"flex w-fit items-center justify-between gap-1.5 rounded-md border border-input bg-input/20 whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
	{
		variants: {
			size: {
				xs: "h-5 px-2 text-[0.625rem]",
				sm: "h-6 px-2 text-sm/relaxed",
				default: "h-7 px-2 py-1.5 text-base/relaxed",
				lg: "h-8 px-2.5 text-lg/relaxed",
				xl: "h-10 px-3 text-xl/relaxed",
			},
		},
		defaultVariants: {
			size: "default",
		},
	}
)

export { selectTriggerVariants };

