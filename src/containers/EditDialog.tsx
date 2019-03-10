import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import * as action from '../store/actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Progress from '../components/Progress';
import Data from '../classes/Data';
import {PropTypes} from "@material-ui/core";
import {State as StateDB} from '../store/reducers/db';

interface IPropsState {
    stateDB: StateDB;
}

interface IPropsDispatch {
    onSaveToDB: (index: number, obj: Data) => void;
}

interface ITextFieldAttributes {
    value: number|string,
    margin: PropTypes.Margin,
    id: string,
    label: string,
    type: string,
    autoFocus: boolean
}

class EditDialog extends React.Component<IPropsState & IPropsDispatch & RouteComponentProps<any>> {
    [key: string]: any;

    shouldComponentUpdate(nextProps: IPropsState): boolean {
        if(this.props.stateDB.saving && !nextProps.stateDB.saving) {
            this.props.history.push('/');
        }
        return true;
    }

    getLayout(id: number): ITextFieldAttributes[] {
        return Data.props().map((entry, index) => {
            return {
                value: this.props.stateDB.db[id][entry.name],
                margin: ('normal' as PropTypes.Margin),
                id: `txt_field_${entry.name}`,
                label: entry.name,
                type: entry.type,
                autoFocus: !index
            }
        });
    }

    onSave = () => {
        const id = this.props.match.params.id;
        let obj: Data = new Data();
        this.getLayout(id).forEach(
            ({id, label, type}) => obj[label] = (type === 'number') ? Number(this[id].value) : this[id].value
        );

        if (JSON.stringify(obj) === JSON.stringify(this.props.stateDB.db[id])) {
            this.props.history.push('/');
            return;
        }

        this.props.onSaveToDB(id, obj);
    }

    render() {
        const id = this.props.match.params.id;

        if (id >= this.props.stateDB.db.length) {
            return this.props.stateDB.db.length ? <Redirect to='/' /> : null;
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
                        <Button onClick={() => this.props.history.push('/')} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Progress caption='Saving...' open={this.props.stateDB.saving}/>
            </React.Fragment>
        );
    }
}

function mapStateToProps({db}: { db : StateDB }): IPropsState {
    return {
        stateDB: db,
    }
};

const mapDispatchToProps: IPropsDispatch = {
    onSaveToDB: action.saveToDB
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);
