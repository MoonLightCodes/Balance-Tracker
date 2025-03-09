//localStorage.removeItem('bal');
localStorage.removeItem('transactions');
if (!localStorage.getItem('bal')) {
    localStorage.setItem('bal', 0);
}

const balance = document.getElementById('bal-text');
const dis = document.getElementById('dis');
const amt = document.getElementById('amt');
const add = document.getElementById('add');
const his = document.getElementById('transcations');
const ty = document.getElementById('type');

balance.innerText = `Balance: ₹ ${Number(localStorage.getItem('bal')).toLocaleString()}`;

window.addEventListener('load', () => {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        const t = document.createElement('h4');
        t.innerText = `₹ ${transaction.amount} ${transaction.type === 'income' ? 'Credited' : 'Debited'} on ${transaction.date} for ${transaction.discreption}`;
        t.setAttribute('class', 'his');
        his.append(t);
    });
});

add.addEventListener('click', () => {
    if (amt.value === '' || isNaN(amt.value) || Number(amt.value) <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (dis.value.trim() === '') {
        alert('Please enter a description.');
        return;
    }

    if (ty.value === 'expense' && Number(localStorage.getItem('bal')) < Number(amt.value)) {
        alert('Insufficient balance.');
        return;
    }

    if (ty.value === 'income') {
        localStorage.setItem('bal', Number(localStorage.getItem('bal')) + Number(amt.value));
    } else {
        localStorage.setItem('bal', Number(localStorage.getItem('bal')) - Number(amt.value));
    }

    balance.innerText = `Balance: ₹ ${Number(localStorage.getItem('bal')).toLocaleString()}`;

    const date = new Date().toLocaleString();

    const t = document.createElement('h4');
    t.innerText = `₹ ${amt.value} ${ty.value === 'income' ? 'Credited' : 'Debited'} on ${date} for ${dis.value}`;
    t.setAttribute('class', 'his');
    his.append(t);

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({ type: ty.value, amount: amt.value, date, discreption: dis.value });

    try {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
        console.error('Failed to save transaction:', error);
        alert('Failed to save transaction. Please try again.');
    }

    amt.value = '';
    dis.value = '';
    ty.value = 'income';
});