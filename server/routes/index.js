import express from 'express';
const router = express.Router();

router.get('/*', (req, res) => {
    const opts = {
        root: `${__dirname}/../../public/dist/`

    };

    res.sendFile('index.html', opts);
})
module.exports = router;
