let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

function updateTotalAmount() {
    totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    totalAmountCell.textContent = totalAmount;
}

function renderExpenses() {
    expensesTableBody.innerHTML = '';
    expenses.forEach((expense, index) => {
        const newRow = expensesTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const editCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editExpense(index));
        editCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteExpense(index));
        deleteCell.appendChild(deleteBtn);
    });
    updateTotalAmount();
}

function addExpense() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    expenses.push({ category, amount, date });
    renderExpenses();
}

function editExpense(index) {
    const editedCategory = prompt('Enter the new category:');
    const editedAmount = prompt('Enter the new amount:');
    const editedDate = prompt('Enter the new date (YYYY-MM-DD):');

    if (editedCategory && editedAmount && editedDate) {
        expenses[index].category = editedCategory;
        expenses[index].amount = Number(editedAmount);
        expenses[index].date = editedDate;
        renderExpenses();
    }
}

function deleteExpense(index) {
    const confirmDelete = confirm('Are you sure you want to delete this expense?');
    if (confirmDelete) {
        expenses.splice(index, 1);
        renderExpenses();
    }
}

addBtn.addEventListener('click', addExpense);


renderExpenses();
