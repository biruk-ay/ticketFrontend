import Request from "../../../../lib/request/request"

export default class LogoutRequest extends Request<string> {

    constructor() {
        super({
            url: '/auth/logout',
            method: "POST",
            data: {}
        })
    }
}