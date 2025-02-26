function openVideoPopup(event) {
    event.preventDefault();
    
    const popup = document.createElement('div');
    popup.className = 'video-popup';
    
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/YRBn9DtWPQI?autoplay=1';
    iframe.allow = 'autoplay';
    iframe.allowFullscreen = true;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-popup';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => document.body.removeChild(popup);
    
    videoContainer.appendChild(iframe);
    popup.appendChild(closeBtn);
    popup.appendChild(videoContainer);
    document.body.appendChild(popup);
}

document.addEventListener('DOMContentLoaded', () => {
    const watchDemo = document.querySelector('.watch-demo-link'); // Update selector based on your HTML
    if (watchDemo) {
        watchDemo.addEventListener('click', openVideoPopup);
    }
});
