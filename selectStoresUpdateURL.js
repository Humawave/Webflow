function updateURLToggleDivAndUpdateLinkAndUpdateCount() {
    const checkboxes = document.querySelectorAll('.cms_list input[type="checkbox"]');
    const selectedIds = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.getAttribute('id'));

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('selectedStores', selectedIds.join(','));

    // Preserve other query parameters
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.forEach((value, key) => {
        if (key !== 'selectedStores') { // Don't overwrite the selectedStores parameter
            queryParams.set(key, value);
        }
    });

    history.pushState(null, '', '?' + queryParams.toString());

    const baseURL = 'https://humawave.webflow.io/onboarding';
    const linkBlockURL = selectedIds.length > 0 ? `${baseURL}?${queryParams.toString()}` : baseURL;

    const sectionContinue = document.getElementById('section-continue');
    if (selectedIds.length > 0) {
        sectionContinue.style.display = 'block';
        sectionContinue.style.opacity = 1;
        sectionContinue.style.transition = 'opacity 100ms ease-in';
    } else {
        sectionContinue.style.opacity = 0;
        sectionContinue.style.transition = 'opacity 100ms ease-out';
        setTimeout(() => {
            sectionContinue.style.display = 'none';
        }, 100);
    }

    const linkContinue = document.getElementById('link-continue');
    linkContinue.setAttribute('href', linkBlockURL);
}

// Attach change event listener to checkboxes
document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount);
});
