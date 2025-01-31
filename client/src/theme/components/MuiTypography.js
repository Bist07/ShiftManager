const MuiTypography = {
    variants: [
        {
            props: { variant: 'header' },
            style: ({ theme }) => ({
                fontWeight: 600,
                padding: '20px',
                color: theme.palette.text.primary
            }),
        },
        {
            props: { variant: 'Table.header.secondary' },
            style: ({ theme }) => ({
                fontSize: '11px',
                textTransform: 'uppercase',
                fontWeight: 500,
                lineHeight: '32px',
                letterSpacing: '.8px',
                color: theme.palette.text.secondary
            }),
        },
        {
            props: { variant: 'Table.header.primary' },
            style: ({ theme }) => ({
                fontSize: '26px',
                lineHeight: '46px',
                fontWeight: 400,
                color: theme.palette.text.primary
            }),
        },
    ],
}

export default MuiTypography;
