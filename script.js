// --- Vehicle Data ---
const vehicles = [
    { id: 1, model: "Sedan X", year: 2023, price: 25000, engine: "2.0L Turbo", transmission: "Automatic", torque: "350 Nm", speed: "5.5s (0-60)" },
    { id: 2, model: "Truck Alpha", year: 2024, price: 45000, engine: "5.0L V8", transmission: "Automatic", torque: "550 Nm", speed: "7.0s (0-60)" },
    { id: 3, model: "Hatchback Z", year: 2022, price: 18000, engine: "1.5L I4", transmission: "Manual", torque: "180 Nm", speed: "8.8s (0-60)" }
];

const contentArea = document.getElementById('content-area');

// --- Navigation Listener ---
document.addEventListener('DOMContentLoaded', () => {
    // Set up listeners for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = event.target.getAttribute('data-page');
            loadPage(page);

            // Update active class for styling
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            event.target.classList.add('active');
        });
    });

    // Load the default page (Home) when the site loads
    loadPage('home');
});


// --- Core Page Loader Function ---
function loadPage(pageName, vehicleId = null) {
    contentArea.innerHTML = ''; // Clear current content

    switch (pageName) {
        case 'home':
            renderHomePage();
            break;
        case 'details':
            renderDetailsPage(vehicleId);
            break;
        case 'contact':
            renderContactPage();
            break;
        default:
            contentArea.innerHTML = '<h2>404 Page Not Found</h2>';
    }
}


// --- 1. Home Page Rendering ---
function renderHomePage() {
    let html = `<h2>Available Vehicles</h2><div class="card-container">`;

    vehicles.forEach(vehicle => {
        // Template for each vehicle card
        html += `
            <div class="card">
                <h3>${vehicle.model}</h3>
                <p>${vehicle.year} Model | <strong>$${vehicle.price.toLocaleString()}</strong></p>
                <p>Engine: ${vehicle.engine}</p>
                <a href="#" class="btn view-details" data-id="${vehicle.id}">View Specs</a>
            </div>
        `;
    });

    html += `</div>`;
    contentArea.innerHTML = html;

    // Attach click listeners to the dynamically created 'View Specs' buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(e.target.getAttribute('data-id'));
            loadPage('details', id);
        });
    });
}


// --- 2. Details Page Rendering ---
function renderDetailsPage(id) {
    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) {
        contentArea.innerHTML = `<h2>Vehicle Not Found</h2>`;
        return;
    }

    // Template for the details page
    contentArea.innerHTML = `
        <h2>${vehicle.model} Specifications</h2>
        <div class="detail-content">
            <div class="image-placeholder">
                
            </div>
            <div class="specs">
                <h3>Key Specifications</h3>
                <ul>
                    <li>**Year:** ${vehicle.year}</li>
                    <li>**Engine:** ${vehicle.engine}</li>
                    <li>**Transmission:** ${vehicle.transmission}</li>
                    <li>**Price:** $${vehicle.price.toLocaleString()}</li>
                </ul>

                <button id="show-more-btn" class="btn">Show Advanced Specs</button>

                <div id="extra-specs" class="hidden-specs">
                    <h4>Advanced Details</h4>
                    <ul>
                        <li>**Torque:** ${vehicle.torque}</li>
                        <li>**0-60 mph:** ${vehicle.speed}</li>
                    </ul>
                </div>
            </div>
        </div>
        <a href="#" class="btn primary-btn" style="margin-top: 30px;" data-page="home">Back to List</a>
    `;
    
    // Feature: Toggle hidden specs using an event listener
    const showMoreBtn = document.getElementById('show-more-btn');
    const extraSpecs = document.getElementById('extra-specs');

    showMoreBtn.addEventListener('click', () => {
        if (extraSpecs.style.display === 'block') {
            extraSpecs.style.display = 'none';
            showMoreBtn.textContent = 'Show Advanced Specs';
        } else {
            extraSpecs.style.display = 'block';
            showMoreBtn.textContent = 'Hide Advanced Specs';
        }
    });
}


// --- 3. Contact Page Rendering ---
function renderContactPage() {
    // Template for the contact form
    contentArea.innerHTML = `
        <h2>Get in Touch</h2>
        <form id="contact-form" class="contact-form">
            <label for="name">Your Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Your Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="vehicle-model">Interested Vehicle Model:</label>
            <input type="text" id="vehicle-model" name="vehicle-model">
            
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button type="submit" class="btn primary-btn">Submit Inquiry</button>
            <div id="form-message" class="message-box" style="display: none;"></div>
        </form>
    `;

    // Feature: Handle form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload

        const name = document.getElementById('name').value;
        const model = document.getElementById('vehicle-model').value || 'a Vehicle';
        const messageBox = document.getElementById('form-message');

        // Simple feedback
        messageBox.textContent = `Thank you, ${name}! Your inquiry about ${model} has been sent.`;
        messageBox.classList.add('success');
        messageBox.style.display = 'block';

        event.target.reset(); // Clear the form fields
    });
}