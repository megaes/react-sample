import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Progress from '../components/Progress';

const styles = theme => ({
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

class MuiVirtualizedTable extends React.PureComponent {

    cellRenderer = ({ label = null, cellData = null, numeric = false, rowIndex = -1 }) => {
        const { classes, rowHeight, headerHeight } = this.props;
        const isHeader = (rowIndex === -1);

        let cell = null;
        if (isHeader) {
            cell = label;
        } else {
            if (cellData) {
                cell = cellData;
            } else {
                cell = (
                    <IconButton color='primary' component={({...props}) => <Link to={`/${rowIndex}/edit`} {...props} />}>
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

    getColumnLayout() {
        let columns = Object.entries(this.props.db.length ? this.props.db[0] : {}).map(entry => {
            if (typeof entry[1] == 'number') {
                return { width: 120, dataKey: entry[0], label: entry[0], numeric: true };
            }
            return { width: 200, dataKey: entry[0], label: entry[0], flexGrow: 1.0 };
        });
        columns.push({ width: 100, dataKey: 'editBtn'});
        return columns;
    }

    render() {
        const columns = this.getColumnLayout();
        const { classes, db, headerHeight, rowHeight } = this.props;
        return (
            <React.Fragment>
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            disableHeader={!db.length}
                            rowCount={db.length}
                            rowGetter={({ index }) => db[index]}
                            rowHeight={rowHeight}
                            headerHeight={headerHeight}
                            className={classes.table}
                            height={height}
                            width={width}
                            rowClassName={classes.flexContainer}
                        >
                            {columns.map(({ dataKey, numeric = false }, index) => {
                                return (
                                    <Column
                                        key={dataKey}
                                        headerRenderer={props => this.cellRenderer({ ...props, numeric })}
                                        className={classes.flexContainer}
                                        cellRenderer={props => this.cellRenderer({ ...props, numeric })}
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

MuiVirtualizedTable.defaultProps = {
    headerHeight: 56,
    rowHeight: 56,
};

const mapStateToProps = ({db}) => {
    return {
        db: db.db
    }
};

export default withStyles(styles)(connect(mapStateToProps, null)(MuiVirtualizedTable));
