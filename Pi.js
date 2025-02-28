function request(flow) {
    if (flow.request.host.includes("youtube.com") || flow.request.host.includes("googlevideo.com")) {
        console.log("Перехвачен запрос к YouTube:", flow.request.url);
        flow.request.headers["X-YouTube-Premium"] = "1";
        flow.request.headers["X-YouTube-Ads"] = "0";
        console.log("Добавлены заголовки Premium:", flow.request.headers);
    }
}

function response(flow) {
    if (flow.request.host.includes("youtube.com") || flow.request.host.includes("googlevideo.com")) {
        console.log("Перехвачен ответ от YouTube:", flow.request.url);
        if (flow.response.text.includes("ads")) {
            console.log("Обнаружена реклама, удаляю...");
            flow.response.text = flow.response.text.replace("ads", "");
            console.log("Реклама удалена.");
        }
    }
}
