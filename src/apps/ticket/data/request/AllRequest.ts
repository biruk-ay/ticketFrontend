import Request from "../../../../lib/request/request"

export default class AllRequest extends Request<string> {

    constructor(id: string) {
        super({
            url: `/ticket/tickets/${id}`,
            method: "GET",
            data: { }
        })
    }
}