// Enable right-click (if disabled)
document.addEventListener("contextmenu", (event) => {
    event.stopPropagation();
}, true);

// Function to create a hidden download link
function createDownloadLink(videoUrl) {
    if (!videoUrl) return;

    // Check if a download link already exists to prevent duplicates
    let existingLink = document.getElementById("video-download-link");
    if (existingLink) {
        existingLink.href = videoUrl;
        return;
    }

    // Create a hidden <a> tag
    let downloadLink = document.createElement("a");
    downloadLink.id = "video-download-link";
    downloadLink.href = videoUrl;
    downloadLink.download = "video.mp4"; // File name when downloading
    downloadLink.style.display = "none"; // Hide the link

    // Append the link to the document
    document.body.appendChild(downloadLink);

    // Create a visible button for downloading
    let downloadBtn = document.createElement("button");
    downloadBtn.id = "video-download-btn";
    downloadBtn.innerText = "Download Video";
    downloadBtn.style.position = "fixed";
    downloadBtn.style.top = "10px";
    downloadBtn.style.right = "10px";
    downloadBtn.style.background = "red";
    downloadBtn.style.color = "white";
    downloadBtn.style.padding = "10px";
    downloadBtn.style.zIndex = "9999";
    downloadBtn.style.fontSize = "14px";
    downloadBtn.style.cursor = "pointer";

    // When clicked, trigger the <a> link to download
    downloadBtn.onclick = () => {
        downloadLink.click();
    };

    document.body.appendChild(downloadBtn);
}

// Find video source and create a download link
function findVideoAndCreateLink() {
    let videoElement = document.querySelector("video");
    if (videoElement) {
        let videoUrl = videoElement.src || videoElement.querySelector("source")?.src;
        if (videoUrl) {
            createDownloadLink(videoUrl);
        }
    }
}

// Run after page loads
setTimeout(findVideoAndCreateLink, 2000);
