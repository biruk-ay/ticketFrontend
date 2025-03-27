import Request from "../../../../lib/request/request"

export default class RefreshRequest extends Request<string> {

    constructor() {
        super({
            url: '/auth/refresh',
            method: "POST",
            withCredentials: true,
            data: {}
        })
    }
}