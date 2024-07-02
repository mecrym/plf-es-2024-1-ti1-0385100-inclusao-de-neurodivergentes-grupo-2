document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const checkbox = document.querySelector('#switch');
    const data = { completion: false };

    // Toggle Priority Button
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                console.log("Checked");
                data.completion = true;
                createOrUpdateTimePickerSections();
            } else {
                removeTimePickerSections();
                data.completion = false;
                console.log("Not checked");
            }
        });
    }

    function createOrUpdateTimePickerSections() {
        // Logic to create or update time picker sections
        console.log("Creating or updating time picker sections");
    }

    function removeTimePickerSections() {
        // Logic to remove time picker sections
        console.log("Removing time picker sections");
    }
});
