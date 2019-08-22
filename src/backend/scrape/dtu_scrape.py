import requests
from bs4 import BeautifulSoup

from grade_scraper import scrape_all_grades
from eval_scraper import scrape_all_evals

import json

'''
	Requires manually downloaded HTML-page called dtucourses.html located in scrape downloaded from http://kurser.dtu.dk/search?CourseCode=&SearchKeyword=&Department=1&Department=10&Department=11&Department=12&Department=13&Department=22&Department=23&Department=24&Department=25&Department=26&Department=27&Department=28&Department=29&Department=30&Department=31&Department=33&Department=34&Department=36&Department=38&Department=41&Department=42&Department=46&Department=47&Department=59&Department=IHK&Department=83&CourseType=&TeachingLanguage=
	Requires the script to be run from the repo parent folder
'''

def get_course_information():
	'''
	'''
	courses = dict()

	soup =  BeautifulSoup(open("src/backend/scrape/dtucourses.html"), "html.parser")
	
	result = soup.find(class_ = "panel panel-default")
	course_objects = result.table.tbody.find_all("tr")

	for course in course_objects:
		#skip headers
		if len(course.contents) < 4:
			continue
		
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
	
	return courses 



def scrape_all():
	'''
	Scrapes all course information, grades, evaluations for each course. 
	'''

	print("Reading course information ... ")
	raw_database = get_course_information()

	print("Beginning scraping process ... ")
	for course in raw_database:
		error = 0
		try:
			grade_info = scrape_all_grades(course)
			raw_database[course]["grades"] = grade_info
		except:
			error = 1
			print("\tGrade error", course)
			
		try:
			eval_info = scrape_all_evals(course)
			raw_database[course]["evals"] = eval_info

		except:
			error = 1
			print("\tEval error", course)

		if not error:
			print("Completely scraped", course)

	print("N scraped courses:", len(raw_database))

	with open('src/backend/data/complete_raw_data.json', 'w+') as fp:
		json.dump(raw_database, fp)


if __name__ == "__main__":
	scrape_all()