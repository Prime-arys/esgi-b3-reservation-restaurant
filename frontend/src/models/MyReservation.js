
export class Reservation {

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
            this.user_id = _data["user_id"];
            this.reservation_id = _data["reservation_id"];
            this.number_of_people = _data["number_of_people"];
            this.date_ = _data["date_"] ? new Date(_data["date_"].toString()) : undefined;
            this.time_ = _data["time_"];
            this.status = _data["status"];
        }
    }

    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new Reservation();
        result.init(data);
        return result;
    }

    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (Object.prototype.hasOwnProperty.call(this, property))
                data[property] = this[property];
        }
        data["user_id"] = this.user_id;
        data["reservation_id"] = this.reservation_id;
        data["number_of_people"] = this.number_of_people;
        data["date_"] = this.date_ ? this.date_.toISOString() : undefined;
        data["time_"] = this.time_;
        data["status"] = this.status;
        return data;
    }
}

export class MyReservations {

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
            if (Array.isArray(_data["reservations"])) {
                this.reservations = [];
                for (let item of _data["reservations"])
                    this.reservations.push(Reservation.fromJS(item));
            }
        }
    }

    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new MyReservations();
        result.init(data);
        return result;
    }

    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (Object.prototype.hasOwnProperty.call(this, property))
                data[property] = this[property];
        }
        if (Array.isArray(this.reservations)) {
            data["reservations"] = [];
            for (let item of this.reservations)
                data["reservations"].push(item.toJSON());
        }
        return data;
    }
}