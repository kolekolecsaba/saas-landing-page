// Use the global templateData variable
// import templateData from './templateData.js';

function renderTemplateCards() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (!swiperWrapper) return;

    // Clear existing content
    swiperWrapper.innerHTML = '';

    // Group templates into sets of 3
    const groupedTemplates = templateData.reduce((acc, template, index) => {
        const groupIndex = Math.floor(index / 3);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(template);
        return acc;
    }, []);

    // Create slides
    groupedTemplates.forEach(group => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        const slideContent = group.map(template => `
            <div class="template-card" data-category="${template.category}">
                <div class="template-preview">
                    <img src="./imgs/templates/${template.image}" alt="${template.title}">
                    <div class="template-overlay">
                        <button class="btn btn-primary preview-btn">Preview Template</button>
                    </div>
                </div>
                <div class="template-info">
                    <h3>${template.title}</h3>
                    <p>${template.description}</p>
                    <span class="template-tag">${template.category.charAt(0).toUpperCase() + template.category.slice(1)}</span>
                </div>
            </div>
        `).join('');

        slide.innerHTML = slideContent;
        swiperWrapper.appendChild(slide);
    });

    // Initialize Swiper
    new Swiper('.template-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
            }
        }
    });
}

// Update filter functionality
function updateTemplateFilter(category) {
    const slider = document.querySelector('.template-slider').swiper;
    
    slider.slides.forEach(slide => {
        const cards = slide.querySelectorAll('.template-card');
        let hasVisibleCard = false;
        
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                hasVisibleCard = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        slide.style.display = hasVisibleCard ? 'block' : 'none';
    });
    
    slider.update();
}

// Add event listeners for filter buttons
function initTemplateFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateTemplateFilter(button.dataset.filter);
        });
    });
}

// Make functions available globally
window.renderTemplateCards = renderTemplateCards;
window.initTemplateFilters = initTemplateFilters;
