export const createStyle = (propertyName) => {
    return (state, props) => {
        const stateStyle = state[propertyName];
        const propStyle = props[propertyName];
        
        return Object.assign({}, stateStyle, propStyle);
    };
};
