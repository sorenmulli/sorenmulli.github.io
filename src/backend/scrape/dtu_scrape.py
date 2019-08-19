import requests
import json
from bs4 import BeautifulSoup
'''
	Requires manually downloaded HTML-page called dtucourses.html located in scrape downloaded from http://kurser.dtu.dk/search?CourseCode=&SearchKeyword=&Department=1&Department=10&Department=11&Department=12&Department=13&Department=22&Department=23&Department=24&Department=25&Department=26&Department=27&Department=28&Department=29&Department=30&Department=31&Department=33&Department=34&Department=36&Department=38&Department=41&Department=42&Department=46&Department=47&Department=59&Department=IHK&Department=83&CourseType=&TeachingLanguage=
	Requires the script to be run from the repo parent folder
'''


def data_versioning(course_n):
	page = requests.get('https://kurser.dtu.dk/course/%s/info' %course_n)
	soup = BeautifulSoup(page.text, 'html.parser')
	print(soup.prettify)
	box = soup.find(class_ = 'col-md-6')
	
	box_content = box.div.contents.find_all("div", _class = "bar")
	
	print(box_content)

def scrape_grades(course_n):
	"""

	TODO:
		-- Request error handling
		-- HTML and typecasting error handling
		-- Control information version
	"""
	course_information = dict()
	wanted_strings = ["Fremmødte", "Antal bestået", "Eksamensgennemsnit"]


	#HTTP request and BS parsing
	page = requests.get('http://karakterer.dtu.dk/Histogram/1/%s/Summer-2019' %course_n)
	soup = BeautifulSoup(page.text, 'html.parser')

	grade_info = soup.find(id = 'karsumForm')
	
	### Grab header information 
	header_td_list = grade_info.find_all('td', style = 'padding-right: 2em')
	header_scraped_strings = dict()
	for td in header_td_list:
		for wanted_string in wanted_strings:
			if wanted_string in td.string:
				info_td = td.parent.contents[3].string
				header_scraped_strings[wanted_string] = info_td.split()[0]
	
	course_information["N_exam"] = int(header_scraped_strings['Fremmødte']) #ERROR HANDLING!?!?!?!?
	course_information["N_passed"] = int(header_scraped_strings['Antal bestået'])
	course_information["exam_avg"] = float(header_scraped_strings['Eksamensgennemsnit'].replace(',', '.'))

	#### Grab grade table information
	grade_table = grade_info.find_all("table")[1]
	
	grade_Ns = list()
	for grade_td in grade_table.find_all("td", style = "text-align: center"):
		grade_Ns.append(int(grade_td.string))									#ERROR HANDLING!?!?!?!??!?!
	
	assert len(grade_Ns) == 9 #Assert that standard 7-step system has been used

	course_information["grade_dist"] = grade_Ns

	return course_information

def scrape_evals(course_n):
	"""
	TODO:
		-- Request error handling
		-- Control information version

	"""
	raise NotImplementedError
	course_information = dict()
	question_names = ["learning_answers", "participation_answers", "material_answers", "clear_answers", "connection_answers", "worklevel_answers", "prerequisite_answers", "good_answers"]

	#HTTP request and BS parsing
	page = requests.get('https://evaluering.dtu.dk/kursus/%s/177795' %course_n)
	soup = BeautifulSoup(page.text, 'html.parser')

	### Grab number of responses
	result_container = soup.find(id = "CourseResultsPublicContainer")
	n_tr = result_container.table.find_all("tr")[1]
	course_information["N_responses"] = int(n_tr.td.string)

	### Grab responses
	question_objects = soup.find_all(class_ = "ResultCourseModelWrapper grid_6 clearmarg")
	assert len(question_objects) == 9 # assert that only the nine questions are received

	for i, question in enumerate(question_objects[:8]):
		answerobject = question.find_all(class_ = "Answer_Result_Background")
		answers = list()

		for answer in answerobject:
			answers.append(int(answer.span.string))
		assert len(answers) == 5 # assert that only five possible answers are received

		course_information[question_names[i]] = answers

	return course_information

def get_course_information():
	'''
	'''
	courses = dict()

	soup =  BeautifulSoup(open("src/backend/scrape/dtucourses.html"), "html.parser")
	
	result = soup.find(class_ = "panel panel-default")
	course_objects = result.table.tbody.find_all("tr")

	for course in course_objects:
#		try:
			info = dict()
			
			#Using leftmost course information 
			course.contents[3].small
			info_string = course.contents[3].small.contents[0]
			info_list = info_string.split("|")
			
			#Course language and ECTS
			info["language"] = info_list[0].strip()
			info["ECTS"]  = info_list[1].split()[0]
			
			#Course time
			time_data = course.contents[3].small.contents[3:]
			info["time"] = " ".join([str(td.string).strip() if td.string is not None else "" for td in time_data]).strip()

			#Course level
			info["level"] = course.contents[5].string.strip()

			#Course number
			course_link = course.a["href"]
			course_n = course_link.split("/")[-1]

			courses[course_n] = {"info": info}


#		except:
#			print("Course information error: ", course)
	
	return courses 



def scrape_all_courses():
	raw_database = get_course_information()

	for course in raw_database:
		error = 0
		try:
			grade_info = scrape_grades(course)
			raw_database[course]["grade_info"] = grade_info
		except:
			error = 1
			print("\tGrade error", course)
			
		try:
			eval_info = scrape_evals(course)
			raw_database[course]["eval_info"] = eval_info

		except:
			error = 1
			print("\tEval error", course)

		if not error:
			print("Succesfully scraped", course)

	print("N scraped courses:", len(raw_database))

	with open('src/backend/data/raw_data.json', 'w+') as fp:
		json.dump(raw_database, fp)


if __name__ == "__main__":

	data_versioning("01005")	
