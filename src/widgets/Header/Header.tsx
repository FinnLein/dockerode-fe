import { HeaderLogo } from './ui/HeaderLogo/HeaderLogo'
import { ThemeToggle } from './ui/ThemeToggle/ThemeToggle'
import { UserMenu } from './ui/UserMenu/UserMenu'

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-16 max-w-7xl items-center justify-between p-4 sm:px-6 lg:p-8">
				<HeaderLogo />
				<div className="flex items-center gap-2">
					<UserMenu />
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}