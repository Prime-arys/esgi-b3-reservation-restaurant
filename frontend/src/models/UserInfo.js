

export class User {

    constructor(data) {
        if (data) {
            for (const property in data) {
                if (Object.prototype.hasOwnProperty.call(data, property))
                    (this)[property] = (data)[property];
            }
        }
    }

    init(_data) {
        if (_data) {
            for (const property in _data) {
                if (Object.prototype.hasOwnProperty.call(_data, property))
                    this[property] = _data[property];
            }
            this.email = _data["email"];
            this.fname = _data["fname"];
            this.lname = _data["lname"];
            this.phone = _data["phone"];
            this.role = _data["role"];
        }
    }

    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new User();
        result.init(data);
        return result;
    }

    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        for (const property in this) {
            if (Object.prototype.hasOwnProperty.call(this, property))
                data[property] = this[property];
        }
        data["email"] = this.email;
        data["fname"] = this.fname;
        data["lname"] = this.lname;
        data["phone"] = this.phone;
        data["role"] = this.role;
        return data;
    }
}


export class UserInfo {

    constructor(data) {
        if (data) {
            for (const property in data) {
                if (Object.prototype.hasOwnProperty.call(data, property))
                    (this)[property] = (data)[property];
            }
        }
    }

    init(_data) {
        if (_data) {
            for (const property in _data) {
                if (Object.prototype.hasOwnProperty.call(_data, property))
                    this[property] = _data[property];
            }
            this.message = _data["message"];
            this.user = _data["user"] ? User.fromJS(_data["user"]) : undefined;
        }
    }

    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new UserInfo();
        result.init(data);
        return result;
    }

    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        for (const property in this) {
            if (Object.prototype.hasOwnProperty.call(this, property))
                data[property] = this[property];
        }
        data["message"] = this.message;
        data["user"] = this.user ? this.user.toJSON() : undefined;
        return data;
    }
}
