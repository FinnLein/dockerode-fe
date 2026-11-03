import * as React from 'react'
import { cn } from 'cn'

type TextVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'p'
	| 'span'
	| 'div'
	| 'label'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
	as?: TextVariant
	children?: React.ReactNode
}

const variantClasses: Record<TextVariant, string> = {
	h1: 'text-3xl font-bold tracking-tight',
	h2: 'text-2xl font-semibold tracking-tight',
	h3: 'text-xl font-semibold tracking-tight',
	h4: 'text-lg font-semibold tracking-tight',
	p: 'text-base leading-7',
	span: 'text-sm',
	div: 'text-base',
	label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
}

const Text = React.forwardRef<HTMLElement, TextProps>(
	({ as: Component = 'span', className, children, ...props }, ref) => {
		return (
			<Component
				ref={ref as any}
				className={cn(variantClasses[Component], className)}
				{...props}
			>
				{children}
			</Component>
		)
	}
)

Text.displayName = 'Text'

export { Text }