// // dropdown javascript
// const Adam = document.querySelector(".Adam");
// const dropd = document.querySelector(".dropd");
// // 
// Adam.onclick = () => dropd.style.display = "block";
// document.onclick = e =>
//   !e.target.closest(".menu") && (dropd.style.display = "none");
// // end of dropdown js


 // Modal logic
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('cameraModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    //
    const takePhotoBtn = document.getElementById('takePhotoBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    //
    const video = document.getElementById('video');
    const captureBtn = document.getElementById('captureBtn');
    const closeCamBtn = document.getElementById('closeCamBtn');
    const preview = document.getElementById('preview');
    let stream = null;
    
    // Modal show/hide
    openModalBtn.onclick = () => {
      modal.style.display = "flex";
      resetModal();
    };
    closeModalBtn.onclick = closeModal;
    modal.onclick = e => {
      if (e.target === modal) closeModal();
    };
    function closeModal() {
      modal.style.display = "none";
      stopCamera();
      resetModal();
    }
    
    function resetModal() {
      video.style.display = "none";
      captureBtn.style.display = "none";
      closeCamBtn.style.display = "none";
      preview.style.display = "none";
      preview.src = '';
    }
    
    // Camera option
    takePhotoBtn.onclick = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.display = "block";
        captureBtn.style.display = "inline-block";
        closeCamBtn.style.display = "inline-block";
        preview.style.display = 'none';
      } catch(err) {
        alert("Camera error: " + err.message);
      }
    };
    // Capture photo from video
    captureBtn.onclick = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      preview.src = canvas.toDataURL('image/png');
      preview.style.display = 'block';
      // Stop stream for privacy after capture
      stopCamera();
      video.style.display = "none";
      captureBtn.style.display = "none";
      closeCamBtn.style.display = "none";
    }
    // Close camera stream manually
    closeCamBtn.onclick = () => {
      stopCamera();
      video.style.display = "none";
      captureBtn.style.display = "none";
      closeCamBtn.style.display = "none";
    }
    // File upload option
    uploadBtn.onclick = () => {
      fileInput.click();
    };
    fileInput.onchange = (e) => {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
        stopCamera();
        video.style.display = "none";
        captureBtn.style.display = "none";
        closeCamBtn.style.display = "none";
      }
    };
    
    // Helper to stop camera stream
    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
      }
    }

// dropdown javascript
const Adam = document.querySelector(".Adam");
const dropd = document.querySelector(".dropd");
// 
Adam.onclick = () => dropd.style.display = "block";
document.onclick = e =>
  !e.target.closest(".menu") && (dropd.style.display = "none");
// end of dropdown js
