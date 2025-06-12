import { FetchWraper } from "../utils/FetchWraper";
import { Connect, ResConnect } from "../models/Connect";
import { API } from "../utils/Vars";

export async function connect(data) {
    const fw = new FetchWraper();
    fw.method = "POST";
    fw.url = API + "/users/connect";
    fw.body = JSON.stringify(data.toJSON());

    const res = await fw.fetchw();

    switch (res.status) {
        case 200:
            return new ResConnect(await res.json()).user;
        case 401:
            return null;
        default:
            throw new Error("Connection failed with status: " + res.status);
    }
}