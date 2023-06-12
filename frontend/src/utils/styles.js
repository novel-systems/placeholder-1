import theme from 'junctionTheme'
import { makeStyles } from '@material-ui/core/styles'

const junctionStyle = makeStyles({
    w450: {
        maxWidth: '450px',
    },
    shadow1: {
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    },
    border1: {
        borderRadius: '8px',
    },
    borderButton: {
        borderRadius: '30px',
    },
    textAlignStart: {
        textAlign: 'start',
    },
    pb2: {
        paddingBottom: theme.spacing(2),
    },
    p3: {
        padding: theme.spacing(3),
    },
    pxb3: {
        padding: theme.spacing(0, 3, 3),
    },
    fs5: {
        fontSize: theme.spacing(5),
    },
    fs2half: {
        fontSize: theme.spacing(2.5),
    },
    fs2: {
        fontSize: theme.spacing(2),
    },
    fs3: {
        fontSize: theme.spacing(3),
    },
    cardNote: {
        fontSize: '18px',
    },
})

export default junctionStyle
