export function dataSave(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function dataLoad(key) {
    return JSON.parse(localStorage.getItem(key));
}
