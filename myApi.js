document.addEventListener("DOMContentLoaded", function() {
    // Botón XMLHttpRequest
    document.getElementById("xmlHttpRequestBtn").addEventListener("click", function() {
        makeRequest("xmlHttpRequest");
    });

    // Botón Fetch API
    document.getElementById("fetchBtn").addEventListener("click", function() {
        makeRequest("fetch");
    });

    // Botón jQuery Local
    document.getElementById("jqueryLocalBtn").addEventListener("click", function() {
        makeRequest("jqueryLocal");

});

    // Botón jQuery CDN
    document.getElementById("jqueryCdnBtn").addEventListener("click", function() {
        makeRequest("jqueryCdn");
    });
});

function makeRequest(method) {
    var url = "https://picsum.photos/200/300";
    var xhr = new XMLHttpRequest();

    if (method === "xmlHttpRequest") {
        xhr.open("GET", url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var imageUrl = xhr.responseURL;
                displayImage(imageUrl, "Image loaded using XMLHttpRequest");
            }
        };
        xhr.send();
    } else if (method === "fetch") {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.url;
            })
            .then(imageUrl => {
                displayImage(imageUrl, "Image loaded using Fetch API");
            })
            .catch(error => console.error("Fetch error:", error));
    } else if (method === "jqueryLocal") {
        $.get(url, function(data, textStatus, jqXHR) {
            var imageUrl = jqXHR.getResponseHeader("X-final-url");
            displayImage(imageUrl, "Image loaded using jQuery (Local)");
        });
    } else if (method === "jqueryCdn") {
        $.get(url, function(data, textStatus, jqXHR) {
            var imageUrl = jqXHR.getResponseHeader("X-final-url");
            displayImage(imageUrl, "Image loaded using jQuery (CDN)");
        });
    }
}

function displayImage(imageUrl, description) {
    var imageContainer = document.getElementById("imageContainer");
    var imageDescription = document.getElementById("imageDescription");
    imageContainer.innerHTML = "<img src='" + imageUrl + "' alt='Random Image'>";
    imageDescription.textContent = description;
}
