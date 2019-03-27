// Configurations for Frontend
const NODE_ENV = (process.env.NODE_ENV === 'production') ? 'production' : 'development'

let consts = {
    url: {}
}

if (NODE_ENV === 'production') {
    consts.url.api = '/' // Change this URL according to your live server
} else {
    consts.url.api = '/'
}

export default consts
