export const storage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
    return value
}