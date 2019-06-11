fetch("https://web-standards.ru/calendar.json")
    .then(response => response.json())
    .then(json => renderPosts(json));


var byCity = document.querySelector('.byCity')
var inpByName = document.querySelector('.byName')
var container = document.querySelector('.container')

function renderPosts(data) {
    byCity.addEventListener('change', function () {
        filterElms(data)
    })
    filterElms(data)
}

function filterElms(data) {
    var dataElms = data.filter(elm => {
        if (byCity.value !== "") {
            return elm.location == byCity.value;
        } else if (byCity.value === '') {
            container.innerHTML = ''
        }
    });
    var techCheckbox = document.querySelectorAll('.techBtns input')
    techCheckbox.forEach(elm => {
        var getAttr = elm.getAttribute('data-tech')
        elm.addEventListener("input", function () {
            if (elm.checked) {
                showSelected(getAttr)
            } else {
                container.innerHTML = '';
                !elm.checked
            }
        });
    });

    function showSelected(attr) {
        var myPattern = new RegExp('(\\w*' + attr + '\\w*)', 'gi');
        dataElms = data.filter(elm => elm.summary.match(myPattern));
        generateItems(dataElms)
    }

    generateItems(dataElms)
}



function generateItems(dataArr) {
    dataArr.forEach(elm => {
        var eventDiv = document.createElement('div')
        var container = document.querySelector('.container')
        eventDiv.classList.add('event')
        eventDiv.innerHTML = ` <p>Event name: ${elm.summary}</p>
                    <p>Date start: ${elm.start}</p>
                    <p>Date end: ${elm.end}</p>
                    <p>Location: ${elm.location}</p>
                    <p>Description: <a href = "${elm.description}" >${elm.summary}</a></p>
                    `;
        var date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        if (date > elm.start) {
            eventDiv.classList.add('innactive')
        }
        container.appendChild(eventDiv)
    });
}