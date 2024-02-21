document.addEventListener('DOMContentLoaded', function() {
    // Mapping of store IDs to names
    const storeNames = {
        '1': 'Abercrombie & Fitch',
        '2': 'Adidas',
        '47': 'Geox',
        '70': 'La Senza',
        '81': 'Loblaws',
        '82': 'Lululemon',
        '107': 'Sephora',
        '133': 'ZARA'
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
});
