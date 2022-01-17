const activeExamples = [
    1,
    2,
    3,
    4,
    5,
    6,
];

const testEl = document.getElementById('test')
const title = document.querySelector('#firstExample')

const changeColor = entries => {
    console.log('entries', entries)
    entries.forEach(entry => {
        const intersecting = entry.isIntersecting
        entry.target.style.backgroundColor = intersecting ? 'orange' : 'blue'
    })
};
const showPercentages = entries => {
    console.log('entries', entries)
    entries.forEach(entry => {
        const percentage = entry.intersectionRatio
        entry.target.textContent = `${Math.floor(percentage * 100)}%`
    })
};
const changeThreeColor = entries => {
    console.log('entries', entries)
    entries.forEach(entry => {
        const intersecting = entry.isIntersecting

        entry.target.style.backgroundColor = intersecting ? 'orange' : 'blue'
    })
};

async function wait() {
    await new Promise(
        resolve => {
            window.addEventListener(
                'keyup',
                () => resolve()
            )
        }
    )
}

// Create observer
title.textContent = 'Simple observer'
let observer = new IntersectionObserver(changeColor)
observer.observe(testEl)
if (activeExamples.includes(1)) await wait()
observer.disconnect()

// OPTIONS
// Threshold: percentage of element that must be visible
title.textContent = 'Observer with threshold'
observer = new IntersectionObserver(
    changeColor,
    { threshold: 1 }
)
observer.observe(testEl)
if (activeExamples.includes(2)) await wait()
observer.disconnect()
title.textContent = 'Observer with threshold, percentages'
observer = new IntersectionObserver(
    showPercentages,
    { threshold: [0, .25, .5, .75, 1] }
)
observer.observe(testEl)
if (activeExamples.includes(3)) await wait()
observer.disconnect()

// rootMargin: can take 1 or an array of values with that specify margin of intersection
title.textContent = 'Observer with rootMargin'
observer = new IntersectionObserver(
    changeColor, 
    { rootMargin: '-50px' }
)
observer.observe(testEl)
if (activeExamples.includes(4)) await wait()
observer.disconnect()

const containers = document.querySelectorAll('.container')
containers.forEach(container => container.classList.toggle('display-none'))
const littleTestEl = document.getElementById('littleTest')
const scrollableContainer = document.querySelector('.scrollable-container')

// root: specify root element to intersect
observer = new IntersectionObserver(
    changeColor, 
    { root: scrollableContainer, rootMargin: '-50px' }
)
observer.observe(littleTestEl)
if (activeExamples.includes(5)) await wait()
observer.disconnect()

// Last example
const lastExContainer = document.querySelector('.last-example')
containers[1].classList.toggle('display-none')
lastExContainer.classList.toggle('display-none')
observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(
            entry => {
                const isMinRatio = entry.intersectionRatio < .5
                const isNotVisible = entry.target.classList.contains('not-visible')
                const isIntersectingNotVisible = entry.isIntersecting && isNotVisible && !isMinRatio
                const isNotIntersectingVisible = !entry.isIntersecting && !isNotVisible && isMinRatio
                if (isIntersectingNotVisible || isNotIntersectingVisible) {
                    entry.target.classList.toggle('not-visible')
                }
            }
        )
    },
    { root: lastExContainer, threshold: [.3, .7] }
)
for (let i = 0; i < 20; ++i) {
    const childEl = document.createElement('div')
    childEl.classList.add('child', 'not-visible')
    const headlingEl = document.createElement('h2')
    headlingEl.textContent = `Child ${i + 1}`
    childEl.appendChild(headlingEl)
    lastExContainer.appendChild(childEl)
    observer.observe(childEl)
}
if (activeExamples.includes(6)) await wait()
observer.disconnect()