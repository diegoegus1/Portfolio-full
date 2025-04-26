let menuIcon = document.querySelector("#menu-icon");
let navBar = document.querySelector(".navbar")
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");


window.onscroll = () => { sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAtributte("id");

    if(top >= offset && top < offset + height){
        navLinks.forEach(links => {links.classList.remove("active");
            document.querySelector("header nav a [href*=" + id + "]").classList.add ("active")
        })
    }
})
}


menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navBar.classList.toggle("active");
}

// Check for success parameter on page load
if (window.location.search.includes('message=success')) {
    alert('Thank you! Your message has been sent successfully.');
    // Or create a more elegant popup notification
}

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  
  // Mostrar estado de carga
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => {
    if(data.success) {
      window.location.href = form.querySelector('input[name="_next"]').value;
    } else {
      alert('Error: ' + (data.message || 'Please try again later'));
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  })
  .catch(error => {
    alert('Error: ' + error.message);
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
  });
});

