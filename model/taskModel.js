const { ObjectId } = require("mongodb");
const ConncetDB = require("../util/singleConnection");

async function get() {
    return new Promise(async (resolve, reject) => {
        const db = await new ConncetDB().initial();
        const task = db.collection("task").find({}).toArray();
        resolve(task)
    })
}

async function findById(id) {
    return new Promise(async (resolve, reject) => {
        const db = await new ConncetDB().initial();
        const task = db.collection("task").findOne({ _id: new ObjectId(id) });
        resolve(task)
    })
}
async function insert(body) {
    return new Promise(async (resolve, reject) => {
        const db = await new ConncetDB().initial();
        const task = db.collection("task").insertOne({ status: "unfinished", ...body });
        resolve(task)
    })
}
async function updateStat(id, Body) {
    //  هنگام ارسال درخواست در پستمن بجای ابجکت یا جیسون از تکست معمولی بدون دابل کوتیشن استفاده کنید و درخواست را به سرور ارسال کنید
    return new Promise(async (resolve, reject) => {
        const db = await new ConncetDB().initial();
        const task = db.collection("task").updateOne({ _id: new ObjectId(id) }, {
            $set: {
                status: Body
            }
        });
        resolve(task)

    })
}

async function remove(id) {
    return new Promise(async (resolve, reject) => {
        const db = await new ConncetDB().initial();
        const deletetask = db.collection("task").deleteOne({ _id: new ObjectId(id) });
        resolve(deletetask);
    })
}

const models = {
    get,
    findById,
    insert,
    updateStat,
    remove
}

module.exports = models