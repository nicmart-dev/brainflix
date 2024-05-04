/* -------------------------------------------------------------------------- */
/*                      Utility function to display date                      */
/* -------------------------------------------------------------------------- */

export function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-us', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'UTC' }).split(",").join("");
}


export default formatDate;