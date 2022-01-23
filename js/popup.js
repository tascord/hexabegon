chrome.storage.sync.get(['count'], (result) => {
    document.getElementById('amount').innerText = result.count ?? 0;
});