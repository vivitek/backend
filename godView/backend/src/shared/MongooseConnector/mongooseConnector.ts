import { Injectable, DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"

@Injectable()
export class MongooseConnector {
    public constructor() {
        MongooseModule.forRoot(
            "mongodb://mongo:27017/vivi",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
    }
}
