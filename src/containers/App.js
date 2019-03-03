import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as actionCreators from '../store/actions/index';
import Paper from '@material-ui/core/Paper';
import Table from './Table';
import EditDialog from './EditDialog';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
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

class App extends React.Component {

    componentDidMount() {
        this.props.onInitDB();
    }

    render() {
        const { classes } = this.props;

        return (
            <BrowserRouter>
                <Grid container alignItems="center" justify="center" className={classes.root}>
                    <Grid item>
                        <Paper className={classes.paper} >
                            <Route path="/" component={Table} />
                            <Route path="/:id/edit" exact component={EditDialog} />
                        </Paper>
                    </Grid>
                </Grid>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitDB: () => dispatch(actionCreators.initDB())
    }
};


export default withStyles(styles)(connect(null, mapDispatchToProps)(App));
