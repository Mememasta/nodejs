let sqlite = require('../db/aa-sqlite')

exports.userInfo = async (id) => {
        try{
                await sqlite.open('./db/mydb.db');

                let result = {};
                let sql = {};
                let row = {};

                sql = "SELECT count(*) cnt FROM user WHERE id = ?";
                row = await sqlite.get(sql, [id])
                if(row.cnt <= 0)
                        throw new Error('Пользователя с id = ${id} не существует')

                sql = 'SELECT name FROM user WHERE id = ?';
                row = await sqlite.get(sql, [id]);
                result.name = row.name;

        

                return result;
        }
        finally {
                await sqlite.close();
        }
};
exports.getUserId = async (login, pass) => {
        try {
                await sqlite.open('./db/mydb.db');

                let sql = "SELECT id FROM user WHERE login = ? AND pass = ?";
                let row = await sqlite.get(sql, [login, pass]);
                let id = 0;
                if(row && row.id)
                        id = row.id;
                return id;
        }
        finally {
                await sqlite.close();
        }
};

exports.addUser = async (name, login, pass) => {
        try {
                await sqlite.open('./db/mydb.db');

                let sql = '';

                sql = 'INSERT INTO user (name, login, pass) VALUES (?, ?, ?)';
                await sqlite.run(sql, [name, login, pass]);

                sql = "SELECT last_insert_rowid() id";
                let row = await sqlite.get(sql, []);

                let id = 0;
                if(row && row.id)
                        id = row.id;

                return id;
        }
        finally {
                await sqlite.close();
        }
};
