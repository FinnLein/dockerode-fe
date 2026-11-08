import { Card, CardHeader, CardTitle } from '@/src/shared/components/ui/card'
import Link from 'next/link'

const AdminPage = () => {
	return <div>
		<Card>
			<CardHeader>
				<CardTitle>
					<Link href={'/admin/tasks'}>
						Задачи
					</Link>
				</CardTitle>
			</CardHeader>
		</Card>
	</div>
}

export { AdminPage }

