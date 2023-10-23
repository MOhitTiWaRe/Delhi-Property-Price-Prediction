document.addEventListener("DOMContentLoaded", function() {
    // Fetch locations from the Flask server
    fetch('http://127.0.0.1:5000/get_location_names', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const locationSelect = document.getElementById("location");
            data.locations.forEach(location => {
                const option = new Option(location);
                locationSelect.appendChild(option);
            });
        })
        .catch(error => console.error(error));

    document.getElementById("predictButton").addEventListener("click", function() {
        const location = document.getElementById("location").value;
        const area = parseFloat(document.getElementById("area").value);
        const bhk = parseInt(document.getElementById("bhk").value);
        const bathroom = parseInt(document.getElementById("bathroom").value);

        // Highlight the selected BHK and Bathroom values
        highlightSelectedOption("bhk", bhk);
        highlightSelectedOption("bathroom", bathroom);

        // Make an AJAX request to the Flask server for price prediction
        var url = "http://127.0.0.1:5000/predict_home_price";
        $.post(url, {
            area: area,
            bhk: bhk,
            bathroom: bathroom,
            location: location
        }, function(data, status) {
            console.log(data.estimated_price);
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
            resultDiv.classList.add("result"); // Add this line to apply the CSS class
            console.log(status);
        });
    });
});

function highlightSelectedOption(selectId, value) {
    const select = document.getElementById(selectId);
    for (let option of select.options) {
        if (parseInt(option.value) === value) {
            option.selected = true;
        } else {
            option.selected = false;
        }
    }
}