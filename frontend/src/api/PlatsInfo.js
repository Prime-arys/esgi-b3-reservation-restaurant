import { FetchWraper } from "../utils/FetchWraper";
import { API } from "../utils/Vars";
import { Plat } from "../models/Plat";


export async function getPlatsInfo() {

    const fw = new FetchWraper();
    fw.method = "GET";
    fw.url = API + "/menu";

    const res = await fw.fetchw();

    switch (res.status) {
        case 200:
            return (await res.json()).map(plat => Plat.fromJSON(plat));
        default:
            return null;
    }

}