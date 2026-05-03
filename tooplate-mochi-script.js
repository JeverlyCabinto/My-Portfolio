/*

Tooplate 2159 Mochi Space

https://www.tooplate.com/view/2159-mochi-space

*/

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on load

// Active nav link highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileNavLinks = document.querySelectorAll('.mobile-menu-links a');

function highlightNavOnScroll() {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            mobileNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);
highlightNavOnScroll(); // Check on load

// Mobile Menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMobileMenu() {
    mobileMenuBtn.classList.add('active');
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', function() {
    if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

mobileOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

document.querySelector('.mobile-menu-cta').addEventListener('click', closeMobileMenu);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Handle scroll to top for just '#'
        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mood button interaction
const moodBtns = document.querySelectorAll('.mood-btn');
moodBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        moodBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Mochi interaction
const mochiBody = document.querySelector('.mochi-body');
if (mochiBody) {
    mochiBody.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
        
        // Add a little bounce
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
}

// Profile interaction
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('click', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
}

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-bar');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});
