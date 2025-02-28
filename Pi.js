[General]
name = YouTube Premium Emulator
author = Your Name
version = 1.0
description = Эмулирует YouTube Premium, убирая рекламу и добавляя заголовки.
enabled = true

[Script]
function request(flow) {
    console.log("[YouTube Premium Emulator] Перехвачен запрос:", flow.request.url);

    if (flow.request.host.includes("youtube.com") || flow.request.host.includes("googlevideo.com")) {
        console.log("[YouTube Premium Emulator] Запрос к YouTube обнаружен.");

        // Добавляем заголовки, имитирующие Premium-статус
        flow.request.headers["X-YouTube-Premium"] = "1";
        flow.request.headers["X-YouTube-Ads"] = "0";
        console.log("[YouTube Premium Emulator] Добавлены заголовки Premium:", flow.request.headers);
    } else {
        console.log("[YouTube Premium Emulator] Запрос не к YouTube, пропускаем.");
    }
}

function response(flow) {
    console.log("[YouTube Premium Emulator] Перехвачен ответ:", flow.request.url);

    if (flow.request.host.includes("youtube.com") || flow.request.host.includes("googlevideo.com")) {
        console.log("[YouTube Premium Emulator] Ответ от YouTube обнаружен.");

        // Проверяем, содержит ли ответ рекламу
        if (flow.response.text && flow.response.text.includes("ads")) {
            console.log("[YouTube Premium Emulator] Обнаружена реклама, удаляю...");

            // Удаляем рекламу из ответа
            flow.response.text = flow.response.text.replace("ads", "");
            console.log("[YouTube Premium Emulator] Реклама удалена.");
        } else {
            console.log("[YouTube Premium Emulator] Реклама не обнаружена.");
        }
    } else {
        console.log("[YouTube Premium Emulator] Ответ не от YouTube, пропускаем.");
    }
}
