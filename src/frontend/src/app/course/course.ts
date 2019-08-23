export interface Courses {
	[key: string ] : Course
}

interface Course {
	info: {
		language: string,
		ECTS: number,
		time: string,
	},
	grades: {
		[key: string]: {
			N_exam: number,
			N_passed: number,
			exam_avg: number,
			grade_dist: number[],
		}
	},
	evals: {
		[key: string]: {
			N_responses: number,
			learning_answers: number[],
		}
	}
}

