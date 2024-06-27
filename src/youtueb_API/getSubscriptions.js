// import { google } from 'googleapis';
// import getAuthenticate from './getOauth2Client.js';
//
// function downloadFile(data, fileName) {
//     const json = JSON.stringify(data, null, 2);
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = fileName;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(url);
// }
//
// async function getSubscriptions() {
//     const oauth2Client = await getAuthenticate();
//
//     let result = [];
//     let params = {
//         part: 'snippet',
//         mine: true,
//         order: 'unread',
//         maxResults: 50,
//         headers: { 'Content-Type': 'application/json' }
//     };
//
//     while (true) {
//         let youtubeRes = await google.youtube({
//             version: 'v3',
//             auth: oauth2Client
//         }).subscriptions.list(params);
//
//         result = [...result, ...youtubeRes.data.items.map(item => ({
//             channelId: item.snippet.resourceId.channelId,
//             channelTitle: item.snippet.title,
//             thumbnail: item.snippet.thumbnails.default.url
//         }))];
//
//         if (youtubeRes.data.nextPageToken == undefined) {
//             break;
//         } else {
//             params.pageToken = youtubeRes.data.nextPageToken;
//         }
//     }
//
//     downloadFile(result, 'subscriptions.json');
//     console.log('Subscriptions saved as JSON file.');
//     return result;
// }
//
// export default getSubscriptions;
