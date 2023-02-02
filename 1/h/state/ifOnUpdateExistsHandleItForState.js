export const ifOnUpdateExistsHandleItForState = (state) => {
    if(state.onUpdate) {
        state.onUpdate();
        delete state.onUpdate;
    }
};