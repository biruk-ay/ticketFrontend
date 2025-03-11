import Request from "../../../../lib/request/request"

export default class AllRequest extends Request<string> {

    constructor() {
        super({
            url: '/ticket/tickets/',
            method: "GET",
            data: { }
        })
    }
}