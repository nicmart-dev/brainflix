import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


/* Notify using toast package and then navigate to relevant page */
export const notifyNav = (label, nav, navigate) => {
    // display alert message depending on button clicked using toast package.
    let msg = "";
    let type = "info";
    let route = "/"; // by default navigate to Home/video page

    switch (label) {
        case "publish":
            msg = "Video published, navigating to homepage";
            type = "success";
            route = nav;
            break;
        case "cancel":
            msg = "Video upload cancelled, navigating back to homepage";
            type = "info";
            break;
        case "delete":
            msg = "Comment deleted";
            type = "success";
            route = ""; // don't navigate
            break;
        case "comment":
            msg = "Comment posted!";
            type = "success";
            route = ""; // don't navigate
            break;
        default:
        //otherwise use values already set during variables init
    }
    /* display toast but navigate to route only if closing toast manually,
    or auto close after default 8 sec timer, per https://fkhadra.github.io/react-toastify/define-callback */
    toast[type](msg, {
        onClose: () => {
            if (route) {
                navigate(route);
            }
        },
        position: "bottom-right",
    });
};

export default notifyNav;