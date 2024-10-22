function showTable() {
    const tables = document.querySelectorAll('.table-container');
    const selectedTable = document.getElementById('tableSelect').value;

    tables.forEach(table => {
        table.style.display = 'none'; // Hide all tables
    });

    if (selectedTable) {
        document.getElementById(selectedTable).style.display = 'block'; // Show selected table
    }
}

function applyFilter() {
    // Logic for filtering the tables based on your criteria
    alert("Filter applied!"); // Placeholder for actual filter logic
}
