import requests
import json
from bs4 import BeautifulSoup


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
	"""
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

def get_course_numbers():
	'''
	Requires manually downloaded HTML-page called dtucourses.html from http://kurser.dtu.dk/search?CourseCode=&SearchKeyword=&Department=1&Department=10&Department=11&Department=12&Department=13&Department=22&Department=23&Department=24&Department=25&Department=26&Department=27&Department=28&Department=29&Department=30&Department=31&Department=33&Department=34&Department=36&Department=38&Department=41&Department=42&Department=46&Department=47&Department=59&Department=IHK&Department=83&CourseType=&TeachingLanguage=
	'''
	courses = list()

	soup =  BeautifulSoup(open("dtucourses.html"), "html.parser")
	
	result = soup.find(class_ = "panel panel-default")
	courses = result.table.tbody.find_all("tr")[1:]
	for course in courses[0:20]:
		print(course.contents[1].a)
	

def scrape_all_courses():

	pass

	#json.dumps()

if __name__ == "__main__":

	get_course_numbers()	