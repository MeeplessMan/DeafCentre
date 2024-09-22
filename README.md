# DeafCentre
![DUT logo image](/public/images/dut-logo.jpg)

The current project is being coded in Javascript. It is using node.js as the runtime for running javascript code and npm package manage to install and manage packages.

## How to run
- You need to have node.js installed and npm package manager installed in order to run the project. Install [node.js](https://nodejs.org/en/download/prebuilt-installer) if it hasn't already been installed. The prebuilt installer already comes with npm package manager installed

- Follow the instructions and by the end it should be installed you can check in cmd(command promt) if it is instaled by typing: 
                    `node -v`
 And for npm you can check by typing: `npm --v`

- Node.js is now installed onto your computer. Now you need to change your Execution policy to unrestricted in the administrator window powershell by running the command:
                    `Set-ExecutionPolicy Unrestricted`
To check if the policy has been changed you can type the command: `Get-ExecutionPolicy`

- After changing your Execution policy to Unrestricted, you now need to install a package globally into your packages. In command prompt your need to type in:
                    `npm install -g nodemon`

- After node.js has been installed clone the repositary into a folder. From there you need to insall the packages for the project through npm package manager. You can do this by typying `npm install` which installs all the dependancies listed int the package.json. 

- After all packages have been installed you can now run through project by typing in terminal:
                    `nodemon app`
 this runs the app.js file which opens a local server on your computer which waits for requests from your browser. You can test that it is recieving requests by typing in the url in your search bar: localhost:3000 - and this should direct you to the home page for the application.

- To close the server in vscode you need to need to click back on the terminal and use the keyboard shortcut `ctrl+C` on your keyboard to close the server

## Database

- The database we are using for the project is MySQL. To make the database in your own MySQL server you will need to synchronize the EER diagram in your  MySQL workbench through reverse engineering.(The EER diagram will be uploaded)

- The database(deafcentre) so far is made up of 6 tables:
![Deafcentre ERD](/public/images/EER.png)
    - interpreters                               
    - interpreters_users
    - lecturers
    - lecturers_users
    - students
    - students_users

- Dummy data has bee made for all the user tables. Run the database.js file in terminal(`node database`) and this will add all the rows to the tables. This is so that you are able to test the bascic functionallity of the website for login and credentials authentication.

## Dependacies

- The packages currently installed are:

```javascript
    "bcrypt": "^5.1.1",
    "ejs": "^3.1.10",
    "express": "^4.21.0",
    "express-session": "^1.18.0",
    "lodash": "^4.17.21",
    "morgan": "^1.10.0",
    "mysql2": "^3.11.2"
```
