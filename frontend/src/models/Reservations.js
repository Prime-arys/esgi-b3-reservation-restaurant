

export class Reservations {

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
            this.user_id = _data['user_id'];
            this.reservation_id = _data['reservation_id'];
            this.number_of_people = _data['number_of_people'];
            this.date_ = _data['date_'];
            this.time_ = _data['time_'];
            this.status = _data['status'];
        }
    }

    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new Reservations();
        result.init(data);
        return result;
    }

    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        for (const property in this) {
            if (Object.prototype.hasOwnProperty.call(this, property))
                data[property] = this[property];
        }
        data['user_id'] = this.user_id;
        data['reservation_id'] = this.reservation_id;
        data['number_of_people'] = this.number_of_people;
        data['date_'] = this.date_;
        data['time_'] = this.time_;
        data['status'] = this.status;
        return data;
    }
}