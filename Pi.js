function request(flow) {
    if (flow.request.host.includes("youtube.com") || flow.request.host.includes("googlevideo.com")) {
        flow.request.headers["X-YouTube-Premium"] = "1";
        flow.request.headers["X-YouTube-Ads"] = "0";
    }
}

function response(flow) {
    if (flow.request.host.includes("youtube.com") || flow.request.host.includes("googlevideo.com")) {
        if (flow.response.text.includes("ads")) {
            flow.response.text = flow.response.text.replace("ads", "");
        }
    }
}
