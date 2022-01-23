
let count = 0;
chrome.storage.sync.get(['count'], (result) => {
    count = result.count ?? 0;
});

// Update count every 15s
setInterval(() => {
    console.log(`Updated hexagon count to ${count}`);
    chrome.storage.sync.set({ count: count });
}, 15000);

// Look for scrolling
// TODO: Replace with listening for network loading
window.addEventListener('scroll', () => {

    // Keep track of how many are being removed
    let moron_count = 0;

    // Fetch hexagon profile pictures
    const morons = [
        ...document.
            querySelectorAll(`[style='clip-path: url("#hex-hw-shapeclip-clipconfig"); height: calc(100% - 4px); width: calc(100% - 4px);']`)
    ].forEach(
        moron => {

            try {

                // TODO: Find a better way to get encapsulating tweet.
                // TODO: Support other tweet types (Comments?).
                const parent = moron.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

                // Hide if not already hidden
                if (parent.style.display != 'none') {
                    parent.style.display = 'none';
                    moron_count++;
                }

            } catch (e) {

                console.log('Something unexpected happened while hiding tweet. Please report this @ https://github.com/tascord/hexabegon/issues');
                
                console.log('Error: ', e);
                console.log('Moron (Hexagonal PFP): ', moron);

            }

        }
    );

    if (moron_count == 0) return;

    // Add to count
    count += moron_count;

    // Alert user
    console.log(`Removed ${moron_count} hexagon${moron_count > 1 ? 's' : ''} from timeline`);

})

// This code was tested at
// https://twitter.com/search?q=%23NewNFTProfilePic&src=trend_click&vertical=trends