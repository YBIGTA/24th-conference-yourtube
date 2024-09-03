// import { google } from 'googleapis';
// import http from 'http';
// import open from 'open';
// import destroyer from 'server-destroy';
// import { URL } from 'url';
//
// const credentialsPath = '/client_secret.json';
//
// const scopes = [
//     "https://www.googleapis.com/auth/youtube",
//     "https://www.googleapis.com/auth/youtube.force-ssl",
//     "https://www.googleapis.com/auth/youtube.readonly",
//     "https://www.googleapis.com/auth/youtubepartner"
// ];
//
// let oauth2Client = null;
//
// async function getAuthenticate() {
//     if (!oauth2Client) {
//         const response = await fetch(credentialsPath);
//         const credentials = await response.json();
//
//         oauth2Client = new google.auth.OAuth2(
//             credentials.web.client_id,
//             credentials.web.client_secret,
//             credentials.web.redirect_uris[0]
//         );
//     }
//
//     return new Promise((resolve, reject) => {
//         if (oauth2Client.credentials && oauth2Client.credentials.refresh_token) {
//             oauth2Client.getAccessToken((err, token) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 resolve(oauth2Client);
//             });
//         } else {
//             const authorizeUrl = oauth2Client.generateAuthUrl({
//                 access_type: "offline",
//                 scope: scopes
//             });
//
//             const server = http.createServer(async (req, res) => {
//                 try {
//                     if (req.url.indexOf("/api/oauth2callback") > -1) {
//                         const qs = new URL(req.url, credentials.web.javascript_origins[0]).searchParams;
//                         res.end("<h1>Authentication successful! You can close this window and return to the console.</h1>");
//                         server.destroy();
//
//                         const { tokens } = await oauth2Client.getToken(qs.get("code"));
//                         oauth2Client.setCredentials(tokens);
//
//                         resolve(oauth2Client);
//                     }
//                 } catch (e) {
//                     reject(e);
//                 }
//             }).listen(3031, () => {
//                 open(authorizeUrl, { wait: false }).then(cp => cp.unref());
//             });
//             destroyer(server);
//         }
//     });
// }
//
// export default getAuthenticate;
