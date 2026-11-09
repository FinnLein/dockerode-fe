import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import * as React from "react"

type TextTag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "label"

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive",
      accent: "text-accent-foreground",
      success: "text-green-500",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    weight: "normal",
  },
})

const tagClasses: Record<TextTag, string> = {
  h1: "text-3xl font-bold tracking-tight",
  h2: "text-2xl font-semibold tracking-tight",
  h3: "text-xl font-semibold tracking-tight",
  h4: "text-lg font-semibold tracking-tight",
  p: "text-base leading-7",
  span: "text-sm",
  div: "text-base",
  label:
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
}

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: TextTag
  children?: React.ReactNode
  htmlFor?: string
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = "span",
      className,
      children,
      variant,
      weight,
      htmlFor,
      ...props
    },
    ref
  ) => {
    const Tag = Component as React.ElementType

    return (
      <Tag
        ref={ref}
        className={cn(
          tagClasses[Component],
          textVariants({ variant, weight }),
          className
        )}
        htmlFor={Component === "label" ? htmlFor : undefined}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

Text.displayName = "Text"

export { Text, textVariants }
