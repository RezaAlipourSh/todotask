module.exports = function error(res) {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write("please enter a valid address  - address not Found.");
    res.end()
}