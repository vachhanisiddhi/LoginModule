const userDetails = (state = {}, action) => {
    if (action.type === 'USER') {
        console.log("userDetails : ", action.payload)
        return action.payload
    }
    return state
}

export default userDetails