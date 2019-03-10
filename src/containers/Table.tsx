import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Progress from '../components/Progress';
import Data from '../classes/Data';
import {State as StateDB} from '../store/reducers/db';

interface IPropsState {
    db: Data[];
    headerHeight?: number,
    rowHeight?: number
}

interface  IColumn {
    width: number,
    dataKey: string,
    label?: string,
    numeric?: boolean,
    flexGrow?: number
}

const styles = (theme: Theme) => createStyles({
    table: {
        fontFamily: theme.typography.fontFamily,
    },

    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },

    tableCell: {
        flex: 1,
    },
});

class MuiVirtualizedTable extends React.PureComponent<IPropsState & WithStyles<typeof styles>> {

    static defaultProps = {
        headerHeight: 56,
        rowHeight: 56,
    };

    cellRenderer = (label: string|undefined, cellData: any, numeric: boolean, rowIndex: number) => {
        const { classes, rowHeight, headerHeight } = this.props;
        const isHeader = (rowIndex === -1);

        let cell: any = null;
        if (isHeader) {
            cell = label;
        } else {
            if (cellData) {
                cell = cellData;
            } else {
                cell = (
                    <IconButton color='primary' {...{component: Link, to: `/${rowIndex}/edit`} as any}>
                        <EditIcon />
                    </IconButton>
                );
            }
        }

        return (
            <TableCell
                component='div'
                className={classNames(classes.tableCell, classes.flexContainer)}
                variant={isHeader ? 'head' : 'body'}
                style={{ height: isHeader ? headerHeight : rowHeight }}
                align={numeric ? 'right' : 'left'}
            >
                { cell }
            </TableCell>
        );
    };

    getColumnLayout(): IColumn[] {
        let columns = Data.props().map(entry => {
            if (entry.type === 'number') {
                return { width: 120, dataKey: entry.name, label: entry.name, numeric: true };
            }
            return { width: 200, dataKey: entry.name, label: entry.name, flexGrow: 1.0 };
        }) as IColumn[];
        columns.push({ width: 100, dataKey: 'editBtn'});
        return columns;
    }

    render() {
        const columns: IColumn[] = this.getColumnLayout();
        const { classes, db, headerHeight, rowHeight } = this.props;
        return (
            <React.Fragment>
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            disableHeader={!db.length}
                            rowCount={db.length}
                            rowGetter={({ index }) => db[index]}
                            rowHeight={rowHeight as number}
                            headerHeight={headerHeight as number}
                            className={classes.table}
                            height={height}
                            width={width}
                            rowClassName={classes.flexContainer}
                        >
                            {columns.map(({ dataKey, label, numeric = false }, index) => {
                                return (
                                    <Column
                                        key={dataKey}
                                        headerRenderer={() => this.cellRenderer(label, null, numeric, -1)}
                                        className={classes.flexContainer}
                                        cellRenderer={prp => this.cellRenderer('', prp.cellData, numeric, prp.rowIndex)}
                                        {...columns[index]}
                                    />
                                );
                            })}
                        </Table>
                    )}
                </AutoSizer>
                <Progress caption='Loading...' open={!db.length}/>
            </React.Fragment>
        );
    }
}

function mapStateToProps({db}: {db: StateDB }): IPropsState {
    return {
        db: db.db
    }
};

export default withStyles(styles)(connect(mapStateToProps, null)(MuiVirtualizedTable));
