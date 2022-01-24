//Event listener to change active class of menu items------------------------------------------------------
//Event listener to check which area is in viewport on scroll and add active class to that area's menu item
document.addEventListener('scroll', function(e) {
    let sections = document.getElementsByClassName('section');
    let currentSection = null;
    for (let i = 0; i < sections.length; i++) {
        if(isInViewport(sections[i])) {
            currentSection = sections[i];
            break;
        }
    }

    //If viewport is in footer area set the currentSection to last section i.e contactUsArea
    if(currentSection == null)
        currentSection = document.getElementById('contactUsArea');

    if(currentSection.attributes.id.textContent == 'footerArea')
        currentSection = document.getElementById('contactUsArea');

    removalAllActiveClass();    //Remove all previous active class
    addActiveClass(currentSection.attributes.id.textContent);   //Add active class to current section
});

//Return true if the element is in viewport
function isInViewport(element) {
    /*
    The method element.getBoundingClientRect() provides the element’s position and its relative position to the viewport. It returns an object that includes element’s height, width, and its distance from the top, left, bottom, and right of the viewport. A positive top means the elements top is below the viewport top. The first element with top positive is our current element that is showing
    */
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0);
}

//Function to remove class name of activeLink from all menu links
function removalAllActiveClass() {
    let activeLinks = document.getElementsByClassName('activeLink');

    /* getElementsByClassName gives a live collection of nodes having that CSS class. So that collection might change if you play with class attribue of node being iterated within the loop.

    /*We iterate through the collection using a while loop and checking if there is item in the first poistion of the array. If there is, we remove the class name of activeLink. This removes that div from our collection. We continue this untill there are no more divs with the activeLink class*/

    while(activeLinks[0] != null) {
        activeLinks[0].classList.remove('activeLink');
    }
}

//Function to add class name of activeLink to only the current menu link showing on screen
function addActiveClass(currentActiveLink) {
    if(currentActiveLink == 'homeArea') {
        document.getElementById('homeLink').classList.add('activeLink');    //Desktop menu link
        document.getElementById('homeLinkMobile').classList.add('activeLink');  //Mobile menu link
    } else if(currentActiveLink == 'aboutUsArea') {
        document.getElementById('aboutUsLink').classList.add('activeLink');
        document.getElementById('aboutUsLinkMobile').classList.add('activeLink');
    } else if(currentActiveLink == 'skillsArea') {
        document.getElementById('skillsLink').classList.add('activeLink');
        document.getElementById('skillsLinkMobile').classList.add('activeLink');
    } else if(currentActiveLink == 'servicesArea') {
        document.getElementById('servicesLink').classList.add('activeLink');
        document.getElementById('servicesLinkMobile').classList.add('activeLink');
    } else if(currentActiveLink == 'portfolioArea') {
        document.getElementById('portfolioLink').classList.add('activeLink');
        document.getElementById('portfolioLinkMobile').classList.add('activeLink');
    } else if(currentActiveLink == 'contactUsArea') {
        document.getElementById('contactMeLink').classList.add('activeLink');
        document.getElementById('contactMeLinkMobile').classList.add('activeLink');
    }
}


//Event listener to show/hide mobile menu on click of the menu button--------------------------------
document.getElementById("mobileMenuBtn").addEventListener("click", function() {
    let mobileMenuAreaFixedWrapper = document.getElementById('mobileMenuAreaFixedWrapper');
    if(window.getComputedStyle(mobileMenuAreaFixedWrapper).position == 'absolute') {
        //show menu if hidden
        mobileMenuAreaFixedWrapper.style.position = 'fixed';
        mobileMenuAreaFixedWrapper.style.top = '56px';
    } else if (window.getComputedStyle(mobileMenuAreaFixedWrapper).position == 'fixed') {
        //hide menu if shown
        mobileMenuAreaFixedWrapper.style.position = 'absolute';
        mobileMenuAreaFixedWrapper.style.top = '-1000px';
    }
});


//Event listener to hide mobile menu on click of any mobile nav links--------------------------------
let mobileNavLinks = document.getElementsByClassName('mobileNavLink');

// Loop through the links and add event listener to hide the mobile menu
for (let i = 0; i < mobileNavLinks.length; i++) {
    let mobileMenuAreaFixedWrapper = document.getElementById('mobileMenuAreaFixedWrapper');
    mobileNavLinks[i].addEventListener("click", function() {
        //Hide mobile menu
        mobileMenuAreaFixedWrapper.style.position = 'absolute';
        mobileMenuAreaFixedWrapper.style.top = '-1000px';
    });
}


//Scroll reveal animation----------------------------------------------------------------------------
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

sr.reveal('#homeTextArea, #homeImgArea, #aboutUsImgArea, #aboutUsTextArea, #skillsTextArea, #skillsImgArea, .serviceArea, .portfolioItem, #contactUsDetailsArea, #contactUsFormArea', {
    interval: 200
});


//Intercept the submit event so the user isn't redirected to the webapp-----------------------------
const form = document.getElementById('contactUsForm');
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    .then(() => {
        form.reset();
        alert("Message sent. We will get back to your shortly.");
    })
});