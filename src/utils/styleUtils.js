export const createStyle = (propertyName) => {
    return (...objects) => {        
        return objects.reduce((previous, current) => {
            return Object.assign(previous, current[propertyName]);
        }, {})
    };
};
