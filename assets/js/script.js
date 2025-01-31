$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 50) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 80;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });
    // partie hadhi mta3 les vedio 
// Get modal elements
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoSource = document.getElementById('videoSource');
const closeBtn = document.querySelector('.modal .close');

// Get all view buttons
const viewButtons = document.querySelectorAll('.view-btn');

// Function to open the modal and play video
function openModal(videoPath) {
  videoSource.src = videoPath; // Set video source
  modal.style.display = 'block'; // Show modal
  modalVideo.load(); // Load the video
  modalVideo.play(); // Play the video
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none'; // Hide modal
  modalVideo.pause(); // Pause the video
  modalVideo.currentTime = 0; // Reset video to start
}

// Event listener for "View" buttons
viewButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default action

    const videoPath = button.getAttribute('data-video'); // Get video path

    if (videoPath) {
      // If the button has a video, open the modal
      openModal(videoPath);
    } else {
      // If no video, redirect to the home page
      window.location.href = '#home'; // Change this to your homepage file
    }
  });
});

// Event listener for closing the modal
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  }
});
    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); 
    
        var formData = new FormData(this);
    
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert("Form submitted successfully! ✅");
                document.getElementById("contact-form").reset();
            } else {
                alert("Form submission failed! ❌ Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong. Try again!");
        });
    });    
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Wassim Hfaiedh";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

// <!-- typed js effect starts -->
// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Data Science", "Artificial Intelligence", "Computer Vision","Machine Learning", "Deep Learning"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("./projects/skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// Initialisation de Tilt.js
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

// Fonction pour cacher le preloader après le chargement avec animation
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
    
    // Après avoir caché le preloader, on réactive le scroll
    document.body.style.overflow = 'auto';  // Réactive le scrolling
}

// Attendre que la page soit complètement chargée avant de masquer le preloader avec animation
window.onload = function () {
    // Désactiver le scroll pendant que le preloader est visible
    document.body.style.overflow = 'hidden'; // Empêche le scroll
    
    setTimeout(loader, 2000); // Retarder l'animation de disparition du preloader de 3500ms
};

document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* SCROLL REVEAL ANIMATION*/
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* Part Hadhi SCROLL HOME */
srtop.reveal('.home .content h2', { delay: 500});
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 600 });
srtop.reveal('.home .linkedin', { interval: 800 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .facebook', { interval: 800 });
srtop.reveal('.home .instagram', { interval: 800 });


/*  Part Hadhi SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content h4', { delay: 200 });
srtop.reveal('.about .content .tag p', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });
srtop.reveal('.about .row .image1', { delay: 600 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });