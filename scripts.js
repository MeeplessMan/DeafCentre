function showTable() {
    // Hide all tables first
    document.querySelectorAll('.table-container').forEach(table => {
        table.style.display = 'none';
    });

    // Get the selected value from the dropdown
    const selectedValue = document.getElementById('tableSelect').value;

    // If an option is selected, show the corresponding table
    if (selectedValue) {
        document.getElementById(selectedValue).style.display = 'block';
    }
}

function applyFilter() {
    // Logic for filtering the tables based on your criteria
    alert("Filter applied!"); // Placeholder for actual filter logic
}
