

export class Register {

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
            this.fname = _data["fname"];
            this.lname = _data["lname"];
            this.phone = _data["phone"];
        }
    }

    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new Register();
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
        data["fname"] = this.fname;
        data["lname"] = this.lname;
        data["phone"] = this.phone;
        return data;
    }
}
