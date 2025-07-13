// Select all stars and the rating display element
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('ratingValue');
let selectedRating = 0; // Variable to store the selected rating

// Add event listeners to each star
stars.forEach((star, index)=> {
  // Highlight stars on hover
  star.addEventListener('mouseover', ()=> {
    highlightStars(index + 1);
  });

  // Reset highlight when the mouse leaves
  star.addEventListener('mouseleave', () => {
    highlightStars(selectedRating); // Show only the selected rating
  });

  // Set selected rating on click
  star.addEventListener('click', () => {
    selectedRating = index + 1;
    ratingValue.textContent = selectedRating;
  });
});

// Function to highlight stars based on the given rating
function highlightStars(rating) {
  stars.forEach((star, index) => {
    star.classList.remove('hover', 'active');
    if (index < rating) {
      star.classList.add('hover');
    }
  });
}
