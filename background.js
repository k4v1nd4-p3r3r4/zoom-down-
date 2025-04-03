chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "downloadVideo",
        title: "Download Video",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "downloadVideo") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: findVideoAndCreateDownloadLink
        });
    }
});

// Extract video source and create <a> tag
function findVideoAndCreateDownloadLink() {
    let videoElement = document.querySelector("video");
    if (videoElement) {
        let videoUrl = videoElement.src || videoElement.querySelector("source")?.src;
        if (videoUrl) {
            let existingLink = document.getElementById("video-download-link");
            if (!existingLink) {
                let downloadLink = document.createElement("a");
                downloadLink.id = "video-download-link";
                downloadLink.href = videoUrl;
                downloadLink.download = "video.mp4";
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }
        }
    }
}
