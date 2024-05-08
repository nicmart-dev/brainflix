import axios from "axios";

/* used to connect to BrainFlix api */
const api_key = "08e96fed-b453-49f7-b10e-6342cdd61c6a";
const base_url = "https://unit-3-project-api-0a5620414506.herokuapp.com";

let useAPI = true; // get videos using api by default, otherwise use static json data

/* get videos from api and fallback to using static data 
if api error or if useAPI flag set to false */
export async function getVideos() {
    if (useAPI) {
        try {
            const response = await axios.get(
                `${base_url}/videos?api_key=${api_key}`
            );
            // return video list
            return response.data;
        } catch (error) {
            console.log(
                "Could not get video list from BrainFlix API, importing static data instead."
            );
            // If api failure, fallback to importing from json files.
            getStaticData()
            useAPI = false; // flag that later be used if data not retrieved by api but from static json eg. to disable posting/deleting comments
        }
    } else return getStaticData();
}
/* Utility function to import video data from json file.
Note: You can now call the import to load a module at runtime. 
It returns a Promise that resolves to an object with the module exports. */
async function getStaticData() {
    const videoData = await import("../data/videos.json");
    return videoData.default;
}

/* get details of a specific video from api and fallback to using static data 
if api error or if useAPI flag set to false */
export async function getVideoDetails(id) {
    if (useAPI) {
        try {
            const response = await axios.get(
                `${base_url}/videos/${id}?api_key=${api_key}`
            );
            // return details for specified video
            return response.data;
        } catch (error) {
            console.log(
                "Could not get video details from BrainFlix API, importing static data instead."
            );
            return getStaticDetailsData(id);
        }
    } else return getStaticDetailsData(id);
}

/* Utility function to import detailed video data from json file. */
async function getStaticDetailsData(id) {
    const videoDetailsData = await import("../data/video-details.json"); // import small amount of data to display next videos
    const videoDetails = videoDetailsData.default.find((video) => video.id === id);
    return videoDetails;
}

export default getVideos;