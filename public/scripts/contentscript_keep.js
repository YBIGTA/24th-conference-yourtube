// /* global chrome */
//
// async function replaceNewVideos() {
//     // 기존 요소 찾기
//     var existingElement = document.querySelector('.style-scope ytd-rich-grid-renderer');
//
//     // 요소가 존재하는지 확인
//     if (existingElement) {
//         // 기존 요소의 부모 요소 저장
//         var parentElement = existingElement.parentNode;
//
//         // 기존 요소 제거
//         existingElement.remove();
//
//         // 새로운 콘텐츠 생성
//         const newContent = document.createElement('div');
//         newContent.className = 'newcontent';
//         newContent.id = 'mycontent';
//
//         // Add a container for the "최신순" text and the video content
//         const containerDiv = document.createElement('div');
//         containerDiv.className = 'container';
//         containerDiv.style = `
//             display: flex;
//             flex-direction: column;
//             width: 100%;
//             align-items: flex-start;
//             margin-top: 50px;
//             margin-bottom: 15px;
//             // background-color: lightyellow;
//             margin-left: 20px;
//         `;
//
//         // Add 최신순 text
//         const latestText = document.createElement('div');
//         latestText.textContent = '최신순';
//         latestText.style = `
//             font-size: 20px;
//             font-weight: bold;
//             color: white;
//         `;
//
//         containerDiv.appendChild(latestText);
//         containerDiv.appendChild(newContent);
//         parentElement.appendChild(containerDiv);
//
//
// //         const sampleData = [
// //     {
// //         "video_id": "FyyF5BrA8mw",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "고양이 지코 스팟 챌린지",
// //         "link": "https://www.youtube.com/watch?v=FyyF5BrA8mw",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-06-13T11:45:53+00:00",
// //         "description": "지아코 콜라보 단츄",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i3.ytimg.com/vi/FyyF5BrA8mw/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "761",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "mWSN-qmEaWY",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "고양이 분노의 콧김 레전드",
// //         "link": "https://www.youtube.com/watch?v=mWSN-qmEaWY",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-06-10T11:34:09+00:00",
// //         "description": "쩔엇당",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i2.ytimg.com/vi/mWSN-qmEaWY/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "80",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "XUKYD10ayQ4",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "꽁꽁 얼어붙은 한강위를 고양이가 걸어다닙니다 #고양이 #catvideos #고양이영상 #hiphop #cat",
// //         "link": "https://www.youtube.com/watch?v=XUKYD10ayQ4",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-06-09T01:23:35+00:00",
// //         "description": "꽁꽁얼어붙은 단추마음",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i1.ytimg.com/vi/XUKYD10ayQ4/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "509",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "AXfZmWRa8vc",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "요즘들어 부쩍 애교가 많아진 고양이씨",
// //         "link": "https://www.youtube.com/watch?v=AXfZmWRa8vc",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-05-19T13:05:45+00:00",
// //         "description": "이거 곤란해 귀여워서 숨 안쉬어졍\n\n\n#치즈냥\n#킹냥이\n#고양이\n#고영희\n#귀여운고양이",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i2.ytimg.com/vi/AXfZmWRa8vc/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "358",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "mDq37jYzmy8",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "귀여운 고양이 단추 입구녕",
// //         "link": "https://www.youtube.com/watch?v=mDq37jYzmy8",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-05-16T11:09:49+00:00",
// //         "description": "",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i2.ytimg.com/vi/mDq37jYzmy8/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "777",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "0X_TElKMG6c",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "더위먹은 고양이",
// //         "link": "https://www.youtube.com/watch?v=0X_TElKMG6c",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-05-05T12:10:27+00:00",
// //         "description": "",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i1.ytimg.com/vi/0X_TElKMG6c/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "65",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "ucBa4CgwZ_k",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "단추야 놔줘",
// //         "link": "https://www.youtube.com/watch?v=ucBa4CgwZ_k",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-05-03T11:57:55+00:00",
// //         "description": "무셔운단추\n\n#고양이\n#킹냥이\n#치즈냥\n#빡친고양이\n#귀여운고양이",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i2.ytimg.com/vi/ucBa4CgwZ_k/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "321",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "9u0M6wlgbGc",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "고양이 단추 생일파티 제 5회",
// //         "link": "https://www.youtube.com/watch?v=9u0M6wlgbGc",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-04-28T13:27:21+00:00",
// //         "description": "단추사랑훼\n\n#고양이\n#킹냥이\n#치즈냥\n#힐링\n#고양이생일파티",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i2.ytimg.com/vi/9u0M6wlgbGc/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "245",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "18QE63v0MC0",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "고양이 뱃살 만지기",
// //         "link": "https://www.youtube.com/watch?v=18QE63v0MC0",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-04-15T13:34:50+00:00",
// //         "description": "",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i2.ytimg.com/vi/18QE63v0MC0/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "402",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "wpxy9__AY6E",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "이상한 집사랑 놀아주는 착한 고양이",
// //         "link": "https://www.youtube.com/watch?v=wpxy9__AY6E",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-04-14T10:08:40+00:00",
// //         "description": "울단츄. 착해빠졌어\n\n#고양이\n#킹냥이\n#치즈냥\n#치즈고양이\n#고영희",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i4.ytimg.com/vi/wpxy9__AY6E/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "682",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "9ACD7mfjI_s",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "주먹질하는 고양이 단추",
// //         "link": "https://www.youtube.com/watch?v=9ACD7mfjI_s",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-03-30T14:27:54+00:00",
// //         "description": "",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i2.ytimg.com/vi/9ACD7mfjI_s/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "648",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "lVKJztuxiJU",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "고양이와 출근준비",
// //         "link": "https://www.youtube.com/watch?v=lVKJztuxiJU",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-03-28T13:03:31+00:00",
// //         "description": "#킹냥이단추\n#고양이\n#치즈고양이\n#출근",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i1.ytimg.com/vi/lVKJztuxiJU/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "291",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "2tUBlUDdQMc",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "눈물의 고양이 뽀삐뽀챌린지",
// //         "link": "https://www.youtube.com/watch?v=2tUBlUDdQMc",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-03-15T09:17:46+00:00",
// //         "description": "",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i3.ytimg.com/vi/2tUBlUDdQMc/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "421",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "IwFiCe8W7GM",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "고양이스러운 고양이 단추",
// //         "link": "https://www.youtube.com/watch?v=IwFiCe8W7GM",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-03-10T12:39:31+00:00",
// //         "description": "고양이스러운게 뭔지 알려주마\n\n#고양이\n#킹냥이\n#치즈냥\n#치즈고양이\n#귀여운고양이",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i2.ytimg.com/vi/IwFiCe8W7GM/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "349",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     },
// //     {
// //         "video_id": "5jipbxTr8M4",
// //         "channel_id": "UCiFidkSpe4qWYOwkazXuI7A",
// //         "title": "심한말하는 고양이 일상",
// //         "link": "https://www.youtube.com/watch?v=5jipbxTr8M4",
// //         "ChannelTitle": "단추대감",
// //         "published": "2024-03-02T14:02:31+00:00",
// //         "description": "괴팍한 우리고양이♥️\n\n#고양이\n#킹냥이\n#치즈냥\n#치즈냥이",
// //         "thumbnail": [
// //             {
// //                 "url": "https://i2.ytimg.com/vi/5jipbxTr8M4/hqdefault.jpg",
// //                 "width": "480",
// //                 "height": "360"
// //             }
// //         ],
// //         "views": "1496",
// //         "channel_icon": "https://yt3.ggpht.com/IejMCBfp7O810mUG3tfnpiOBjzAScXBJJ9kAAQC15zl4_ae2SFfMtt4gY7aaRPp8dnRmDJx2PA=s88-c-k-c0x00ffffff-no-rj"
// //     }
// // ]
//
//
//          // Fetch the sample data from the JSON file via background script
//         // 크롬 확장 프로그램 보안 정책땜에 json파일을 background.js에서 접근해서 contentscript.js로 전달하는 로직
//         // 지금은 data/testData600.json으로 설정되어 있음.
//         let sampleData;
//         try {
//             const response = await new Promise((resolve, reject) => {
//                 chrome.runtime.sendMessage({ action: "fetchData" }, (response) => {
//                     if (response.success) {
//                         resolve(response.data);
//                     } else {
//                         reject(response.error);
//                     }
//                 });
//             });
//             sampleData = response;
//             console.log("Data: ", sampleData);
//         } catch (error) {
//             console.error('Error fetching the sample data:', error);
//             return;
//         }
//
//
//         function getTimeDifference(publishTime) {
//             const now = new Date();
//             const publishDate = new Date(publishTime);
//             const diffInSeconds = Math.floor((now - publishDate) / 1000);
//             const minutes = Math.floor(diffInSeconds / 60);
//             const hours = Math.floor(minutes / 60);
//             const days = Math.floor(hours / 24);
//             const months = Math.floor(days / 30);
//             const years = Math.floor(days / 365);
//
//             if (years > 0) return `${years}년 전`;
//             else if (months > 0) return `${months}개월 전`;
//             else if (days > 0) return `${days}일 전`;
//             else if (hours > 0) return `${hours}시간 전`;
//             else if (minutes > 0) return `${minutes}분 전`;
//             else return `방금 전`;
//         }
//
//         function formatViewCount(views) {
//             const num = Number(views);
//             if (num >= 1000000) {
//                 return (num / 1000000).toFixed(1).replace(/\.0$/, '') + '백만';
//             } else if (num >= 10000) {
//                 return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
//             } else if (num >= 1000) {
//                 return (num / 1000).toFixed(1).replace(/\.0$/, '') + '천';
//             }
//             return num;
//         }
//
//         function createYoutubeBox(videoData) {
//             const videoId = videoData.video_id;
//             const thumbnail = videoData.thumbnail[0].url;
//             let videoTitle = videoData.title;
//             const channelName = videoData.ChannelTitle;
//             const publishTime = videoData.published;
//             const channelIcon = videoData.channel_icon;
//             const viewCounts = formatViewCount(videoData.views);
//             const channelId = videoData.channel_id;
//
//             const youtubeBox = document.createElement('div');
//             youtubeBox.className = 'youtube-box';
//             youtubeBox.style = `
//                 display: flex;
//                 width: 385px;
//                 height: 310px;
//                 flex-direction: column;
//                 padding: 1rem;
//                 margin-bottom: 20px;
//                 color: #fff;
//             `;
//             youtubeBox.onclick = () => window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
//
//             const thumbnailDiv = document.createElement('div');
//             thumbnailDiv.className = 'thumbnail';
//             thumbnailDiv.style = `
//                 flex: 2.5;
//                 display: flex;
//                 border-radius: 15px;
//                 margin-bottom: 1rem;
//                 justify-content: center;
//                 align-items: center;
//                 overflow: hidden;
//                 width: 100%;
//                 height: 100%;
//                 cursor: pointer;
//             `;
//             thumbnailDiv.onclick = () => window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
//             const thumbnailImg = document.createElement('img');
//             thumbnailImg.src = thumbnail;
//             thumbnailImg.alt = "video";
//             thumbnailImg.style = `
//                 width: 100%;
//                 height: auto;
//             `;
//             thumbnailDiv.appendChild(thumbnailImg);
//
//             const contentDiv = document.createElement('div');
//             contentDiv.className = 'content';
//             contentDiv.style = `
//                 flex: 1;
//                 flex-direction: column;
//                 display: flex;
//             `;
//
//             const rowDiv1 = document.createElement('div');
//             rowDiv1.className = 'row';
//             rowDiv1.style = `
//                 flex: 1;
//                 display: flex;
//                 flex-direction: row;
//             `;
//
//             const channelIconDiv = document.createElement('div');
//             channelIconDiv.className = 'channel-icon';
//             channelIconDiv.onclick = () => window.location.href = `https://www.youtube.com/channel/${channelId}`;
//             channelIconDiv.style = `
//                 flex: none;
//                 width: 35px;
//                 height: 35px;
//                 margin-right: 10px;
//                 border-radius: 50%;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 font-size: 0.5rem;
//                 overflow: hidden;
//                 /* border: 1px solid #333; */
//                 background-image: url('${channelIcon}');
//                 background-size: cover;
//                 background-position: center;
//                 cursor: pointer;
//             `;
//
//             if (videoTitle.length > 60) {
//                 videoTitle = videoTitle.substring(0, 60) + " ...";
//             }
//
//             const titleDiv = document.createElement('div');
//             titleDiv.className = 'title';
//             titleDiv.onclick = () => window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
//             titleDiv.style = `
//                 flex: 1;
//                 text-align: start;
//                 align-items: start;
//                 display: flex;
//                 margin-top: 5px;
//                 overflow: hidden;
//                 cursor: pointer;
//                 // max-height: 48px;
//             `;
//             const titleText = document.createElement('div');
//             titleText.className = 'title-text';
//             titleText.textContent = videoTitle;
//             titleText.style = `
//                 color: white;
//                 font-weight: bold;
//                 font-size: 16px;
//                 display: -webkit-box;
//                 -webkit-line-clamp: 2;
//                 -webkit-box-orient: vertical;
//                 overflow: hidden;
//                 text-overflow: ellipsis;
//                 // line-height: 24px; /* Adjust line height as per design */
//             `;
//
//             titleDiv.appendChild(titleText);
//
//             rowDiv1.appendChild(channelIconDiv);
//             rowDiv1.appendChild(titleDiv);
//
//             const columnDiv2 = document.createElement('div');
//             columnDiv2.className = 'column info';
//             columnDiv2.style = `
//                 flex: 1;
//                 display: flex;
//                 flex-direction: column;
//                 align-items: start; /* Align items to the start */
//                 padding-top: 0.5rem;
//                 padding-left: 47px; /* Same margin as channel icon */
//             `;
//
//             const channelNameDiv = document.createElement('div');
//             channelNameDiv.className = 'info-text';
//             channelNameDiv.onclick = () => window.location.href = `https://www.youtube.com/channel/${channelId}`;
//             channelNameDiv.textContent = channelName;
//             channelNameDiv.style = `
//                 font-size: 14px;
//                 color: #aaa;
//                 margin-bottom: 3px;
//                 cursor: pointer;
//             `;
//
//             const viewInfoDiv = document.createElement('div');
//             viewInfoDiv.className = 'info-text';
//             viewInfoDiv.textContent = `조회수 ${viewCounts}회 \u2022 ${getTimeDifference(publishTime)}`;
//             viewInfoDiv.style = `
//                 font-size: 14px;
//                 color: #aaa;
//             `;
//
//             columnDiv2.appendChild(channelNameDiv);
//             columnDiv2.appendChild(viewInfoDiv);
//
//             contentDiv.appendChild(rowDiv1);
//             contentDiv.appendChild(columnDiv2);
//
//             youtubeBox.appendChild(thumbnailDiv);
//             youtubeBox.appendChild(contentDiv);
//
//             return youtubeBox;
//         }
//
//
//         sampleData.forEach(videoData => {
//             const videoBox = createYoutubeBox(videoData);
//             newContent.appendChild(videoBox);
//         });
//
//         parentElement.appendChild(newContent);
//
//         parentElement.style.display = 'flex';
//         parentElement.style.flexDirection = 'column';
//         parentElement.style.justifyContent = 'center';
//         newContent.style.display = 'flex';
//         newContent.style.flexWrap = 'wrap'; // Allow wrapping
//         newContent.style.flexDirection = 'row'; // Align items in rows
//         newContent.style.marginLeft = '10px';
//         newContent.style.justifyContent = 'flex-start';
//     } else {
//         console.error('기존 요소를 찾을 수 없습니다. 강력 새로고침 후 재실행합니다.');
//         chrome.runtime.sendMessage({action: "forceReload"});
//     }
// }
//
// window.addEventListener('load', replaceNewVideos);
//
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "runReplace") {
//         replaceNewVideos();
//     }
// });
