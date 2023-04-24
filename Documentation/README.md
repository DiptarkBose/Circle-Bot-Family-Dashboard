# Circle Bot Family Dashboard

## Setup steps

1. Download the complete folder.

2. Open the folder and run the command `npm install` to install all the dependencies.

3. Use `npm start` command to run the code on `http://localhost:3001/`.

4. Navigate to `http://localhost:3001/`.


# Project Components & Descriptions
This section describes the various components within the dashboard. Currently, we have been developing and testing this locally (i.e., hosted on `http://localhost:3001/`), but do want to eventually deploy it to a cloud instance.

## 1. Family Dashboard

The Web UI was coded using HTML, CSS and JavaScript. Here are the various features it houses:

- User profile Page: Displays the account holders bio information and the patients they are connected to with the current patient highlighted.

- Add family/friends Page: Allows the user to add new family members or friends to connect to the patient and store their information in the database.

- Events Page: Allows the user to add events into the database for the patient to be reminded with supporting detail such as the date, time and description.

- Interactions with Patient Page: Enables the user to see all the stored interactions the patient has had with the patient as well as the ability to add new ones.

## 3. MongoDB Database

- This is the central storage that all the data is stored, updated, and retrieved from. Data is added to the MongoDB database via the forms on the Dashboard, and fetched for the patient's Alexa Device as per needs.
