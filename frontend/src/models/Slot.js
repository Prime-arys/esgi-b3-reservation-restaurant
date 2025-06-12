export class Slot {
    constructor(slot_id, date_time, duration, available, comment) {
        this.slot_id = slot_id;
        this.date_time = date_time;
        this.duration = duration;
        this.available = available;
        this.comment = comment;
    }

    static fromJSON(json) {
        return new Slot(
            json.slot_id,
            new Date(json.date_time),
            json.duration,
            json.available,
            json.comment
        );
    }

    toJSON() {
        return {
            slot_id: this.slot_id,
            date_time: this.date_time,
            duration: this.duration,
            available: this.available,
            comment: this.comment
        };
    }
}