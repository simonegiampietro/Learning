// Elements
const consoleEl = document.querySelector('.console')
const containerEl = document.querySelector('.container')
const childRemovable = document.querySelector('#child3')
const childEditable = document.querySelector('#child1')
const consoleTitle = document.querySelector('h3')
const viewContainer = document.querySelector('.view-container')

const btnChildEditing = document.createElement('button')


// Observe childList changing
const observer1 = new MutationObserver(entries => {
    log(
        'CHILD LIST 1',
        getLoggedMutation(entries)
    )
})
observer1.observe(
    containerEl,
    {childList: true}
)
containerEl.removeChild(childRemovable)
const child4 = document.createElement('div')
child4.classList.add('child', 'bg-child')
child4.textContent = 'Child 4'
containerEl.appendChild(child4)
await disconnectObserver(observer1, 'Waiting for first example... ')

// Observe childlist changing in two different times
const observer2 = new MutationObserver(entries => {
    log(
        'CHILD LIST 2',
        getLoggedMutation(entries)
    )
})
observer2.observe(
    containerEl,
    {childList: true}
)
containerEl.removeChild(child4)
const child5 = document.createElement('div')
child5.classList.add('child', 'bg-child')
child5.textContent = 'Child 5'
setTimeout(
    () => containerEl.appendChild(child5), 
    100
)
await disconnectObserver(observer2, 'Waiting for second example... ')

// Observe attributes changing
const observer3 = new MutationObserver(entries => {
    log(
        'ATTRIBUTES',
        getLoggedMutation(entries)
    )
})
observer3.observe(
    containerEl, 
    { attributes: true, attributeOldValue: true }
)
containerEl.setAttribute('data-change', 'changed')
await disconnectObserver(observer3, 'Waiting for third example... ')

const observer4 = new MutationObserver(entries => {
    log(
        'ATTRIBUTES',
        getLoggedMutation(entries)
    )
})
observer4.observe(
    containerEl, 
    { attributes: true, attributeOldValue: true, attributeFilter: ['data-no-change'] }
)
containerEl.setAttribute('data-change', 'changed')
await disconnectObserver(observer4, 'Waiting for fourth example... ')
log('No log for this example')

// Observe attributes changing
const observer5 = new MutationObserver(entries => {
    log(
        'CONTENT',
        getLoggedMutation(entries)
    )
})
observer5.observe(
    childEditable, 
    { characterData: true, characterDataOldValue: true }
)
btnChildEditing.textContent = 'Continue'
await new Promise(resolve => {
    log('Fifth example execution....')
    const action = () => {
        resolve()
        btnChildEditing.removeEventListener('click', action)
        viewContainer.removeChild(btnChildEditing)
    }
    btnChildEditing.addEventListener('click', action)
    viewContainer.insertBefore(btnChildEditing, consoleTitle)
});
await disconnectObserver(observer5, 'Waiting for fifth example... ')
const observer6 = new MutationObserver(entries => {
    log(
        'CONTENT',
        getLoggedMutation(entries)
    )
})
observer6.observe(
    childEditable.childNodes[0], 
    { characterData: true, characterDataOldValue: true }
)
btnChildEditing.textContent = 'Continue'
await new Promise(resolve => {
    log('Sixth example execution....')
    const action = () => {
        resolve()
        btnChildEditing.removeEventListener('click', action)
        viewContainer.removeChild(btnChildEditing)
    }
    btnChildEditing.addEventListener('click', action)
    viewContainer.insertBefore(btnChildEditing, consoleTitle)
});
await disconnectObserver(observer6, 'Waiting for sixth example... ')

// subtree example
const observer7 = new MutationObserver(entries => {
    log(
        'SUBTREE',
        getLoggedMutation(entries)
    )
})
observer7.observe(
    viewContainer, 
    { characterData: true, characterDataOldValue: true, subtree: true }
)
btnChildEditing.textContent = 'Continue'
await new Promise(resolve => {
    log('Fifth example execution....')
    const action = () => {
        resolve()
        btnChildEditing.removeEventListener('click', action)
        viewContainer.removeChild(btnChildEditing)
    }
    btnChildEditing.addEventListener('click', action)
    viewContainer.insertBefore(btnChildEditing, consoleTitle)
});
await disconnectObserver(observer7, 'Waiting for seventh example... ')

async function disconnectObserver(observer, message) {
    log(message)
    await new Promise(resolve => setTimeout(() => {
        resolve()
    }, 1000))
    observer.disconnect()
}


function getLoggedMutation(entries) {
    return entries.map(entry => ({
        node: entry.target.nodeName,
        class: entry.target.classList,
        removed: entry.removedNodes.length,
        added: entry.addedNodes.length,
        attributeName: entry.attributeName,
        attributeNamespace: entry.attributeNamespace,
        oldValue: entry.oldValue
    }))
}


function log(...args) {
    const logContainer = document.createElement('div')
    logContainer.classList.add('border-bottom-gray')
    consoleEl.appendChild(logContainer)
    let values = []
    args.forEach(arg => {
        let value = arg;
        if (arg instanceof Object) {
            value = JSON.stringify(arg, undefined, '  ')
        }
        values.push(value)
    });
    const logEntry = document.createElement('code')
    logEntry.textContent = values.join(',\n')
    logContainer.appendChild(logEntry)
    console.log(...args)
}