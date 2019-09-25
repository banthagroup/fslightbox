/**
 * This function assigns to object properties from second one
 * @param { Object } object
 * @param { Object } toAssign
 */
export function assignToObject(object, toAssign) {
    for (let toAssignPropertyName in toAssign) {
        object[toAssignPropertyName] = toAssign[toAssignPropertyName];
    }
}
