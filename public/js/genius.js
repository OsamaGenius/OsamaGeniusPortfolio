/**
 * Logic after DOM loads
*/
document.addEventListener('DOMContentLoaded', function () {
    /**
 * Variables Declartions
*/
    const
        progress = document.querySelectorAll('.progress .progress-bar'), // All progress bars
        pgLab = document.querySelectorAll('.progress-label'); // All progress labels


    /**
    * Functions
    */
    // [ 1 ] Update each progress bar background color  v 1.0
    function UpdateProgressBarBg(bar, i) {
        let valnow = bar.getAttribute('aria-valuenow');
        if (valnow >= 80) {
            fillProgressBarAnimation(bar, 'bg-success', valnow);
            setupProgressBarLabel(bar, pgLab[i], 'bg-success');
        } else if (valnow >= 50) {
            fillProgressBarAnimation(bar, 'bg-warning', valnow);
            setupProgressBarLabel(bar, pgLab[i], 'bg-warning');
            progress[i].style.color = '#333';
        } else {
            fillProgressBarAnimation(bar, 'bg-danger', valnow);
            setupProgressBarLabel(bar, pgLab[i], 'bg-danger');
        }
    }

    // [ 2 ] Fill progress bar animation v 1.0
    function fillProgressBarAnimation(target, bg = 'bg-primary', value = '50') {
        target.classList.add(bg);
        target.style.width = '0%';
        setTimeout(() => {
            target.style.width = value + '%';
        }, 100);
    }

    // [ 3 ] Setup the progress label to filled bars v 1.0
    function setupProgressBarLabel(value, label, bg = 'bg-primary') {
        label.style.left = value.getAttribute('aria-valuenow') + '%';
        label.classList.add(bg);
        if (bg === 'bg-warning') {
            label.style.color = '#333';
        } else {
            label.style.color = '#fff';
        }
    }

    // Showing progress label on hoverover the progress bar v 1.0
    function showProgressLabel() {
        progress.forEach((bar, i) => {
            bar.addEventListener('mouseenter', function () {
                pgLab[i].classList.add('op-none');
                pgLab[i].classList.add('progress-label-bounce');
            });
            bar.addEventListener('mouseleave', function () {
                pgLab[i].classList.remove('op-none');
                pgLab[i].classList.remove('progress-label-bounce');
            });
        });
    }

    let observer = new IntersectionObserver(ob => {
        ob.forEach((el, i) => {
            if (el.isIntersecting) {
                UpdateProgressBarBg(el.target, i);
                observer.unobserve(el.target); // run once
            } else { }
        });
    }, {
        threshold: 0.5
    });
    progress.forEach((bar, i) => {
        observer.observe(bar)
        // UpdateProgressBarBg(bar, i);
    });

    // Showing the progress bar text label
    showProgressLabel();
});
