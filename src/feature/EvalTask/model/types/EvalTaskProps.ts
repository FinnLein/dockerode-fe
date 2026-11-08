import { TestCaseDto } from '@/generated/types';
import { Language } from '@/src/entities/tasks/model/types/tasks';

interface EvalTaskProps {
	key: string
	language: Language[]
	initialCode: { language: Language; template: string }[]
	testCases: TestCaseDto[]
	onRun: (dto: {
		code: string
		language: string
		testCases: TestCaseDto[]
	}) => void
	isPending: boolean
}

export type { EvalTaskProps };

