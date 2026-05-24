// Elements
const menuIcon = document.getElementById('menu-icon');
const navlist = document.querySelector('.navlist');
const navLinks = document.querySelectorAll('.navlist a');
const contactForm = document.getElementById('contact-form');
const themeBtn = document.getElementById('theme-btn');

// Toggle Menu
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-xmark');
    navlist.classList.toggle('active');
});

// Theme Toggle
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
        themeBtn.classList.remove('fa-moon');
        themeBtn.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark-theme');
        themeBtn.classList.remove('fa-sun');
        themeBtn.classList.add('fa-moon');
    }
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
}

themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    setTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Close Menu on Link Click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('fa-xmark');
        navlist.classList.remove('active');
    });
});

// Active Link on Scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Form Validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Reset previous errors
    document.querySelectorAll('.input-group').forEach(group => group.classList.remove('error'));
    
    // Validate Name
    if (nameInput.value.trim() === '') {
        setError(nameInput, 'Name is required');
        isValid = false;
    }
    
    // Validate Email
    if (emailInput.value.trim() === '') {
        setError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        setError(emailInput, 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate Message
    if (messageInput.value.trim() === '') {
        setError(messageInput, 'Message is required');
        isValid = false;
    }
    
    if (isValid) {
        // Here you would typically send the data to a server
        alert('Message sent successfully!');
        contactForm.reset();
    }
});

function setError(input, message) {
    const inputGroup = input.parentElement;
    const errorMsg = inputGroup.querySelector('.error-msg');
    errorMsg.innerText = message;
    inputGroup.classList.add('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
