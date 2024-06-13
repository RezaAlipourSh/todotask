const { MongoClient } = require("mongodb");

module.exports = class ConncetDB {

    #DB_URL = "mongodb://localhost:27017/todo";
    #db = null;

    async #connect() {
        try {
            let client = new MongoClient(this.#DB_URL);
            let db = client.db();
            return db;

        } catch (error) {
            console.log(error.message)
        }

    }

    async initial() {
        try {
            if (this.#db) {
                console.log("db already existed")
                return this.#db
            } else {
                this.#db = await this.#connect();
                return this.#db;
            }

        } catch (error) {
            console.log(error.message)
        }


    }
}


