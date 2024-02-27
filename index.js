const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Array to store team member objects
const teamMembers = [];

// Initialise function to ask questions about the team manager and then progress to the main menu function.
function init() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'managerName',
            message: "Please enter the team manager's name."
        },
    
        {
            type: 'input',
            name: 'managerID',
            message: "Please enter the team manager's ID."
        },
        
        {
            type: 'input',
            name: 'managerEmail',
            message: "Please enter the manager's email."
        },
        
        {
            type: 'input',
            name: 'managerOffice',
            message: "Please enter the manager's office number."
        },

    ])
    .then((answers) => {
        const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice)
        teamMembers.push(manager);
        mainMenu();
    })
}

//Main menu function to call addAnEngineer, addAnIntern, and finalise functions depending on choice.
function mainMenu () {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['Add an Engineer', 'Add an intern', 'Finish'],
        }              
        
    ])
    .then ((answers) => {
        switch (answers.mainMenu) {
            case "Add an Engineer":
                addAnEngineer();
                break;
        
            case "Add an intern":
                addAnIntern();
                break;

            case "Finish":
                finalise();
                break;
            
        }
    })
}

//Function to ask about an intern that will be added to the page. Calls the main menu function again on completion.
function addAnIntern () {
    inquirer
    .prompt ([
 
        {
            type: 'input',
            name: 'internName',
            message: 'Please enter the interns name',
        },
        
        {
            type: 'input',
            name: 'internID',
            message: 'Please enter the interns ID',
        },
        
        {
            type: 'input',
            name: 'internEmail',
            message: 'Please enter the interns email',
        },
        
        {
            type: 'input',
            name: 'internSchool',
            message: 'Please enter the interns school',
        },
        
    ])
    .then ((answers) => {
        const intern = new Intern (answers.internName, answers.internID, answers.internEmail, answers.internSchool);
        teamMembers.push(intern);
        mainMenu();
    })
}

//Function to ask about an engineer that will be added to the page. Calls the main menu function again on completion.
function addAnEngineer () {
    inquirer
    .prompt ([

        {
            type: 'input',
            name: 'engineerName',
            message: 'Please enter the engineers name',
        },
        
        {
            type: 'input',
            name: 'engineerID',
            message: 'Please enter the engineers ID',
        },
        
        {
            type: 'input',
            name: 'engineerEmail',
            message: 'Please enter the engineers email',
        },
        
        {
            type: 'input',
            name: 'engineerGitHub',
            message: 'Please enter the engineers GitHub',
        },
        
    ])
    .then ((answers) => {
        const engineer = new Engineer (answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGitHub);
        teamMembers.push(engineer);
        mainMenu();
    })
}

//Function to finalise the program and generate the HTML file. Checks if the output directory exists, and creates it if it doesnt, then recursively calls the finalise function again.
//Function will then generate the html file using the render function with the teamMembers array passed inside.
function finalise () {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
        finalise(); 
    }else {
    fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
    console.log("File created successfully.")
}}

//Call to initialise the application.
init();