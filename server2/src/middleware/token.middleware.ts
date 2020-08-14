import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { User } from "../users/schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { last } from "lodash"


@Injectable()
export class MiddlewareClass {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private jwtService: JwtService) {}

    async checkAuthentication(req, res, next: Function) {
        if (process.env.DEBUG) {
            req.user = this.userModel.create({
                email: "support@vincipit.com",
                password: "s3cur3dP@ssw0rd!",
                username: "hack3rm@n"
            })
            return next()
        }
        let token: string;
        if (req.headers.authorization)
            token = last(req.headers.authorization.split(" "))
        else if (req.query.token)
            token = req.query.token
        else
            return res.status(401).json({message: "No authentication provided"})

        try {
            const user = this.jwtService.decode(token)
            req.user = user
            return next()
        } catch (err) {
            return res.status(401).json({message: "Invalid token"})
        }
    }
}
