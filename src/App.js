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

    //수동 업데이트 버튼 함수 -> 구독 채널 정보를 가져옴
    // const handleUpdateML = () => {
    //     console.log("버튼 클릭됌.")
    //     // getSubscriptions();
    //     window.alert(message)
    //     // setOpenAlert(true)
    // }

    const handleRequestToFlaskForAPI = async () => {
    console.log("Flask로 유튜브 구독 채널 목록 요청");

    try {
      const response = await fetch("http://localhost:5000/subscriptions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({storeName, storeAddress, storeContact})
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

  return (
    <div className="App">
        <header className="App-header">
            <Popup handleOpen={handleRequestToFlaskForAPI} />
        </header>
    </div>
  );
}

export default App;
