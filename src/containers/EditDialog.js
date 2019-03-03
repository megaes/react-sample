import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Progress from '../components/Progress';

class EditDialog extends React.Component {
    state = {
        saving: false
    };

    getLayout(id) {
        const obj = this.props.db[id];
        let elements = [];
        for(let prop in obj) {
            elements.push({
                value: obj[prop],
                margin: 'normal',
                id: `txt_field_${prop}`,
                label: prop,
                type: (typeof obj[prop] == 'number') ? 'number' : 'text'
            });
        }
        elements[0].autoFocus = true;
        return elements;
    }

    onSave = () => {
        const id = this.props.match.params.id;
        let obj = {};
        this.getLayout(id).forEach(
            ({id, label, type}) => obj[label] = (type === 'text') ? this[id].value : Number(this[id].value)
        );

        if (JSON.stringify(obj) === JSON.stringify(this.props.db[id])) {
            this.props.history.push('/');
            return;
        }

        this.setState({ saving: true });
        this.props.onSaveToDB(id, obj).then(() => {
            this.setState({ saving: false });
            this.props.history.push('/');
        });
    }

    render() {
        const id = this.props.match.params.id;
        const {db, history} = this.props;

        if (id >= db.length) {
            if(db.length) {
                setTimeout(() => history.push('/'), 0);
            }
            return null;
        }
        const layout = this.getLayout(id);
        return (
            <React.Fragment>
                <Dialog open={true} >
                    <DialogContent>
                        { layout.map(({value, ...props}) => {
                            return (
                                <TextField
                                    key={props.label}
                                    {...props}
                                    defaultValue={value}
                                    inputRef={ref => this[props.id] = ref}
                                    fullWidth
                                />
                            );
                        })}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => history.push('/')} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Progress caption='Saving...' open={this.state.saving}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({db}) => {
    return {
        db: db.db
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveToDB: (index, obj) => dispatch(actionCreators.saveToDB(index, obj))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);