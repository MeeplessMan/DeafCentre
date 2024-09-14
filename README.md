# DeafCentre
![DUT logo image](/public/images/dut-logo.jpg)

The current project is being coded in Javascript. It is using node.js as the runtime for running javascript code and npm package manage to install and manage packages.

## How to run
- You need to have node.js installed and npm package manager installed in order to run the project. Install [node.js](https://nodejs.org/en/download/prebuilt-installer) if it hasn't already been installed. The prebuilt installer already comes with npm package manager installed

- Follow the instructions and by the end it should be installed you can check in cmd(command promt) if it is instaled by typing: 
                    `node -v`
 And for npm you can check by typing: `npm --v`

- After node.js has been installed clone the repositary into a folder. From there you need to insall the packages for the project through npm package manager. You can do this by      typying `npm install` which installs all the dependancies listed int the package.json. 

- After all packages have been installed you can now run through project by typing in terminal:
                    `nodemon app`
 this runs the app.js file which opens a local server on your computer which waits for requests from your browser. You can test that it is recieving requests by typing in the url in your search bar: localhost:3000 - and this should direct you to the home page for the application.

- To close the server in vscode you need to need to click back on the terminal and use the keyboard shortcut `ctrl+C` on your keyboard to close the server

## Dependacies

- The packages currently installed are:

```javascript
"dependencies": {
    "ejs": "^3.1.10",
    "express": "^4.21.0",
    "lodash": "^4.17.21",
    "morgan": "^1.10.0",
    "mysql2": "^3.11.2"
}
- Fomor