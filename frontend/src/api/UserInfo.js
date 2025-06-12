import { FetchWraper } from "../utils/FetchWraper";
import { API } from "../utils/Vars";
import { UserInfo } from "../models/UserInfo";


export async function getUserInfo() {

    const fw = new FetchWraper();
    fw.method = "GET";
    fw.url = API + "/users/info";

    const res = await fw.fetchw();

    switch (res.status) {
        case 200:
            return new UserInfo(await res.json()).user;
        default:
            return null;
    }

}