import Request from "../../../../lib/request/request"

export default class LoginRequest extends Request<string> {

    constructor(email: string, password: string) {
        super({
            url: '/auth/login',
            method: "POST",
            withCredentials: true,
            data: {
                "email": email,
                "password": password
            }
        })
    }
}