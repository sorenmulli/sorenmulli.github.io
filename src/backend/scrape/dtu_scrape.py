import requests
from bs4 import BeautifulSoup


def scrape_grades(course_n, wanted_strings = ["Fremmødte", "Antal bestået", "Eksamensgennemsnit"]):
	"""


	TODO:
		-- Request error handling
		-- Choice of appropiate grade information
	"""
	course_information = dict()

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
	
	course_information["N_students"] = int(header_scraped_strings['Fremmødte']) #ERROR HANDLING!?!?!?!?
	course_information["N_passed"] = int(header_scraped_strings['Antal bestået'])
	course_information["Average"] = float(header_scraped_strings['Eksamensgennemsnit'].replace(',', '.'))

	####	
	grade_table = grade_info.find_all("table")[1]
	
	# print([grade.prettify for grade in grades])

if __name__ == "__main__":
	scrape_grades('01005')