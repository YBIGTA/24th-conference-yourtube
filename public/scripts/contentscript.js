/* global chrome */

let subCategories = {};  // subCategories 객체 정의

async function replaceNewVideos() {
    var existingElement = document.querySelector('.style-scope ytd-rich-grid-renderer');

    if (existingElement) {
        var parentElement = existingElement.parentNode;
        existingElement.remove();

        const newContent = document.createElement('div');
        newContent.className = 'newcontent';
        newContent.id = 'mycontent';

        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';
        mainContainer.style = `
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: flex-start;
            margin-top: 25px;
            margin-bottom: 15px;
            margin-left: 10px;
        `;

        const headerContainer = document.createElement('div');
        headerContainer.style = `
            display: flex;
            justify-content: space-between;
            width: 95%;
            margin-bottom: 15px;
            margin-left: 20px;
        `;

        const categoryContainer = document.createElement('div');
        categoryContainer.style = `
            display: flex;
            flex-wrap: wrap;
            width: 90%;
        `;

        const settingsContainer = document.createElement('div');
        settingsContainer.style = `
            display: flex;
            align-items: flex-start;
            margin-left: auto;
            padding-top: 0.7rem;
        `;

        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.style = `
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            width: 100%;
        `;

        const categoryMapping = {
            0: "전체",
            1: "영화/애니메이션",
            2: "자동차/교통",
            10: "음악",
            15: "반려동물/동물",
            17: "스포츠",
            19: "여행/이벤트",
            20: "게임",
            22: "인물/블로그",
            23: "코미디",
            24: "엔터테인먼트",
            25: "뉴스/정치",
            26: "노하우/스타일",
            27: "교육",
            28: "과학기술",
            29: "비영리/사회운동"
        };

        const categoryList = Object.values(categoryMapping);
        const categoryKeys = Object.keys(categoryMapping);
        let selectedCategoryIndex = null;
        let selectedSubCategoryIndex = null;
        let displayedCategories = categoryList.slice(0, 16);
        let sampleData = [];

        function handleSubCategoryClick(index, subIndex, event) {
            if (selectedCategoryIndex === index && selectedSubCategoryIndex === subIndex) {
                selectedSubCategoryIndex = null;
            } else {
                selectedCategoryIndex = index;
                selectedSubCategoryIndex = subIndex;
            }
            updateCategories(event);
        }

        function handleClick(index, event) {
            if (selectedCategoryIndex === index) {
                selectedCategoryIndex = null;
                selectedSubCategoryIndex = null;
            } else {
                selectedCategoryIndex = index;
                selectedSubCategoryIndex = null;
            }
            updateCategories(event);
        }

        function sortVideosByPublishDate(videos) {
            return videos.sort((a, b) => new Date(b.published) - new Date(a.published));
        }

        function displayFilteredVideos(videos, container) {
            container.innerHTML = '';
            videos.forEach(videoData => {
                const videoBox = createYoutubeBox(videoData);
                container.appendChild(videoBox);
            });
        }

        function updateCategories(event) {
            categoryContainer.innerHTML = '';

            displayedCategories.forEach((category, index) => {
                const categoryBoxContainer = document.createElement('div');
                categoryBoxContainer.className = 'category-box-container';
                categoryBoxContainer.style = `
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 1rem;
                    position: relative;
                `;

                const categoryBox = document.createElement('div');
                categoryBox.style = `
                    background-color: ${selectedCategoryIndex === index ? "#F1F1F1" : "#282828"};
                    color: ${selectedCategoryIndex === index ? "#0F0F0F" : "#EFEFEF"};
                    padding: 0.7rem 1.7rem;
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1rem;
                    cursor: pointer;
                    user-select: none;
                    font-size: 14px;
                `;
                categoryBox.textContent = category;
                categoryBox.addEventListener('click', (event) => handleClick(index, event));
                categoryBoxContainer.appendChild(categoryBox);

                if (selectedCategoryIndex === index && event && index !== 0) {
                    const addCircleIconContainer = document.createElement('div');
                    addCircleIconContainer.className = 'add-circle-icon-container';
                    addCircleIconContainer.style = `
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        width: 100%;
                        margin-top: 1rem;
                        flex-direction: row;
                    `;

                    const addCircleIcon = document.createElement('div');
                    addCircleIcon.innerHTML = `
                        <svg id="icon-svg" height="36" viewBox="0 0 24 24" width="36" fill="#282828">
                            <circle cx="12" cy="12" r="10" stroke="#282828" stroke-width="2" fill="#282828" />
                            <line x1="12" y1="8" x2="12" y2="16" stroke="#EFEFEF" stroke-width="2"/>
                            <line x1="8" y1="12" x2="16" y2="12" stroke="#EFEFEF" stroke-width="2"/>
                        </svg>`;
                    addCircleIcon.style = `
                        cursor: pointer;
                        margin-right: 1rem;
                    `;

                    const iconSvg = addCircleIcon.querySelector('#icon-svg');
                    const iconCircle = iconSvg.querySelector('circle');
                    const iconLines = iconSvg.querySelectorAll('line');

                    addCircleIcon.addEventListener('mouseenter', () => {
                        iconCircle.setAttribute('fill', '#F1F1F1');
                        iconCircle.setAttribute('stroke', '#F1F1F1');
                        iconLines.forEach(line => line.setAttribute('stroke', '#0F0F0F'));
                    });

                    addCircleIcon.addEventListener('mouseleave', () => {
                        iconCircle.setAttribute('fill', '#282828');
                        iconCircle.setAttribute('stroke', '#282828');
                        iconLines.forEach(line => line.setAttribute('stroke', '#EFEFEF'));
                    });

                    addCircleIcon.addEventListener('click', () => openNewCategoryPopup(index));
                    addCircleIconContainer.appendChild(addCircleIcon);
                    categoryBoxContainer.appendChild(addCircleIconContainer);

                    if (subCategories[category]) {
                        subCategories[category].forEach((subCategory, subIndex) => {
                            const subCategoryBox = document.createElement('div');
                            subCategoryBox.style = `
                                background-color: ${selectedCategoryIndex === index && selectedSubCategoryIndex === subIndex ? "#F1F1F1" : "#282828"};
                                color: ${selectedCategoryIndex === index && selectedSubCategoryIndex === subIndex ? "#0F0F0F" : "#EFEFEF"};
                                padding: 0.7rem 1.7rem;
                                border-radius: 0.5rem;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-right: 1rem;
                                cursor: pointer;
                                user-select: none;
                                font-size: 14px;
                            `;
                            subCategoryBox.textContent = subCategory;
                            subCategoryBox.addEventListener('click', (event) => handleSubCategoryClick(index, subIndex, event));
                            addCircleIconContainer.insertBefore(subCategoryBox, addCircleIconContainer.firstChild);
                        });
                    }
                }

                categoryContainer.appendChild(categoryBoxContainer);
            });

            let filteredVideos = [];
            if (selectedCategoryIndex !== null) {
                const categoryKey = categoryKeys[selectedCategoryIndex];
                if (categoryKey === "0") {
                    filteredVideos = sampleData;  // 전체 카테고리의 경우 모든 비디오를 포함
                } else {
                    filteredVideos = sampleData.filter(video => video.categoryId == categoryKey);
                }
            } else {
                filteredVideos = sampleData;
            }
            filteredVideos = sortVideosByPublishDate(filteredVideos);
            displayFilteredVideos(filteredVideos, videoContainer);
        }

        const categorySettings = document.createElement('div');
        categorySettings.style = `
            color: #EFEFEF;
            font-size: 14px;
            cursor: pointer;
            user-select: none;
        `;
        categorySettings.textContent = "카테고리 설정 >";
        categorySettings.addEventListener('click', openCategorySettingsPopup);
        settingsContainer.appendChild(categorySettings);

        headerContainer.appendChild(categoryContainer);
        headerContainer.appendChild(settingsContainer);

        function openCategorySettingsPopup() {
            const popup = document.createElement('div');
            popup.style = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 350px;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                z-index: 1000;
            `;

            const title = document.createElement('h3');
            title.textContent = "메인 카테고리 설정";
            title.style = `
                margin-top: 0;
                margin-bottom: 20px;
                font-size: 16px;
                text-align: center;  /* 제목을 중앙 정렬 */
            `;
            popup.appendChild(title);

            const checkboxContainer = document.createElement('div');
            checkboxContainer.style = `
                display: grid;
                grid-template-columns: 1fr 1fr;  /* 두 열로 나누기 */
                gap: 10px;  /* 항목 간의 간격 */
                margin-bottom: 15px;
            `;

            categoryList.forEach((category, index) => {
                const checkboxLabel = document.createElement('label');
                checkboxLabel.style = `
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                `;
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = category;
                checkbox.checked = displayedCategories.includes(category);
                checkbox.addEventListener('change', () => handleCheckboxChange(index, checkbox.checked));
                checkboxLabel.appendChild(checkbox);
                checkboxLabel.appendChild(document.createTextNode(category));
                checkboxContainer.appendChild(checkboxLabel);
            });
            popup.appendChild(checkboxContainer);

            const buttonContainer = document.createElement('div');
            buttonContainer.style = `
                display: flex;
                justify-content: center;  /* 중앙 정렬 */
                margin-top: 15px;
                gap: 10px;  /* 버튼 간의 간격 추가 */
            `;

            const saveButton = document.createElement('button');
            saveButton.textContent = "저장";
            saveButton.style = `
                padding: 8px 12px;
                background: #007bff;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            `;
            saveButton.addEventListener('click', () => {
                document.body.removeChild(popup);
                updateCategories();
            });
            buttonContainer.appendChild(saveButton);

            const closeButton = document.createElement('button');
            closeButton.textContent = "닫기";
            closeButton.style = `
                padding: 8px 12px;
                background: #6c757d;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            `;
            closeButton.addEventListener('click', () => {
                document.body.removeChild(popup);
            });
            buttonContainer.appendChild(closeButton);

            popup.appendChild(buttonContainer);
            document.body.appendChild(popup);
        }

        function handleCheckboxChange(index, isChecked) {
            const category = categoryList[index];
            if (isChecked) {
                if (!displayedCategories.includes(category)) {
                    displayedCategories.push(category);
                }
            } else {
                displayedCategories = displayedCategories.filter(cat => cat !== category);
            }
        }

        function openNewCategoryPopup(index) {
            const popup = document.createElement('div');
            popup.style = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 350px;
                background: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                z-index: 1000;
            `;

            const title = document.createElement('h3');
            title.textContent = "맞춤형 카테고리 추가";
            title.style = `
                margin-top: 0;
                margin-bottom: 15px;
                font-size: 16px;
                text-align: center;  /* 제목을 중앙 정렬 */
            `;
            popup.appendChild(title);

            const categoryNameInput = document.createElement('input');
            categoryNameInput.placeholder = "카테고리 이름";
            categoryNameInput.style = `
                width: 100%;
                padding: 8px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
            `;
            popup.appendChild(categoryNameInput);

            const categoryDescriptionInput = document.createElement('textarea');
            categoryDescriptionInput.placeholder = "카테고리 설명";
            categoryDescriptionInput.style = `
                width: 100%;
                padding: 8px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                resize: none;
                box-sizing: border-box;
            `;
            popup.appendChild(categoryDescriptionInput);

            const subCategoryButtonContainer = document.createElement('div');
            subCategoryButtonContainer.style = `
                display: flex;
                justify-content: center;  /* 중앙 정렬 */
                margin-top: 10px;
                gap: 10px;  /* 버튼 간의 간격 추가 */
                width: 100%;
            `;

            const saveButton = document.createElement('button');
            saveButton.textContent = "추가";
            saveButton.style = `
                padding: 8px 12px;
                background: #007bff;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            `;

            saveButton.addEventListener('click', async () => {
                const categoryName = categoryNameInput.value.trim();
                const categoryDescription = categoryDescriptionInput.value.trim();

                if (categoryName) {
                    addNewSubCategory(index, categoryName);

                    const sendDataToGCP = async () => {
                        console.log("GCP function으로 세부 카테고리 모델 데이터 전달");

                        const subCategoryData = {
                            userId: "ds",
                            wholeCategoryID: 25,
                            subCategoryName: categoryName,
                            subCategoryDescription: categoryDescription
                        };

                        console.log("전달하는 데이터:", subCategoryData);

                        const gcpFunctionUrl = "https://asia-northeast3-yourtube-427304.cloudfunctions.net/sub-category-final";
                        try {
                            const response = await fetch(gcpFunctionUrl, {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(subCategoryData),
                            });

                            if (!response.ok) {
                                throw new Error('Network response was not ok ' + response.statusText);
                            }

                            const responseData = await response.json();
                            console.log("Response from Cloud Function:", responseData);
                        } catch (error) {
                            console.error('Error sending data to GCP:', error);
                        }
                    };

                    await sendDataToGCP();
                }
                document.body.removeChild(popup);
            });
            subCategoryButtonContainer.appendChild(saveButton);

            const closeButton = document.createElement('button');
            closeButton.textContent = "닫기";
            closeButton.style = `
                padding: 8px 12px;
                background: #6c757d;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            `;
            closeButton.addEventListener('click', () => {
                document.body.removeChild(popup);
            });
            subCategoryButtonContainer.appendChild(closeButton);

            popup.appendChild(subCategoryButtonContainer);
            document.body.appendChild(popup);
        }

        // 페이지 로드 시 localStorage에서 서브 카테고리를 불러오는 함수
        document.addEventListener('DOMContentLoaded', () => {
            const storedSubCategories = JSON.parse(localStorage.getItem('subCategories')) || {};
            for (const [mainCategory, subCategoryList] of Object.entries(storedSubCategories)) {
                if (!subCategories[mainCategory]) {
                    subCategories[mainCategory] = [];
                }
                subCategories[mainCategory].push(...subCategoryList);
            }

            // Log the retrieved subCategories to verify
            console.log('Retrieved subCategories:', subCategories);

            updateCategories();
        });

        function addNewSubCategory(index, categoryName) {
            const mainCategory = displayedCategories[index];
            if (!subCategories[mainCategory]) {
                subCategories[mainCategory] = [];
            }
            subCategories[mainCategory].push(categoryName);
            // Update localStorage
            let storedSubCategories = JSON.parse(localStorage.getItem('subCategories')) || {};
            if (!storedSubCategories[mainCategory]) {
                storedSubCategories[mainCategory] = [];
            }
            storedSubCategories[mainCategory].push(categoryName);
            localStorage.setItem('subCategories', JSON.stringify(storedSubCategories));

            // Log the stored subCategories to verify
            console.log('Stored subCategories:', storedSubCategories);

            updateCategories();
        }

        updateCategories();
        mainContainer.appendChild(headerContainer);
        mainContainer.appendChild(videoContainer);
        parentElement.appendChild(mainContainer);

        try {
            const response = await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({ action: "fetchData" }, (response) => {
                    if (response.success) {
                        resolve(response.data);
                    } else {
                        reject(response.error);
                    }
                });
            });
            sampleData = response;
            console.log("Data: ", sampleData);
            updateCategories();
        } catch (error) {
            console.error('Error fetching the sample data:', error);
            return;
        }

        function getTimeDifference(publishTime) {
            const now = new Date();
            const publishDate = new Date(publishTime);
            const diffInSeconds = Math.floor((now - publishDate) / 1000);
            const minutes = Math.floor(diffInSeconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);

            if (years > 0) return `${years}년 전`;
            else if (months > 0) return `${months}개월 전`;
            else if (days > 0) return `${days}일 전`;
            else if (hours > 0) return `${hours}시간 전`;
            else if (minutes > 0) return `${minutes}분 전`;
            else return `방금 전`;
        }

        function formatViewCount(views) {
            const num = Number(views);
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1).replace(/\.0$/, '') + '백만';
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(1).replace(/\.0$/, '') + '천';
            }
            return num;
        }

        function createYoutubeBox(videoData) {
            const videoId = videoData.video_id;
            const thumbnail = videoData.thumbnail[0].url;
            let videoTitle = videoData.title;
            const channelName = videoData.ChannelTitle;
            const publishTime = videoData.published;
            const channelIcon = videoData.channel_icon;
            const viewCounts = formatViewCount(videoData.views);
            const channelId = videoData.channel_id;

            const youtubeBox = document.createElement('div');
            youtubeBox.className = 'youtube-box';
            youtubeBox.style = `
                display: flex;
                width: 380px;
                height: 310px;
                flex-direction: column;
                padding: 1rem;
                margin-bottom: 20px;
                color: #fff;
                cursor: pointer;
            `;
            youtubeBox.onclick = () => window.location.href = `https://www.youtube.com/watch?v=${videoId}`;

            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.className = 'thumbnail';
            thumbnailDiv.style = `
                flex: 2.5;
                display: flex;
                border-radius: 15px;
                margin-bottom: 1rem;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                width: 100%;
                height: 100%;
                cursor: pointer;
            `;
            thumbnailDiv.onclick = () => window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = thumbnail;
            thumbnailImg.alt = "video";
            thumbnailImg.style = `
                width: 100%;
                height: auto;
            `;
            thumbnailDiv.appendChild(thumbnailImg);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';
            contentDiv.style = `
                flex: 1;
                flex-direction: column;
                display: flex;
            `;

            const rowDiv1 = document.createElement('div');
            rowDiv1.className = 'row';
            rowDiv1.style = `
                flex: 1;
                display: flex;
                flex-direction: row;
            `;

            const channelIconDiv = document.createElement('div');
            channelIconDiv.className = 'channel-icon';
            channelIconDiv.style = `
                flex: none;
                width: 35px;
                height: 35px;
                margin-right: 10px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.5rem;
                overflow: hidden;
                background-image: url('${channelIcon}');
                background-size: cover;
                background-position: center;
                cursor: pointer;
            `;

            channelIconDiv.addEventListener('click', (event) => {
                event.stopPropagation();
                window.location.href = `https://www.youtube.com/channel/${channelId}`;
            });

            if (videoTitle.length > 60) {
                videoTitle = videoTitle.substring(0, 60) + " ...";
            }

            const titleDiv = document.createElement('div');
            titleDiv.className = 'title';
            titleDiv.onclick = () => window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
            titleDiv.style = `
                flex: 1;
                text-align: start;
                align-items: start;
                display: flex;
                margin-top: 5px;
                overflow: hidden;
                cursor: pointer;
            `;
            const titleText = document.createElement('div');
            titleText.className = 'title-text';
            titleText.textContent = videoTitle;
            titleText.style = `
                color: white;
                font-weight: bold;
                font-size: 16px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            `;

            titleDiv.appendChild(titleText);

            rowDiv1.appendChild(channelIconDiv);
            rowDiv1.appendChild(titleDiv);

            const columnDiv2 = document.createElement('div');
            columnDiv2.className = 'column info';
            columnDiv2.style = `
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: start;
                padding-top: 0.5rem;
                padding-left: 47px;
            `;

            const channelNameDiv = document.createElement('div');
            channelNameDiv.className = 'info-text';
            channelNameDiv.textContent = channelName;
            channelNameDiv.style = `
                font-size: 14px;
                color: #aaa;
                margin-bottom: 3px;
                cursor: pointer;
                transition: color 0.3s;
            `;

            channelNameDiv.addEventListener('click', (event) => {
                event.stopPropagation();
                window.location.href = `https://www.youtube.com/channel/${channelId}`;
            });

            channelNameDiv.addEventListener('mouseenter', () => {
                channelNameDiv.style.color = 'white';
            });

            channelNameDiv.addEventListener('mouseleave', () => {
                channelNameDiv.style.color = '#aaa';
            });

            const viewInfoDiv = document.createElement('div');
            viewInfoDiv.className = 'info-text';
            viewInfoDiv.textContent = `조회수 ${viewCounts}회 \u2022 ${getTimeDifference(publishTime)}`;
            viewInfoDiv.style = `
                font-size: 14px;
                color: #aaa;
            `;

            columnDiv2.appendChild(channelNameDiv);
            columnDiv2.appendChild(viewInfoDiv);

            contentDiv.appendChild(rowDiv1);
            contentDiv.appendChild(columnDiv2);

            youtubeBox.appendChild(thumbnailDiv);
            youtubeBox.appendChild(contentDiv);

            return youtubeBox;
        }

        parentElement.appendChild(mainContainer);

        mainContainer.style.display = 'flex';
        mainContainer.style.flexDirection = 'column';
        mainContainer.style.justifyContent = 'center';
        videoContainer.style.display = 'flex';
        videoContainer.style.flexWrap = 'wrap';
        videoContainer.style.flexDirection = 'row';
        videoContainer.style.marginLeft = '10px';
        videoContainer.style.justifyContent = 'flex-start';
    } else {
        console.error('기존 요소를 찾을 수 없습니다. 강력 새로고침 후 재실행합니다.');
        chrome.runtime.sendMessage({action: "forceReload"});
    }
}

window.addEventListener('load', replaceNewVideos);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "runReplace") {
        replaceNewVideos();
    }
});
