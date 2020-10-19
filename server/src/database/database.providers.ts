import * as rethink from "rethinkdb"

export const databaseProviders = [
	{
		provide: "RethinkProvider",
		useFactory: async (): Promise<rethink.Connection> => {
			return await rethink.connect({host:"rethink", port:28015, db:"vivi"})
		}
	}
]