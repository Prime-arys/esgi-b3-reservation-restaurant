import { FetchWraper } from "../utils/FetchWraper";
import { API } from "../utils/Vars";
import { Reservation, MyReservations } from "../models/MyReservation";


export async function getMyReservations() {

    const fw = new FetchWraper();
    fw.method = "GET";
    fw.url = API + "/my-reservations";

    const res = await fw.fetchw();

    switch (res.status) {
        case 200:
            return new MyReservations(await res.json()).reservations //.map(r => Reservation.fromJS(r));
        default:
            return [];
    }

}