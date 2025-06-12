import { FetchWraper } from "../utils/FetchWraper";
import { Register } from "../models/Register";
import { API } from "../utils/Vars";

export async function register(data) {
    const fw = new FetchWraper();
    fw.method = "POST";
    fw.url = API + "/users/register";
    fw.body = JSON.stringify(data.toJSON());

    const res = await fw.fetchw();

    switch (res.status) {
        case 201:
            return true
        case 401:
        case 409:
            return false;
        default:
            throw new Error("Connection failed with status: " + res.status);
    }
}