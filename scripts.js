// Script url: https://script.google.com/home/projects/1yS8MyRyXcw6hPSGq6OQrp4S5kCiT8s0MdqzpK8GLddg63jyGVv2bD3FB/edit
const scriptUrl = 'https://script.google.com/macros/s/AKfycbyhcOr4DEZqStYGXRSBrm3lE9r_oyAnkwvR3FW9LGV8jatSmv1v_15bMo6eOWQ7rVLJyw/exec';  // Replace with your Google Apps Script web app URL

document.addEventListener("DOMContentLoaded", function() {
    loadDropdownData();
    typeText();
});

// Define the text to be typed
const textToType = "إنشاء اسم الملف";
const delay = 100; // Delay between typing each character (in milliseconds)

// Get the span element where the text will be typed
const typedTextElement = document.getElementById("typed-text");

// Initialize variables
let charIndex = 0;

// Function to type text
function typeText() {
    // Check if all characters are typed
    if (charIndex < textToType.length) {
        // Append the next character to the typed text
        typedTextElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        // Call the function recursively after the delay
        setTimeout(typeText, delay);
    }
}


async function loadDropdownData() {
    try {
        const response = await fetch(scriptUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data

        if (data.Creator_name) {
            console.log('Creator Name Data:', data.Creator_name);
            populateDropdown("creator", data.Creator_name);
        } else {
            console.warn('No data found for Creator_name sheet');
        }

        if (data["Voice-Over"]) {
            console.log('Voice-Over Data:', data["Voice-Over"]);
            populateDropdown("vo", data["Voice-Over"]);
        } else {
            console.warn('No data found for Voice-Over sheet');
        }

        if (data.Offer) {
            console.log('Offer Data:', data.Offer);
            populateDropdown("offer", data.Offer);
        } else {
            console.warn('No data found for Offer sheet');
        }

        if (data["Designer-Editor"]) {
            console.log('Designer-Editor Data:', data["Designer-Editor"]);
            populateDropdown("designer", data["Designer-Editor"]);
        } else {
            console.warn('No data found for Designer-Editor sheet');
        }

        if (data.Photographer) {
            console.log('Photographer Data:', data.Photographer);
            populateDropdown("photographer", data.Photographer);
        } else {
            console.warn('No data found for Photographer sheet');
        }

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function populateDropdown(elementId, options) {
    const dropdown = document.getElementById(elementId);
    dropdown.innerHTML = ''; // Clear existing options

    // Add a blank option as the first item
    const blankOption = document.createElement('option');
    blankOption.value = ''; // Empty value
    blankOption.textContent = ''; // Empty display text
    dropdown.appendChild(blankOption);

    // Populate the dropdown with new options
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option; 
        opt.textContent = option; 
        dropdown.appendChild(opt);
    });

    // If no options, add a placeholder
    if (options.length === 0) {
        const opt = document.createElement('option');
        opt.textContent = 'No options available';
        dropdown.appendChild(opt);
    }
}

// Function to generate the name based on input and selections
function generateName() {
    const name = document.getElementById("name").value;
    const variation = document.getElementById("variation").value;
    const creator = document.getElementById("creator").value;
    const vo = document.getElementById("vo").value;
    const designer = document.getElementById("designer").value;
    const photographer = document.getElementById("photographer").value;
    const offer = document.getElementById("offer").value;

    // Validate required fields
    if (!name) {
        alert("Please enter a name.");
        return;
    }
    if (!variation) {
        alert("Please select a variation.");
        return;
    }
    if (!offer) {
        alert("Please select an offer.");
        return;
    }

    // Build the segments conditionally
    const segments = [];

    // Add creator, vo, designer, and photographer to segments if they are not empty
    if (creator) segments.push(creator);
    if (vo) segments.push(vo);
    if (designer) segments.push(designer);
    if (photographer) segments.push(photographer);

    // Construct the segments string
    const segmentsString = segments.length > 0 ? `(${segments.join('/')})` : '';

    // Construct the final generated name with a hyphen before segments and offer
    const generatedName = `${name}-${variation}${segmentsString ? '-' + segmentsString : ''}-${offer}`;

    // Display the generated name
    document.getElementById("output").innerText = generatedName;
}

