const GET_PRONUNCIATION_PATH = "/api/v1/pronunciation/byId?";

export async function getPronunciation(uid, firstname, lastname) {
    return await fetch(GET_PRONUNCIATION_PATH + "uid=" + uid + "&fname=" + firstname + "&lname=" + lastname, { method: "GET" });
}