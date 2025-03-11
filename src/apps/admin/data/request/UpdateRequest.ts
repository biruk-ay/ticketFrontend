import Request from "../../../../lib/request/request"

export default class UpdateRequest extends Request<string> {

    constructor(status: string, id: string) {
        super({
            url: '/admin/tickets/',
            method: "PUT",
            data: {
                "status": status,
                "id": id
            }
        })
    }
}