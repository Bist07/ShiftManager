const MuiTableCell = {
    styleOverrides: {
        root: ({ theme }) => ({
            backgroundColor: theme.palette.table.bgCell,
            border: '0',
            padding: '0',
            minWidth: '185px',
        }),
    },
    variants: [
        {

            props: { variant: 'header' },
            style: ({ theme }) => ({
                borderBottom: '1px solid #ccc',
            }),
        },
        {
            props: { variant: 'body' },
            style: ({ theme }) => ({
                border: '1px solid' + theme.palette.border.hover,
                borderBottom: '0',
                verticalAlign: "top",
            }),
        },
    ],
};

export default MuiTableCell;
