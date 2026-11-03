import { TaskResponseDto } from '@/generated/types'
import { Badge } from '@/src/shared/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/src/shared/components/ui/card'
import Link from 'next/link'

const TaskCard = ({ task }: { task: TaskResponseDto }) => {
	return (
		<Link
			href={`/tasks/${task.id}`}
			className="group transition-transform duration-200 hover:-translate-y-1"
		>
			<Card className="h-full transition-colors hover:border-primary/50 group-hover:shadow-md cursor-pointer">
				<CardHeader className="flex flex-row  justify-between pb-2">
					<CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
						Задача {task.title}
					</CardTitle>
					<Badge variant="secondary">{task.language}</Badge>
				</CardHeader>
			</Card>
		</Link>
	)
}

export { TaskCard }

