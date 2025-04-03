document.getElementById("download-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: extractAndDownloadVideo
        });
    });
});

function extractAndDownloadVideo() {
    let videoElement = document.querySelector("video");
    if (videoElement) {
        let videoUrl = videoElement.src || videoElement.querySelector("source")?.src;
        if (videoUrl) {
            chrome.runtime.sendMessage({ action: "downloadVideo", videoUrl: videoUrl });
        }
    }
}
