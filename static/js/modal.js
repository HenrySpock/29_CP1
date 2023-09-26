// Get the modal
var modal = document.getElementById('imageNameModal');

// When the user clicks on <span> (x), close the modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

// This function is to open the modal
function openImageNameModal() {
    modal.style.display = "block";
}

// This function will handle saving the image URL with the given name
function saveImageUrlWithName(event) {
    event.preventDefault();  // Prevent the default form submission behavior

    var imageUrl = document.getElementById('manualImageUrl').value;
    var imageName = document.getElementById('imageName').value;

    // Assuming you have an API endpoint set up to save the image in your Flask app:
    var listId = document.getElementById('list_id').value;
    fetch('/images/save_image/' + listId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imageUrl: imageUrl,
            imageName: imageName
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "/lists/list_details/" + listId; // Redirect to another page (if needed)
        } else {
            alert("Error saving the image.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function chooseImage(imageUrl, listId) {
  // Assuming you want to do something with the imageUrl and listId 
  // Maybe set them in some hidden fields or global variables for later use
  // For this example, I'll just console.log them
  console.log(imageUrl, listId);
  
  // Open the modal
  document.getElementById('imageNameModal').style.display = "block";
}

function chooseImageFromList(imageUrl, listId) {
  // Open the modal
  openImageNameModal();

  // Save the imageUrl to a global variable or a hidden input field so we can access it later
  document.getElementById('selectedImageUrl').value = imageUrl;
}

function saveSelectedImageUrlWithName(event) {
  event.preventDefault();

  var imageUrl = document.getElementById('selectedImageUrl').value;
  var imageName = document.getElementById('imageName').value;
  var listId = document.getElementById('list_id').value;

  fetch('/images/save_image/' + listId, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          imageUrl: imageUrl,
          imageName: imageName
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          window.location.href = "/lists/list_details/" + listId;
      } else {
          alert("Error saving the image.");
      }
  })
  .catch(error => {
      console.error("Error:", error);
  });
}