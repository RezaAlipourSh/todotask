const model = require("../model/taskModel");


async function findAll(req, res) {
    try {
        const task = await model.get();
        res.writeHead(200, { 'Content-type': 'Application/json' });
        res.write(JSON.stringify(task))
        res.end()
    } catch (error) {
        console.log(error.message)
    }

}
async function findById(req, res) {
    try {
        const id = req.url.split('/').at(-1);
        const idFinder = await model.findById(id)
        if (!idFinder) {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.write("task not found in our database")
            res.end()
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            console.log(idFinder)
            res.write(JSON.stringify(idFinder))
            res.end()
        }

    } catch (error) {
        console.log(error.message)
    }
}
async function insert(req, res) {
    let body = '';
    try {
        req.on('data', (data) => {
            body += data.toString();
        })
        req.on('end', async () => {
            const todo = { ...JSON.parse(body) }
            const task = await model.insert(todo);
            res.writeHead(201, { 'Content-type': 'application/json' })
            res.write(JSON.stringify(task))
            res.end()

        })



    } catch (error) {
        console.log(error.message)
    }
}
async function updateStat(req, res) {
    //  هنگام ارسال درخواست در پستمن بجای ابجکت یا جیسون از تکست معمولی بدون دابل کوتیشن استفاده کنید و درخواست را به سرور ارسال کنید
    let body = ''
    try {
        const id = req.url.split('/').at(-1);
        req.on('data', (data) => {
            body += data
        })
        req.on('end', async () => {
            const Body = body.toLowerCase();
            const idFinder = await model.findById(id)
            let status = "unfinished";
            if (Body == "unfinished" || Body == "pending" || Body == "completed") {
                status = body;
                if (!idFinder) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' })
                    res.write("task not found in our database")
                    res.end()
                } else {
                    const resultUpdateStat = await model.updateStat(id, status)
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.write(JSON.stringify(resultUpdateStat))
                    res.end()
                }
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.write("please enter a correct status from (pending || unfinished || completed) ")
                res.end()
            }
        })

    } catch (error) {
        console.log(error.message)
    }
}

async function remove(req, res) {
    const id = req.url.split("/").at(-1);
    const idfinder = await model.findById(id);
    try {
        if (!idfinder) {
            res.writeHead(404, { 'Content-type': 'text/plain' });
            res.write("id not existed , please enter a correct id for deleting..")
        } else {
            const result = await model.remove(id)
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.write(JSON.stringify(result))
            res.end()
        }
    } catch (error) {
        console.log(error.message)
    }
}

const controllers = {
    findAll,
    findById,
    insert,
    updateStat,
    remove
}

module.exports = controllers;