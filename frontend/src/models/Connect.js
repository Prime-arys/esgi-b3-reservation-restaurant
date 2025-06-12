

export class Connect {

    constructor(data) {
        if (data) {
            for (var property in data) {
                if (Object.prototype.hasOwnProperty.call(data, property))
                    (this)[property] = (data)[property];
            }
        }
    }

    init(_data) {
        if (_data) {
            for (var property in _data) {
                if (Object.prototype.hasOwnProperty.call(_data, property))
                    this[property] = _data[property];
            }
            this.email = _data["email"];
            this.password = _data["password"];
        }
    }

    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new Connect();
        result.init(data);
        return result;
    }

    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (Object.prototype.hasOwnProperty.call(this, property))
                data[property] = this[property];
        }
        data["email"] = this.email;
        data["password"] = this.password;
        return data;
    }
}







export class User {

    constructor(data) {
        if (data) {
            for (var property in data) {
                if (Object.prototype.hasOwnProperty.call(data, property))
                    (this)[property] = (data)[property];
            }
        }
    }

    init(_data) {
        if (_data) {
            for (var property in _data) {
                if (Object.prototype.hasOwnProperty.call(_data, property))
                    this[property] = _data[property];
            }
            this.fname = _data["fname"];
            this.lname = _data["lname"];
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
        for (var property in this) {
            if (Object.prototype.hasOwnProperty.call(this, property))
                data[property] = this[property];
        }
        data["fname"] = this.fname;
        data["lname"] = this.lname;
        data["role"] = this.role;
        return data;
    }
}


export class ResConnect {

    constructor(data) {
        if (data) {
            for (var property in data) {
                if (Object.prototype.hasOwnProperty.call(data, property))
                    (this)[property] = (data)[property];
            }
        }
    }

    init(_data) {
        if (_data) {
            for (var property in _data) {
                if (Object.prototype.hasOwnProperty.call(_data, property))
                    this[property] = _data[property];
            }
            this.message = _data["message"];
            this.token = _data["token"];
            this.user = _data["user"] ? User.fromJS(_data["user"]) : undefined;
        }
    }

    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new ResConnect();
        result.init(data);
        return result;
    }

    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (Object.prototype.hasOwnProperty.call(this, property))
                data[property] = this[property];
        }
        data["message"] = this.message;
        data["token"] = this.token;
        data["user"] = this.user ? this.user.toJSON() : undefined;
        return data;
    }
}
