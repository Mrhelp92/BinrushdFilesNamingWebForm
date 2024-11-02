const scriptUrl = 'https://script.google.com/macros/s/AKfycbyhcOr4DEZqStYGXRSBrm3lE9r_oyAnkwvR3FW9LGV8jatSmv1v_15bMo6eOWQ7rVLJyw/exec';  // Replace with your Google Apps Script web app URL

document.addEventListener("DOMContentLoaded", function() {
    loadDropdownData();
});

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

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function populateDropdown(elementId, options) {
    const dropdown = document.getElementById(elementId);
    dropdown.innerHTML = ''; // Clear existing options

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option; 
        opt.textContent = option; 
        dropdown.appendChild(opt);
    });

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
    const offer = document.getElementById("offer").value;

    const generatedName = `${name}-${variation}-(${creator}/${vo})-(${offer})`;
    document.getElementById("output").innerText = generatedName;
}
