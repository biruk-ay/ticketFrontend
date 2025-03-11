import Request from "../../../../lib/request/request"

export default class SignupRequest extends Request<string> {

    constructor(name: string, email: string, password: string, role: string) {
        super({
            url: '/auth/signup',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                "name": name,
                "email": email,
                "password": password,
                "role": role
            }
        })
    }
}