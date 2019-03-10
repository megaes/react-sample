import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import * as action from '../store/actions';
import Paper from '@material-ui/core/Paper';
import Table from './Table';
import EditDialog from './EditDialog';
import Grid from '@material-ui/core/Grid';

const styles = createStyles({
    root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    paper: {
        height: '800px',
        width: '500px'
    }
});

interface IPropsDispatch {
    onInitDB: () => void;
}

class App extends React.Component<IPropsDispatch & WithStyles<typeof styles>> {

    componentDidMount() {
        this.props.onInitDB();
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container alignItems="center" justify="center" className={classes.root}>
                <Grid item>
                    <Paper className={classes.paper} >
                        <Route path="/" component={Table} />
                        <Route path="/:id/edit" exact component={EditDialog} />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps: IPropsDispatch = {
    onInitDB: action.initDB
}

export default withStyles(styles)(withRouter(connect(null, mapDispatchToProps)(App)));
