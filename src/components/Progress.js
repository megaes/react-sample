import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default props => {
    return (
        <Dialog {...props}>
            <DialogContent>
                <Grid container direction="column" alignItems="center" justify="center">
                    <Grid item>
                        <Typography variant='h5'>
                            { props.caption }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}


