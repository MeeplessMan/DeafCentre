// Set some global styles for the page
document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.boxSizing = 'border-box';
document.body.style.backgroundColor = '#f4f7fa';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.height = '100vh';

// Create a main container for the buttons and label
const container = document.createElement('div');
container.style.width = '100%';
container.style.maxWidth = '600px';
container.style.padding = '20px';
container.style.backgroundColor = '#fff';
container.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
container.style.borderRadius = '12px';
container.style.textAlign = 'center';
container.style.position = 'relative'; // For home button positioning
container.style.paddingTop = '80px';
document.body.appendChild(container);

// Create the label: "Select Your Role"
const label = document.createElement('h2');
label.innerText = 'Select Your Role';
label.style.fontSize = '24px';
label.style.color = '#333';
label.style.marginBottom = '40px';
label.style.letterSpacing = '1px';
container.appendChild(label);

// Create a button element with text and styles
function createButton(text, bgColor, onClickFunction) {
    const button = document.createElement('button');
    button.innerText = text;
    button.style.padding = '15px 30px';
    button.style.margin = '10px';
    button.style.fontSize = '18px';
    button.style.backgroundColor = bgColor;
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '10px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
    button.style.transition = 'all 0.3s ease'; // Add hover animation effect
    button.onmouseover = () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    };
    button.onmouseout = () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
    };
    button.onclick = onClickFunction;
    container.appendChild(button);
}

// Button functions
function handleTeacherClick() {
    alert('Teacher button clicked');
}
function handleStudentClick() {
    alert('Student button clicked');
}
function handleInterpreterClick() {
    alert('Interpreter button clicked');
}
function handleSupportClick() {
    alert('Support button clicked');
}
function handleHomeClick() {
    alert('Home button clicked');
}

// Create the 3 main buttons (Teacher, Student, Interpreter)
createButton('Teacher', '#007bff', handleTeacherClick);
createButton('Student', '#28a745', handleStudentClick);
createButton('Interpreter', '#17a2b8', handleInterpreterClick);

// Create the Home button (Top-left with icon)
const homeButton = document.createElement('button');
homeButton.innerHTML = '🏠'; // Unicode for a house symbol
homeButton.style.position = 'absolute';
homeButton.style.top = '20px';
homeButton.style.left = '20px';
homeButton.style.padding = '10px';
homeButton.style.fontSize = '24px';
homeButton.style.backgroundColor = 'transparent';
homeButton.style.border = 'none';
homeButton.style.cursor = 'pointer';
homeButton.onclick = handleHomeClick;
document.body.appendChild(homeButton);

// Create the Support button (Top-right with icon)
const supportButton = document.createElement('button');
supportButton.innerHTML = '❓'; // Unicode for a question mark symbol
supportButton.style.position = 'absolute';
supportButton.style.top = '20px';
supportButton.style.right = '20px';
supportButton.style.padding = '10px';
supportButton.style.fontSize = '24px';
supportButton.style.backgroundColor = 'transparent';
supportButton.style.border = 'none';
supportButton.style.cursor = 'pointer';
supportButton.onclick = handleSupportClick;
document.body.appendChild(supportButton);
