/* global chrome */

import './App.css';
import Popup from "./components/popup";
import getSubscriptions from "./youtueb_API/getSubscriptions";

function App() {
    // const [openAlert, setOpenAlert] = useState(false)
    const now = new Date();
    console.log("nownow :", now)

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}/${month}/${day} ${hours}시 ${minutes}분`;
    const message = `${formattedDate} 기준으로 \n업데이트가 요청됐습니다.`;


    const handleRequestToFlaskForAPI = async () => {
    console.log("Flask로 유튜브 구독 채널 목록 요청");

    try {
      const response = await fetch("http://localhost:5000/subscriptions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Response from Flask :", data)
        window.alert(message)

    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

    //     const handleRequestToFlaskForAPI = async () => {
    //     console.log("Flask로 유튜브 구독 채널 목록 요청");
    //
    //     try {
    //         const response = await fetch("http://localhost:5000/subscriptions", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         console.log("Response from Flask :", data);
    //
    //         // 받은 데이터를 localStorage에 저장
    //         if (data.videos) {
    //             localStorage.setItem('whole_category', JSON.stringify(data.videos));
    //         }
    //
    //         window.alert(message);
    //
    //     } catch (error) {
    //         console.error('Failed to fetch:', error);
    //         window.alert('Failed to fetch data.');
    //     }
    // };


    //성공한 샘플 데이터
    // const CategoryData = {
        //     "userId": "ds",
        //     "videos": [
        //         {
        //             "id": "QWSfQmgwHzo",
        //             "snippet": {
        //                 "title": "Severe turbulence rocks Singapore Airlines flight; 1 killed",
        //                 "description": "Singapore Airlines announced that one person was killed and others were injured when a flight encountered severe turbulence. FOX 5 NY's Richard Giacovas has the story.\n\nSubscribe to FOX 5 NY: https://www.youtube.com/fox5ny?sub_confirmation=1\n\nWatch FOX 5 NY Live: https://www.fox5ny.com/live\n\nFOX 5 NY delivers breaking news, live events, investigations, politics, entertainment, business news and local stories from New York City and across the nation.\n\nWatch more FOX 5 NY on YouTube:\n\nBlack Entrepreneurs: https://www.youtube.com/playlist?list=PLcuHpcV2MbFhCA1ErwiU_6G6XSA-HBg0r\n\nSTREET SOLDIERS with LISA EVERS: https://www.youtube.com/playlist?list=PLcuHpcV2MbFgxNyloxnZwYu5p0oWN_lSJ\n\nA.I. ALL IN: https://www.youtube.com/playlist?list=PLcuHpcV2MbFgcJsok-gL3gwY8OfzVkacP\n\nFinding Faith: https://www.youtube.com/playlist?list=PLcuHpcV2MbFg7_GyPTOJfF9PiWwo9sgMd\n\nThe Big Idea: https://www.youtube.com/playlist?list=PLcuHpcV2MbFizXx6FzVo9sCaNbCYu_rVB\n\nDownload the FOX 5 NY News app: https://www.fox5ny.com/apps\n\nDownload the FOX 5 NY Weather app: https://www.fox5ny.com/apps\n\nFollow FOX 5 NY on Facebook: https://www.facebook.com/fox5ny/\n\nFollow FOX 5 NY on Twitter: https://twitter.com/fox5ny/\n\nFollow FOX 5 NY on Instagram: https://www.instagram.com/fox5ny/\n\nSubscribe to the Good Day NY Morning Brief newsletter: https://www.fox5ny.com/email",
        //                 "categoryId": "25",
        //                 "defaultLanguage": "en",
        //                 "defaultAudioLanguage": "en"
        //             }
        //         },
        //         {
        //             "id": "uyuNoN_51F4",
        //             "snippet": {
        //                 "title": "Trump deletes Truth Social video that references 'unified Reich' after backlash",
        //                 "description": "Former President Trump's campaign is navigating their response to a since-deleted video posted on Trump's Truth Social account that suggested his victory would bring “unified Reich.” NBC News senior national politics reporter Jonathan Allen has more details.\n\n» Subscribe to MSNBC: https://www.youtube.com/msnbc\n \nDownload our new MSNBC app for the latest breaking news and daily headlines at a glance: https://www.msnbc.com/information/download-msnbc-app-n1241692\n\nFollow MSNBC Show Blogs \nMaddowBlog: https://www.msnbc.com/maddowblog\nReidOut Blog: https://www.msnbc.com/reidoutblog\n\nMSNBC delivers breaking news, in-depth analysis of politics headlines, as well as commentary and informed perspectives. Find video clips and segments from The Rachel Maddow Show, Morning Joe, The Beat with Ari Melber, Deadline: White House, The ReidOut, All In, Last Word, 11th Hour, and Alex Wagner who brings her breadth of reporting experience to MSNBC primetime. Watch “Alex Wagner Tonight” Tuesday through Friday at 9pm Eastern. \n \nConnect with MSNBC Online \nVisit msnbc.com: https://www.msnbc.com/\nSubscribe to the MSNBC Daily Newsletter: https://link.msnbc.com/join/5ck/msnbc-daily-signup\nFind MSNBC on Facebook: https://www.facebook.com/msnbc/\nFollow MSNBC on Twitter: https://twitter.com/MSNBC\nFollow MSNBC on Instagram: https://www.instagram.com/msnbc\n\n#Trump #Election #Politics",
        //                 "categoryId": "25",
        //                 "defaultAudioLanguage": "en"
        //             }
        //         }
        //     ]
        // }


    const handleCategoryRequestToGCP = async (event) => {
    event.preventDefault();
    console.log("Sending whole category model data to GCP function");

    // Fetch data request
    chrome.runtime.sendMessage({ action: "fetchData" }, async (response) => {
        if (response && response.success) {
            console.log("response:", response);

            // Ensure the response data is correctly formatted
            const formattedData = response.data.map(video => {
                if (video.thumbnail && Array.isArray(video.thumbnail)) {
                    video.thumbnail = video.thumbnail[0]; // Assume the first element in the thumbnail array is the correct one
                }

                // Decode the title, description, and channelTitle
                video.title = decodeURIComponent(video.title);
                video.description = decodeURIComponent(video.description);
                video.channelTitle = decodeURIComponent(video.channelTitle);

                return video;
            });

            console.log("formatted Video:", formattedData);

            const CategoryData = {
                userId: "ds",
                videos: formattedData
            };

            console.log("Data to be sent:", CategoryData);

            const gcpFunctionUrl = "https://asia-northeast3-yourtube-427304.cloudfunctions.net/whole-category-final";
            try {
                const gcpResponse = await fetch(gcpFunctionUrl, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(CategoryData),
                });

                if (!gcpResponse.ok) {
                    throw new Error('Network response was not ok: ' + gcpResponse.statusText);
                }

                const responseData = await gcpResponse.json();
                console.log("Response from Cloud Function:", responseData);
                alert("Data sent to GCP successfully!");

                // Here, add the logic to save responseData to MongoDB
                // Example:
                // await saveToMongoDB(responseData);

            } catch (error) {
                console.error("Error sending data to Cloud Function:", error);
            }
        } else {
            console.error('Failed to fetch data:', response ? response.error : 'No response');
        }
    });
};



  return (
    <div className="App">
        <header className="App-header">
            <Popup handleOpen={handleRequestToFlaskForAPI} handleCategoryRequest={handleCategoryRequestToGCP}/>
        </header>
    </div>
  );
}

export default App;
