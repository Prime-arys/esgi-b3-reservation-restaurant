import { FetchWraper } from "../utils/FetchWraper.js";
import { API } from "../utils/Vars.js";
import { Reservations } from "../models/Reservations.js";


export async function getReservations() {
    const fw = new FetchWraper();
    fw.method = "GET";
    fw.url = API + "/reservations";

    const res = await fw.fetchw();

    switch (res.status) {
        case 200:
            return new Reservations(await res.json()).reservations;
        default:
            return [];
    }
}

export async function validateReservation(id) {
    const fw = new FetchWraper();
    fw.method = "PATCH";
    fw.url = API + "/reservations/" + id + "/validate";

    const res = await fw.fetchw();

    switch (res.status) {
        case 200:
            return true;
        default:
            return false;
    }
}

export async function deleteReservation(id) {
    const fw = new FetchWraper();
    fw.method = "DELETE";
    fw.url = API + "/reservations/" + id;

    const res = await fw.fetchw();

    switch (res.status) {
        case 200:
            return true;
        default:
            return false;
    }
}