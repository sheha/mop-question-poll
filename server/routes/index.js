import express from 'express';
import authMiddleware from '../middlewares/auth'
const router = express.Router();


router.get('/', authMiddleware, (request, response) => {
    let responseData = {
      success: false,
  
      errors: {}
    }
  
    response.json(responseData)
  })

router.get('/*', (req, res) => {
    const opts = {
        root: `${__dirname}/../../public/dist/`

    };

    res.sendFile('index.html', opts);
})
module.exports = router;
