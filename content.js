function collapseFailedDetails() {
    const failedDetails = document.querySelectorAll(
        'details[data-conclusion="failure"][open]'
    );

    failedDetails.forEach(el => {
        // Skip if manually opened
        if (el.hasAttribute("manually-opened")) return;

        el.removeAttribute("open");
    });
}

// Run immediately
collapseFailedDetails();

// Temporary observer to prevent GitHub from re-opening (only for non-manually-opened)
const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
        if (
            m.type === "attributes" &&
            m.attributeName === "open" &&
            m.target.matches('details[data-conclusion="failure"], details[data-conclusion="null"]') &&
            !m.target.hasAttribute("manually-opened")
        ) {
            m.target.removeAttribute("open");
        }
    });
});

// Observe only attribute changes for a short time
observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["open"]
});

// Stop observing after 2 seconds (adjust if needed)
setTimeout(() => observer.disconnect(), 2000);
