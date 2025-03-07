import Request from "../../../../lib/request/request"

export default class CreateRequest extends Request<string> {

    constructor(title: string, description: string, status: string) {
        super({
            url: '/ticket/tickets',
            method: "POST",
            data: {
                "title": title,
                "description": description,
                "status": status
            }
        })
    }
}