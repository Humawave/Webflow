window.addEventListener('load', () => {
    // Store ID to store name mapping
    const storeMapping = {
        A1: 'Abercrombie & Fitch',
        A2: 'Adidas',
        A3: 'Aerie',
        A4: 'Aesop',
        A5: 'Aldo',
        A6: 'AllSaints',
        A7: 'Alo Yoga',
        A8: 'American Eagle Outfitters',
        A9: 'Apple',
        A10: 'Arc\'teryx',
        A11: 'Aritzia',
        A12: 'Athleta',
        A13: 'Aveda',
        B1: 'B2',
        B2: 'Babaton',
        B3: 'Bailey Nelson',
        B4: 'Banana Republic',
        B5: 'Bath & Body Works',
        B6: 'Bentley',
        B7: 'Best Buy',
        B8: 'Bikini Village',
        B9: 'Bluenotes',
        C1: 'Call It Spring',
        C2: 'Canada Goose',
        C3: 'Canadian Tire',
        C6: 'Club Monaco',
        C7: 'Coach',
    };

    function updateHiddenFieldWithStoreNames() {
        const params = new URLSearchParams(window.location.search);
        const selectedIds = Array.from(params.keys());
        const selectedStoreNames = selectedIds.map(id => storeMapping[id]).filter(Boolean);

        const hiddenField = document.getElementById('selected-stores');
        if (hiddenField) {
            hiddenField.value = selectedStoreNames.join(', ');

            // Debugging: Log the hidden field value
            console.log('Hidden Field Value:', hiddenField.value);
        }
    }

    updateHiddenFieldWithStoreNames();
});
