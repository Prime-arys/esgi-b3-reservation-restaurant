const ROLES = require('../enums/userRole');
const bcrypt = require('bcrypt');

class User {

    #password_hash;

    constructor(user_id, email, pasword_hash, fname, lname, phone, role) {
        this.user_id = user_id;
        this.email = email;
        this.#password_hash = pasword_hash;
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.role = role || ROLES.CLIENT; // Default to CLIENT if no role is provided
    }

    static fromDbRow(row) {
        return new User(
            row.user_id,
            row.email,
            row.password_hash,
            row.fname,
            row.lname,
            row.phone,
            row.role
        );
    }

    verifyPassword(password) {
        return bcrypt.compareSync(password, this.#password_hash);
    }
}

module.exports = User;