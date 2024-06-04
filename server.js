const http = require("http");
const controllers = require("./controllers/taskController");
const errorHandler = require("./controllers/errorControl");
const PORT = 3001;
const taskRoute = '/api/task';

http.createServer(async (req, res) => {
    const regex = /\/api\/task\/[0-9]+/;


    const { url, method } = req;
    if (url == taskRoute && method == "GET") {
        controllers.findAll(req, res)
    } else if (url.match(regex) && method == "GET") {
        controllers.findById(req, res)
    } else if (url == taskRoute && method == "POST") {
        controllers.insert(req, res)
    } else if (url.match(regex) && method == "PUT") {
        //  هنگام ارسال درخواست در پستمن بجای ابجکت یا جیسون از تکست معمولی بدون دابل کوتیشن استفاده کنید و درخواست را به سرور ارسال کنید
        controllers.updateStat(req, res)
    } else if (url.match(regex) && method == "DELETE") {
        controllers.remove(req, res)
    } else {
        errorHandler(res)
    }


}).listen(PORT, () => [
    console.log(`serveris runned on this address : http://localhost:${PORT}`)
])