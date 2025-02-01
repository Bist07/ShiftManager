import React from "react";
import { Box, Popover, } from "@mui/material";

const MenuWrapper = ({
    children,
    anchorEl,
    setAnchorEl,
    anchorOrigin = {
        vertical: "bottom",
        horizontal: "left",
    },
    transformOrigin = {
        vertical: "top",
        horizontal: "left",
    } }) => {
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={
                anchorOrigin
            }
            transformOrigin={
                transformOrigin
            }
            sx={{
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1), 0px -3px 6px rgba(0, 0, 0, 0.1)",
                padding: "0",
                marginTop: "8px",
                width: "auto",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    border: "1px solid #20242a",
                    borderColor: "field.border",
                    borderRadius: "4px",
                    backgroundColor: "menu.bg",
                    paddingTop: 0.5,
                    paddingBottom: 0.5
                }}
            >

                {children}
            </Box>
        </Popover>
    );
};

export default MenuWrapper;
