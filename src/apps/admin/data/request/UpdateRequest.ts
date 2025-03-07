import Request from "../../../../lib/request/request"

export default class UpdateRequest extends Request<string> {

    constructor(status: string, id: string) {
        super({
            url: `/admin/tickets/${id}`,
            method: "PUT",
            data: {
                "status": status
            }
        })
    }
}