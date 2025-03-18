// Toggle sidebar visibility
let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function() {
    sidebar.classList.toggle('active');
};

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    let sections = document.querySelectorAll(".content-section");
    let links = document.querySelectorAll(".sidebar ul li a");

    // Function to show a specific section and hide others
    function showSection(sectionId) {
        sections.forEach(section => section.style.display = "none");
        document.getElementById(sectionId).style.display = "block";
    }

    // Add click event listeners to sidebar links
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            let sectionId = this.getAttribute("data-section");
            if (document.getElementById(sectionId)) {
                showSection(sectionId);
            }
        });
    });

    // Show the default section on page load
    showSection("timeline-section");

    // Handle form submission for adding timeline events
    document.getElementById("timelineForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let title = document.getElementById("event-title").value;
        let date = document.getElementById("event-date").value;
        let description = document.getElementById("event-description").value;

        let tableBody = document.getElementById("timeline-body");

        // Create a new row for the event
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${date}</td>
            <td>${title}</td>
            <td>${description}</td>
            <td><button onclick="deleteEvent(this)">Delete</button></td>
        `;

        // Append the new row to the table body
        tableBody.appendChild(row);

        // Clear the form
        document.getElementById("timelineForm").reset();
    });

    // Function to delete an event from the timeline
    function deleteEvent(button) {
        button.parentElement.parentElement.remove();
    }

    // Collapsible category list script
    const collapsibleButton = document.querySelector(".category-list .collapsible");
    const collapsibleContent = document.querySelector(".category-list .collapsible-content");

    collapsibleButton.addEventListener("click", function() {
        // Toggle active state on the button to change icon
        this.classList.toggle("active");

        // Toggle the collapsible content height
        if (collapsibleContent.style.maxHeight) {
            collapsibleContent.style.maxHeight = null;
        } else {
            collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px";
        }
    });

    // JavaScript for filtering product cards based on the selected category
    const categoryItems = document.querySelectorAll('.category-list li');
    const productCards = document.querySelectorAll('.product-card');

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Retrieve the category from the clicked element
            const selectedCategory = item.getAttribute('data-category');

            // Toggle the active class for styling purposes
            categoryItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            // Display cards matching the selected category or show all if "all" is selected
            productCards.forEach(card => {
                if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Optionally, trigger the "All" category on page load
    document.querySelector('.category-list li[data-category="all"]').click();

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Tracking Bar Functionality
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var trak = document.getElementById('progress');
    var step = document.getElementById('step');

    next.addEventListener('click', function() {
        var cls = trak.className.split('-').pop();
        cls > 6 ? cls = 0 : cls++;

        step.innerHTML = cls;
        trak.className = 'progress-' + cls;
    });

    prev.addEventListener('click', function() {
        var cls = trak.className.split('-').pop();
        cls < 1 ? cls = 7 : cls--;

        step.innerHTML = cls;
        trak.className = 'progress-' + cls;
    });
});

// --- Quick View Modal Functionality ---
const modal = document.getElementById('quick-view-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalExtra = document.getElementById('modal-extra');
const modalStatus = document.getElementById('modal-status');
const closeButton = document.querySelector('.close-button');

// Map numeric progress values to tracking status texts
const progressMapping = {
  "1": "To Pay",
  "2": "To Ship",
  "3": "To Receive",
  "4": "Completed",
  "5": "Cancelled",
  "6": "Return/Refund"
};

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.getAttribute('data-title');
    const price = card.getAttribute('data-price');
    const extra = card.getAttribute('data-extra');
    const progress = card.getAttribute('data-progress');
    const imgSrc = card.querySelector('img').src;
    
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalExtra.textContent = extra;
    modalImage.src = imgSrc;
    // Update tracking status based on product's data-progress
    modalStatus.textContent = progressMapping[progress] || "Unknown";
    
    modal.style.display = 'block';
  });
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});