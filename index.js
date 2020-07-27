const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    // todo: change useragent comparison
    const isBrowser = req.headers["user-agent"] === "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36";

    if (isBrowser) {
        next();
    } else {
        const match = req.url.match(/lang=(\w+)/);

        if (match) {
            res.sendFile(__dirname + `/static/${match[1]}.html`);
        } else {
            next();
        }

        // todo: use puppeteer to prerender any page and return the result
    }
});

app.use(express.static("./public/"));

app.listen(3000, () => console.log("Server listening on port 3000"));
