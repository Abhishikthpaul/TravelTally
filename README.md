# TravelTally
#### Description: 
A website that can make lists by dragging and dropping items, and save them for future use

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup and Usage](#setup-and-usage)
* [Make-up of Program](#make-up-of-program)
* [Design Choices](#design-choices)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

## Introduction

## Technologies Used
- Python
- fd

## Features
- You can drag and drop items to make your list, and you can remove items by dragging them back to the sidebar.
- You can save your list with a name, which appears on the right side
- You can view past lists on the right side of the screen. When you click on any one, it opens up that list for view and edit (Editing is not currently implemented)
- Print a list by clicking the Print button and it comes out specially formatted in a checklist format.
- Each item in the sidebar comes with an icon for better user experience.
- Users have to log in with username and password for **privacy**.



## Screenshots
![Main menu](./Screenshots/main%20menu.png)
  
![Quiz screen](./Screenshots/quiz.png)

## Setup and Usage
Install the required packages using `pip install requirements.txt`

Run the program by **cd**-ing into the directory and typing `python project.py`


## Make-up of Program
There are three main files pertaining to the program-

1. The `project.py` is the main program containing functions such as *display()* and *quiz()*

2. `test_project.py` is used for testing the important functions of the main program such as *time_diff()*, *check()* and *right_ans()* 

3. In the `country_times.csv`, the countries and their time differences are stored as a list of dictionaries


## Design Choices
* 



## Acknowledgements
- This project was done as a part of CS50x course
- Many thanks to Prof. David Jay Malan who taught the course so well!


## Contact
Created by Abhishikth Paul - abhishikthpaul@gmail.com

Project link: https://github.com/Abhishikthpaul/TimeZoneTeacher.git


<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

