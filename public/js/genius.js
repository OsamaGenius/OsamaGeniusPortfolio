// =================================
// ===== Variables Declartions =====
// =================================
const sections = document.querySelectorAll('section'),
      pgLab    = document.querySelectorAll('.progress-label'),
      progress = document.querySelectorAll('.progress .progress-bar'),
      header   = document.querySelector('header'),
      footer   = document.querySelector('footer'),
      circles  = document.querySelectorAll('.story .circle');

// ==================================
// ======== Global Functions ========
// ==================================

/* 
* [ 1 ] Fill progress bars colors and floating labels 
* No params required
* Version 1.0
*/
function fillProgressBars() {
    progress.forEach((bar, i) => {
        let valnow = bar.getAttribute('aria-valuenow'); // Fetch current progress value
        if (valnow >= 80) {
            fillProgressBarAnimation(bar, 'bg-success', valnow); // Animate fills from 0 to current value
            setupProgressBarLabel(bar, pgLab[i], 'bg-success'); // Config progress bar label
        } else if (valnow >= 50) {
            fillProgressBarAnimation(bar, 'bg-warning', valnow);
            setupProgressBarLabel(bar, pgLab[i], 'bg-warning');
            progress[i].style.color = '#333';
        } else {
            fillProgressBarAnimation(bar, 'bg-danger', valnow);
            setupProgressBarLabel(bar, pgLab[i], 'bg-danger');
        }
        bar.addEventListener('mouseenter', function () { // Show label on hover
            pgLab[i].classList.add('op-none');
            pgLab[i].classList.add('progress-label-bounce');
        });
        bar.addEventListener('mouseleave', function () { // hide label on exit
            pgLab[i].classList.remove('op-none');
            pgLab[i].classList.remove('progress-label-bounce');
        });
    });
}

/* 
* [ 2 ] Fill progress bars colors and animate them from 0 to each current value 
* target: Progress bar element from the DOM
* bg: The background color to fill the progress bar by, by default 'bg-primary'
* value: Progress bar value, by default '50'
* Version 1.0
*/
function fillProgressBarAnimation(target, bg = 'bg-primary', value = '50') {
    target.classList.add(bg); // Adding bg class name to the progress bar
    target.style.width = '0%'; // Set the width of progress bar to zero
    setTimeout(() => { // Animate: filling the progress bar width accordding to the value 
        target.style.width = value + '%';
    }, 700);
}

/* 
* [ 3 ] Progress label configuration [design, value]
* value: Progress bar element from the DOM
* label: Progress bar label element from DOM
* bg: The background color to fill the progress bar label, by default 'bg-primary'
* Version 1.0
*/
function setupProgressBarLabel(value, label, bg = 'bg-primary') {
    // Move the label to last filled point of the progress bar [like: 90%]
    label.style.left = value.getAttribute('aria-valuenow') + '%';
    label.classList.add(bg); // Adding bg color class name to the label
    if (bg === 'bg-warning') {
        label.style.color = '#333'; // Set text color to black
    } else {
        label.style.color = '#fff'; // Set text color to white
    }
}

/* 
* [ 4 ] Animate timeline circles 
* No params required
* Version 1.0
*/
function circleShow() {
    circles.forEach(circle => {
        circle.classList.add('show');
    });
}

// ========================================
// ===== Run Scripts After DOM Loaded =====
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // Create Observer to execute animations
    let observer = new IntersectionObserver(ob => {
        ob.forEach(el => {
            if(el.isIntersecting) {                             // Execute when element enters the viewport
                el.target.classList.add('visible');             // Animate DOM sections
                header.classList.add('visible');                // Animate the header
                footer.classList.add('visible');                // Animate the footer
                const fn = window[el.target.dataset.animate];   // Fetch function name from the DOM elements
                if(typeof fn === 'function') fn();              // Execute animation functions
                observer.unobserve(el.target);                  // Run Once
            } else {
                // Prevent from hacking
                console.log('Intersector observer not working...');
            }
        });
    }, {
        threshold: 0.2
    });

    // Effect all sections
    sections.forEach(sec => observer.observe(sec));

    // Effect all timeline circles
    circles.forEach(circle => observer.observe(circle));

});