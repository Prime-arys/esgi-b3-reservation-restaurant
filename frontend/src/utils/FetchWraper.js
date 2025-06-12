export class FetchWraper {

    constructor() {
        this.token = "";
        this.url = "";
        this.method = "";
        this.body = "";
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
        //this.headers.append("Access-Control-Allow-Origin", "*");
    };

    async fetchw() {

        const requestOptions = {
            method: this.method,
            headers: this.headers,
            redirect: "follow",
            credentials: "include",
        };
        if (this.method != "GET" && this.method != "HEAD") {
            requestOptions.body = this.body;
        }

        //console.log("fecth_wraper", this.url, this.method, this.data);
        return fetch(this.url, requestOptions)
            //.then((response) => response.json())
            .then((result) => {
                //console.log("FecthWraper", result);
                return result;
            })
            .catch((error) => {
                console.error("FecthWarper", error);
                return error;
            });

    };

}