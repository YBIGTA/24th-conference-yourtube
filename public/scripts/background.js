/* global chrome */
/*
브라우저 영역에서 작동하는 스크립트.
플러그인의 이벤트 핸들러
중요한 모든 이벤트 리스너가 여기 저장된다.
이벤트가 트리거 되고, 할당된 로직을 실행할 때까지 inactive 상태로 유지된다.
 */
// 매일 두번 (임시) 아침 8시, 밤 12시 alarm 기능으로 API 가져와서 자동 ML 업데이트 진행
// 1) 알림 관리
// 2) API 호출 및 데이터 동기화
//3) 강력 새로고침

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "forceReload") {
        chrome.tabs.reload(sender.tab.id, { bypassCache: true }, () => {
            chrome.tabs.sendMessage(sender.tab.id, { action: "runReplace" });
        });
    }
});

//subscriptionVideos.json
//newvideos.json
// newvideos_final.json
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchData") {
        fetch(chrome.runtime.getURL('data/subscriptionVideos.json'))
            .then(response => response.json())
            .then(data => sendResponse({ success: true, data: data }))
            .catch(error => sendResponse({ success: false, error: error }));
        return true; // Will respond asynchronously
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(`Storage key "${key}" in namespace "${namespace}" changed. 
                     Old value was "${oldValue}", new value is "${newValue}".`);

        // If the change is relevant, notify the content script
        if (key === 'subCategories') {
            chrome.tabs.query({ url: "https://www.youtube.com/feed/subscriptions" }, (tabs) => {
                tabs.forEach((tab) => {
                    chrome.tabs.sendMessage(tab.id, { action: 'updateCategories', data: newValue });
                });
            });
        }
    }
});
