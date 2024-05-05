/* -------------------------------------------------------------------------- */
/*                      Utility function to display date                      */
/* -------------------------------------------------------------------------- */


/* keeping function to display per mockup for reference */
export function formatDateMDDYYYY(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-us', { month: 'numeric', day: '2-digit', year: 'numeric', timeZone: 'UTC' }).split(",").join("");
}


/* display dynamic date format in the comments section and video details 
to reflect when it was posted in a more human-readable format */
export function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const timeDifference = now - date;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    return (
        seconds < 60 ? `${seconds === 1 ? '1 second' : `${seconds} seconds`} ago` :
            minutes < 60 ? `${minutes === 1 ? '1 minute' : `${minutes} minutes`} ago` :
                hours < 24 ? `${hours === 1 ? '1 hour' : `${hours} hours`} ago` :
                    days < 30 ? `${days === 1 ? '1 day' : `${days} days`} ago` :
                        months < 12 ? `${months === 1 ? '1 month' : `${months} months`} ago` :
                            `${years === 1 ? '1 year' : `${years} years`} ago`
    );
}

export default formatDate;