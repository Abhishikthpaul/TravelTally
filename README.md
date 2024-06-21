# TravelTally

#### Description:

A website that can make lists by dragging and dropping items, and save them for future use

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup and Usage](#setup-and-usage)
- [Make-up of Program](#make-up-of-program)
- [Design Choices](#design-choices)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Introduction

## Technologies Used

- Python - version 3.11.2
- Flask
- SQLite db (sqlite3)
- HTML, CSS, Javascript
- JQuery (little bit)
- Jinja
- Bootstrap

## Features

- You can drag and drop items to make your list, and you can remove items by dragging them back to the sidebar.
- You can save your list with a name, which appears on the right side
- When you click on any one of the list names, it opens up that list for view and edit (Editing is not currently implemented)
- Click the 'Print' button to generate a specially formatted checklist
- Each item in the sidebar comes with an icon for better user experience.
- Users have to log in with username and password for **privacy**.

## Screenshots

![App](Screenshots/second_list.png)

<details>
  <summary>More images</summary>
  <figure>
    <img src="Screenshots/register.png" alt="Register"/>
    <figcaption style="text-align:center;">Fig.1 - Register</figcaption>
  </figure>
  <br>
  <figure>
    <img src="Screenshots/error.png" alt="Error"/>
    <figcaption style="text-align:center;">Fig.2 - Error</figcaption>
  </figure>
  <br>
  <figure>
    <img src="Screenshots/dragndrop.png" alt="Drag and drop"/>
    <figcaption style="text-align:center;">Fig.3 - Drag and drop</figcaption>
  </figure>
  <br>
  <figure>
    <img src="Screenshots/print_list.png" alt="Print"/>
    <figcaption style="text-align:center;">Fig.4 - Print preview</figcaption>
  </figure>
</details>

## Setup and Usage

Install the required packages using `pip install requirements.txt`

Run the program by **cd**-ing into the directory and typing `flask run`

## Make-up of Program

There are \_ main files pertaining to the program-

1. The `app.py` is

## Design Choices

-

## Acknowledgements

- This project was done as a part of CS50x course
- Many thanks to Prof. David Jay Malan who taught the course so well!

## Contact

Created by Abhishikth Paul - abhishikthpaul@gmail.com

Project link: https://github.com/Abhishikthpaul/TravelTally.git

<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->
