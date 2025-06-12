import { FetchWraper } from "../utils/FetchWraper";
import { API } from "../utils/Vars";
import { Slot } from "../models/Slot";


export async function getSlotInfo() {

    const fw = new FetchWraper();
    fw.method = "GET";
    fw.url = API + "/slots";

    const res = await fw.fetchw();

    switch (res.status) {
        case 200:
            return (await res.json()).map(slot => Slot.fromJSON(slot));
        default:
            return null;
    }

}