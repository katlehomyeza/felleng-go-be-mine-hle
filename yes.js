const herPhotos = [];
const embarrassingPhotos = [];

const embarrassingCaptionMap = {
    1: "Waze wa'blusha !!!!!!!!!",
    2: "Ncowww look at us laughing at MY jokes",
    3: "My fav narcissist",
    4: "Ncowww look at you admiring my flowers",
    5: "our first photo funny enough .... lol do better",
    6: "yeah no talked about locked in (its as if youve never watched GOT before)",
    7: "You hate how your forehead looks, whilst I licked my screen!!!",
    8: '"Im so full" (you only had half a bagel btw)',
    9: "Said 'you too' when the waiter said 'enjoy your meal'",
    10: "No I hate this lighting",
    11: "If i see this photo again imma block you and arrest your brother",
    12: "Spilled a drink on myself at a party",
    13: "yeah no talk about GLASSY on a new year",
    14: "For someone who doesnt eat you stay chewing 😭",
    15: "Who got you giggling like that hmmmmmmmmm",
    16: "Lets do a quick call ....\n Quick call- 1:00:00",
    17: "we twiiiinniiiing",
    18: '"Im so fatigues idk why"',
    19: "ncooooooooooooooooooww.... life before KPI's"
};

for (let i = 1; i < 24; i++) {
    herPhotos.push(
        `./assets/pretty-photos/${i < 19 ? `${i}.jpg` : i < 23 ? `${i}.mov` : `${i}.mp4`}`
    );

    if (i < 20) {
        embarrassingPhotos.push({
            photo:`./assets/funny-photos/${(i > 1 && i < 12) || i > 17 ? `${i}.jpg` : `${i}.png`}`,
            caption: embarrassingCaptionMap[i]
        });
    }
}

// Lightbox functionality
let currentIndex = 0;
let currentGallery = [];

function openLightbox(gallery, index) {
    currentGallery = gallery;
    currentIndex = index;
    
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    showImage(index);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showImage(index) {
    const container = document.getElementById('lightbox-content');
    container.innerHTML = '';
    
    const file = currentGallery[index];
    const isVideo = file.endsWith('.mov') || file.endsWith('.mp4');
    
    if (isVideo) {
        const video = document.createElement('video');
        video.src = file;
        video.controls = true;
        video.className = 'lightbox-media';
        container.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = file;
        img.className = 'lightbox-media';
        container.appendChild(img);
    }
    
    document.getElementById('image-counter').textContent = `${index + 1} / ${currentGallery.length}`;
}

function changeImage(direction) {
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = currentGallery.length - 1;
    } else if (currentIndex >= currentGallery.length) {
        currentIndex = 0;
    }
    
    showImage(currentIndex);
}

function redirect(){
    window.location.href = './radio/radio.html';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'Escape') closeLightbox();
    }
});

// Update the photo population to add click handlers
const herCollage = document.querySelector('#her-collage .photo-collage');
herPhotos.forEach((file, index) => {
    const isVideo = file.endsWith('.mov') || file.endsWith('.mp4');
    
    if (isVideo) {
        const video = document.createElement('video');
        video.src = file;
        video.controls = true;
        video.className = 'collage-item';
        video.onclick = () => openLightbox(herPhotos, index);
        herCollage.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = file;
        img.alt = `Photo ${index + 1}`;
        img.className = 'collage-item';
        img.onclick = () => openLightbox(herPhotos, index);
        herCollage.appendChild(img);
    }
});

const embarrassingCollage = document.querySelector('#embarrassing-monents .photo-collage');
embarrassingPhotos.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'polaroid-wrapper';
    wrapper.onclick = () => openLightbox(embarrassingPhotos.map(p => p.photo), index);
    
    const img = document.createElement('img');
    img.src = item.photo;
    img.alt = `MVP Moment ${index + 1}`;
    img.className = 'collage-item embarrassing-item';
    
    const caption = document.createElement('div');
    caption.className = 'polaroid-caption';
    caption.textContent = item.caption;
    
    wrapper.appendChild(img);
    wrapper.appendChild(caption);
    embarrassingCollage.appendChild(wrapper);
});