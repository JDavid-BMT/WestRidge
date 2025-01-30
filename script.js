"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const googleDriveLinks = [
        "https://drive.google.com/file/d/1MKVCM1DIXIhkdAysMjnrAL2a62CZRY3F/view?usp=drive_link",
        "https://drive.google.com/file/d/1ruCZzjRRkBU0Z6yYVfpSyvwMihq-XqLK/view?usp=drive_link",
        "https://drive.google.com/file/d/1IPhbx9l07Mncx5L3cf78rjxR-RJVyQHQ/view?usp=drive_link",
        "https://drive.google.com/file/d/13xh5d6Ns9HBe4qXNJDlIfp5N_EGV_ytM/view?usp=drive_link",
        "https://drive.google.com/file/d/1kNuPLKum3EvOZmyb6Q-74pZFTbVORNlx/view?usp=drive_link",
        "https://drive.google.com/file/d/1dWBJwYCPCspCqEp11mKBHvAiv4fIM0aF/view?usp=drive_link",
        "https://drive.google.com/file/d/1gHzzzDXJKutnVqfNDxvkLK0Vex0lFztp/view?usp=drive_link",
        "https://drive.google.com/file/d/1nSUetzZdC3twEqiEZaTYrDhay3pZ5u2g/view?usp=drive_link",
        "https://drive.google.com/file/d/1KN1dz-U3edx91hbXo5-WyVEHzrBgxiF1/view?usp=drive_link",
        "https://drive.google.com/file/d/17-tSesr5V5eqvXBXYDGdiFFLxv_il6Rs/view?usp=drive_link",
        "https://drive.google.com/file/d/1HN7yUeXo5xqF4S6sICKjQgsR0gNBk-fn/view?usp=drive_link",
        "https://drive.google.com/file/d/16rObvEEOlrcfKjjKpObpNESHUgw3TxKG/view?usp=drive_link"
    ];
    // Convert Google Drive links to direct image links
    const photoGalleryImages = googleDriveLinks.map(getGoogleDriveDirectLink);
    createGallery(photoGalleryImages, "gallery-pictures");
    createGallery([
        "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679128dc2aa71ac2da688614.jpeg",
        "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679128dce54e4a376b44a92f.jpeg",
        "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679128dcc21e37ee3bacc799.jpeg",
        "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679128dc2aa71a2806688613.jpeg'"
    ], "gallery-floorplan");
    createDroneFootage("gallery-drone", "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/67912ed56a58c4804f1242af.mp4");
});
// Function to convert Google Drive links to direct image links
function getGoogleDriveDirectLink(fileUrl) {
    const match = fileUrl.match(/\/d\/(.*?)\//);
    return match
        ? `https://lh3.googleusercontent.com/d/${match[1]}=w800`
        : fileUrl;
}
// Function to create a gallery
function createGallery(images, galleryId) {
    const galleryElement = document.getElementById(galleryId);
    if (!galleryElement)
        return;
    let galleryHTML = `
    <div class="gallery__main">
      <img id="${galleryId}-current" class="gallery__img" src="${images[0]}" alt="Main Gallery Image">
    </div>
    <div class="gallery__thumbnails">
  `;
    images.forEach((imgUrl, index) => {
        galleryHTML += `
      <label class="gallery__thumb" data-index="${index}">
        <img src="${imgUrl}" alt="Thumbnail ${index + 1}">
      </label>
    `;
    });
    galleryHTML += `</div>`;
    galleryElement.innerHTML = galleryHTML;
    setupThumbnailClickHandler(galleryId, images);
}
// Function to create the drone footage video
function createDroneFootage(galleryId, videoUrl) {
    const galleryElement = document.getElementById(galleryId);
    if (!galleryElement)
        return;
    galleryElement.innerHTML = `
    <div class="drone-container">
      <video controls class="drone-video">
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
}
// Function to handle thumbnail clicks
function setupThumbnailClickHandler(galleryId, images) {
    const mainImage = document.getElementById(`${galleryId}-current`);
    const thumbnails = document.querySelectorAll(`#${galleryId} .gallery__thumb`);
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            mainImage.src = images[index];
            // Remove active class from all thumbnails
            thumbnails.forEach((t) => t.classList.remove("active"));
            // Add active class to the selected thumbnail
            thumb.classList.add("active");
        });
    });
}