// Mapping of store IDs to names
const storeNames = {
    'A1': 'Abercrombie & Fitch',
    'A2': 'Adidas',
    'A4': 'Aesop',
    'A5': 'ALDO',
    'A7': 'AllSaints',
    'A8': 'Alo Yoga',
    'A9': 'American Eagle Outfitters',
    'A11': 'Arcteryx',
    'A12': 'Aritzia',
    'A13': 'Athleta',
    'A14': 'Aveda',
    'G3': 'GEOX',
    'L14': 'Loblaws',
    'L15': 'Lululemon',
    'S4': 'Sephora',
    'U1': 'UGG',
    'Z1': 'ZARA'
};

// Function to format the selected store names text
function formatSelectedStoresText(selectedIds) {
    const names = selectedIds.map(id => storeNames[id]).filter(name => name !== undefined);
    
    if (names.length > 1) {
        const last = names.pop();
        return `${names.join(', ')} and ${last}`;
    } else {
        return names.join('');
    }
}

// Get 'selectedStores' from URL
const queryParams = new URLSearchParams(window.location.search);
const selectedStores = queryParams.get('selectedStores');

if (selectedStores) {
    const selectedIds = selectedStores.split(',');
    const selectedText = formatSelectedStoresText(selectedIds);
    
    // Assuming you have a div with an ID of 'selections-text' for displaying the selections
    const selectionsDiv = document.getElementById('selections-text');
    if (selectionsDiv) {
        selectionsDiv.textContent = selectedText;
    }
}
