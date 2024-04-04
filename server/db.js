const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(filePath) {
        this.db = new sqlite3.Database(filePath);
        this.init();
    }

    init() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE IF NOT EXISTS expenses (date TEXT, type TEXT, cost INTEGER, item TEXT, desc TEXT)');
        });
    }

    addExpense(date, type, cost, item, desc) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO expenses (date, type, cost, item, desc) VALUES (?, ?, ?, ?, ?)', [date, type, cost, item, desc], (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve('Expense added successfully');
                }
            });
        });
    }

    getExpenses() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM expenses', (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }

}

module.exports = Database;
