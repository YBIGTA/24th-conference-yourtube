import './App.css';
import Popup from "./components/popup";

function App() {
    // const [openAlert, setOpenAlert] = useState(false)
    const message = " yyyy/mm//dd hh시 mm분을 기준으로 업데이트 요청됐습니다.";

    //수동 업데이트 버튼 함수
    const handleUpdateML = () => {
        console.log("버튼 클릭됌.")
        window.alert(message)
        // setOpenAlert(true)
    }

  //   const handleCloseAlert = () => {
  //   setOpenAlert(false);
  // }

  return (
    <div className="App">
        <header className="App-header">
            <Popup handleOpen={handleUpdateML} />
        </header>
    </div>
  );
}

export default App;
