export const transformPositionData = (positions) => {
    return positions.map((position) => ({
        role_id: position.role_id,
        name: position.role_name,
    }));
}