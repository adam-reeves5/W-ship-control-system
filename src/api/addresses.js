// LIVE SERVER
let API;
// const LIVEAPI = 'http://192.168.2.10';
const DEVAPI = 'http://95.97.138.90:1440';

// TEST SERVER
// if (process.env.NODE_ENV === 'development') {
//   API = DEVAPI;
// } else {
//   API = LIVEAPI;
// }

API = DEVAPI;


// REMOTE_TESTING_SERVER
// export default 'http://localhost:1337';

// LOCAL TEST SERVER
// export default 'http://192.168.21.113:1337';


// After Build Notes: Add Version # to Index.html css & js file src e.g. filename.js?v1.0.10
// to force reload (avoid caching errors)
export default API;
