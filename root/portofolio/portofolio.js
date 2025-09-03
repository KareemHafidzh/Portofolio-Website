document.addEventListener('DOMContentLoaded', () => {
    const projectsData = {
        1: {
            id: "project1",
            title: "KChat - Kareem Chat",
            image: "/assets/KChat.png",
            description: "An IOS Application Chat that can chat with friends in real-time, built with SwiftUI and Firebase. It features user authentication, real-time messaging, and a sleek, user-friendly interface. i created it entirely by myself.",
            githubLink: "https://github.com/KareemHafidzh/KChats.git"
        },
        2: {
            id: "project2",
            title: "Burncup",
            image: "/assets/burncupImage.png",
            description: "Website that introduces the Burncup competition, providing information about the event, rules, and registration details. Built using Tailwindcss, the site features a modern design and responsive layout to ensure accessibility across all devices, This is group Project and im taking role as a Project Manager in this project.",
            githubLink: "https://github.com/NotchG/BurnCup"
        },
        3: {
            id: "project3",
            title: "HackerNews App",
            image: "/assets/newsHackerApp.png",
            description: "An iOS application that fetches and displays news articles from the Hacker News API. Built with SwiftUI, the app features a clean and intuitive interface, allowing users to browse top stories, read article details, and view comments. This project showcases my skills in API integration, asynchronous data handling, and modern iOS development practices.",
            githubLink: "https://github.com/KareemHafidzh/HackerNewsApp.git"
        },
        4: {
            id: "project4",
            title: "WeatherApp",
            image: "/assets/WeatherApp.png",
            description: "An iOS application that provides real-time weather information for various locations. Built with UIKit and integrated with a weather API, the app features a sleek design and user-friendly interface. Users can search for cities, view current weather conditions, and access a 7-day forecast. This project demonstrates my ability to work with APIs, manage state, and create responsive layouts in UIKit.",
            githubLink: "https://github.com/KareemHafidzh/WeatherApp-s.git"
        }
    };
    
    
    // Get all relevant elements from the DOM
    const projectModal = document.getElementById("project-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const githubLinkBtn = document.getElementById("github-link-btn");
    const body = document.body;
    const html = document.documentElement; 

    const fishContainerForModal = document.getElementById('fish-container');
    const fishWrapper = fishContainerForModal ? fishContainerForModal.parentElement : null;

    let scrollPosition = 0;


    function openModal(project) {
        if (project) {
            // Populate modal with project data
            modalTitle.textContent = project.title;
            modalImage.src = project.image;
            modalDescription.textContent = project.description;
            githubLinkBtn.href = project.githubLink;
            scrollPosition = window.pageYOffset;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.top = `-${scrollPosition}px`;
            body.style.width = '100%';
            body.style.paddingRight = `${scrollbarWidth}px`;

            if (fishWrapper) {
                fishWrapper.style.overflowX = 'hidden';
            }
            
            projectModal.classList.remove('hidden', 'opacity-0'); 
            projectModal.classList.add('flex', 'opacity-100');
        }
    }

    function closeModal() {
        projectModal.classList.remove('flex', 'opacity-100');
        projectModal.classList.add('hidden', 'opacity-0');

        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.paddingRight = '';

        window.scrollTo(0, scrollPosition);

        if (fishWrapper) {
            fishWrapper.style.overflowX = 'visible';
        }
    }
    
    // --- Event Listeners ---
    
    // Event listener for clicking on a project card
    document.querySelectorAll('[data-project-id]').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            const project = projectsData[projectId];
            openModal(project); // Use the refactored function
        });
    });
    
    // Event listener for closing the modal
    closeModalBtn.addEventListener('click', closeModal); // Use the refactored function
    
    // Close modal when clicking outside of it
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal(); // Use the refactored function
        }
    });
});

// === BAGIAN KODE IKAN (TIDAK ADA PERUBAHAN, SUDAH BENAR) ===

const fishContainer = document.getElementById('fish-container');
const numFish = 80; // The number of fish to generate

// Array of placeholder fish image URLs
const fishImages = [
    "../assets/1.png",
    "../assets/2.png",
    "../assets/3.png",
    "../assets/4.png",
    "../assets/5.png"
];

function createRandomFish() {
    const fishDiv = document.createElement('div');
    const fishImg = document.createElement('img');
    
    // Set random image source
    const randomImage = fishImages[Math.floor(Math.random() * fishImages.length)];
    fishImg.src = randomImage;
    fishImg.alt = "A paper fish";
    
    // Set random size
    const size = Math.random() * 70 + 70; // Between 50 and 100
    // NOTE: Tailwind JIT compiler might not see dynamic classes like this.
    // It's better to use inline styles for dynamic values.
    fishImg.style.width = `${size}px`;
    fishImg.style.height = `${size / 2}px`;
    
    fishDiv.appendChild(fishImg);
    
    // Give each fish a unique ID and class for the animation
    const fishId = `fish-${Math.random().toString(36).substring(2, 9)}`;
    fishDiv.id = fishId;
    fishDiv.classList.add('fish', 'absolute');
    
    fishDiv.style.top = `${Math.random() * document.body.scrollHeight}px`;
    
    // Randomly decide if the fish swims left-to-right or right-to-left
    const isLeftToRight = Math.random() < 0.5;
    if (isLeftToRight) {
        fishDiv.style.left = `-${size}px`; // Start off-screen to the left
    } else {
        fishDiv.style.left = `${window.innerWidth}px`; // Start off-screen to the right
        fishImg.style.transform = 'scaleX(-1)'; // Flip the image to face left
    }
    
    // Create a unique animation for this fish
    const duration = Math.random() * 20 + 20; // Between 20s and 40s
    const delay = Math.random() * 10; // Between 0s and 10s
    
    // Generate keyframe values to ensure the fish swims completely across the screen
    const transform100 = isLeftToRight ? `translateX(${window.innerWidth + size}px)` : `translateX(-${window.innerWidth + size}px)`;
    
    const keyframes = `@keyframes ${fishId}-swim {
        from { transform: translateX(0); }
        to { transform: ${transform100}; }
    }`;
    
    // Find or create a style element to hold the keyframes
    let styleSheet = document.getElementById('fish-animations');
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = 'fish-animations';
        document.head.appendChild(styleSheet);
    }
    styleSheet.sheet.insertRule(keyframes, styleSheet.sheet.cssRules.length);
    
    // Apply the unique animation
    fishDiv.style.animation = `${fishId}-swim ${duration}s linear ${delay}s infinite`;
    
    // Append the fish to the container
    fishContainer.appendChild(fishDiv);
}

// Generate the fish and animate them
for (let i = 0; i < numFish; i++) {
    createRandomFish();
}

