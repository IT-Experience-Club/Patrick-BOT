const get_array_index = (array, type, value) => {
    let index = -1
    let current_index = 0
    array.some(menu => {
        if (menu[type] == value) {
            index = current_index
        }
        current_index += 1
    })
    return index
}

module.exports = {get_array_index}
