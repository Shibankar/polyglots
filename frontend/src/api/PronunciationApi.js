const GET_USER_BY_ID_PATH = "/api/v1/pronunciation/getUserById?uid=";
const GET_ALL_VOICES_PATH = "/api/v1/pronunciation/getVoices";
const SAVE_PATH = "/api/v1/pronunciation/save";

export async function getUserById(uid) {
    const response = await fetch(GET_USER_BY_ID_PATH + uid, { method: "GET" });
    return response.json();
}

export async function getAllVoices() {
    const response = await fetch(GET_ALL_VOICES_PATH, { method: "GET" });
    return response.json();
}

export async function savePronunciation(uid, fname, lname, country, voicename, voicegender, serviceOptOut, data) {
    const response = await fetch(SAVE_PATH + "?uid=" + uid +
        "&fname=" + fname + "&lname=" + lname + "&country=" + country +
        "&voicename=" + voicename + "&voicegender=" + voicegender + "&serviceOptOut=" + serviceOptOut,
        { method: "POST", body: data });
    return response.json();
}

export async function getPronunciation(url) {
    const response = await fetch(url, { method: "GET" });
    return response;
}

export function getPronunciationURL(uid, fname, lname, country) {
    return `/api/v1/pronunciation/byId?uid=${uid}&fname=${fname}&lname=${lname}&country=${country}`;
}

export function getPronunciationURLWithVoiceName(uid, fname, lname, country, voicename) {
    return `/api/v1/pronunciation/byId?uid=${uid}&fname=${fname}&lname=${lname}&country=${country}&voicename=${voicename}`;
}