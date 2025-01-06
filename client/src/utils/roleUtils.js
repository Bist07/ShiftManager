
export const transformRoleData = (roles) => {
    return roles.map((role) => ({
        role_id: role.role_id,
        name: role.role_name,
    }));
}

export const getRoleName = (role_id, roles) => {
    const role = roles.find((role) => role.role_id === role_id);
    return role ? role.role_name : 'Unknown Role';  // Return 'Unknown Role' if no match is found
}
