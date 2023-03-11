import React from 'react';
import { createTheme, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MUIDataTable from 'mui-datatables';
import { ThemeProvider as MuiThemeProvider, alpha } from '@mui/material/styles';
import { styled } from '@mui/system';

export const isSorted = (field, orderBy, orderDir) =>
  (orderBy === field && (orderDir === 1 ? 'asc' : orderDir === -1 ? 'desc' : 'none')) || 'none';

const overrideStyles = {
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        // backgroundColor: "#FF0000"
      },
    },
    MuiTableCell: {
      root: {
        // This can be referred from Material UI API documentation.
        padding: '4px 8px',
        // backgroundColor: "#eaeaea"
      },
    },
    MUIDataTable: {
      tableRoot: {
        overflow: 'auto',
        // overflow: "visible",
        height: 'auto',
        maxHeight: 'auto',
      },
    },
  },
};

const getMuiTheme = () => createTheme(overrideStyles);

const LoadingBox = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  zIndex: 110,
  position: 'absolute',
  top: 0,
  left: 0,
  background: alpha(theme.palette.grey[100], 0.5),
}))

const StyledDiv = styled("div")(({ theme }) => ({
  position: 'relative',
}))
const TableContainer = styled(Box)(({ theme }) => ({
  zIndex: 0,
}))

/**
 * 
 * @param {filters} {limit, total, page, query,} 
 * @param {getData} getData({filters current change only, like page or limit})
 * @returns 
 */
const MUITable = ({ loading, error, options, columns, filters, getData, ...props }) => {
  let timerForOnChange;
  console.log("getData&filters", filters, getData)
  return (
    <StyledDiv>
      <TableContainer>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            {...props}
            columns={columns}
            options={{
              ...{
                serverSide: !!getData,
                download: false,
                print: false,
                selectableRows: 'none',
                rowsPerPageOptions: [10, 25, 50, 100],
                selectToolbarPlacement: 'replace',
                selectableRowsHeader: false,
                page: filters.page ? filters.page - 1 : 0,
                count: filters.total || 0,
                rowsPerPage: filters.limit || 0,
                searchText: filters.query || '',
              },
              ...(getData && (options.serverSide)
                ? {
                  onFilterChange: (field, filteredData) => {
                    for (let i = 0; i < columns.length; i += 1) {
                      const element = columns[i];
                      if (element.name === field) {
                        getData({
                          [field]: filteredData[i].length > 0 ? filteredData[i][0] : '',
                        });
                        break;
                      }
                    }
                  },
                  onColumnSortChange: (field, direction) => {
                    let found = false;
                    for (let i = 0; i < columns.length; i += 1) {
                      const element = columns[i];
                      if (element.name === field) {
                        const { options } = element;
                        if (options && options.sortDirection === 'asc') {
                          direction = -1;
                        } else if (options && options.sortDirection === 'desc') {
                          direction = null;
                          field = null;
                        } else {
                          direction = 1;
                        }
                        found = true;
                        break;
                      }
                    }
                    if (!found) {
                      direction = direction === 'descending' ? -1 : 1;
                    }
                    getData({
                      orderBy: field,
                      orderDir: direction,
                    });
                  },
                  onSearchChange: (query) => {
                    if (timerForOnChange) {
                      clearTimeout(timerForOnChange);
                    }
                    timerForOnChange = window.setTimeout(() => {
                      getData({ query, page: 1 });
                    }, 1000);
                  },
                  onChangePage: (page) => {
                    getData({ page: page + 1 });
                  },
                  onChangeRowsPerPage: (limit) => {
                    getData({ limit, page: 1 });
                  },
                  onTableChange: (action, { columns, ...tableState }) => {
                    if (action === 'resetFilters') {
                      const dataSet = {};
                      for (let i = 0; i < columns.length; i += 1) {
                        const element = columns[i];
                        if (element.filter === true) {
                          dataSet[element.name] = null;
                        }
                      }
                      getData(dataSet);
                    }
                  },
                }
                : {}),
              ...options,
            }}
          />
        </MuiThemeProvider>
      </TableContainer>
      {loading && (
        <LoadingBox
          display="flex"
          alignContent="center"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="secondary" />
        </LoadingBox>
      )}
      {error && (
        <Box m={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
    </StyledDiv>
  );
};

export const objectFilter = (
  filterList,
  onChange,
  index,
  column,
  optionValues,
  keys = { value: 'value', title: 'title' }
) => (
  <FormControl>
    <InputLabel>{column.label}</InputLabel>
    <Select
      value={filterList[index]}
      onChange={(event) => {
        filterList[index] = [event.target.value];
        onChange(filterList[index], index, column);
      }}
    >
      {/* <MenuItem value={""}>All</MenuItem> */}
      {optionValues.map((item, i) => (
        <MenuItem key={i} value={item[keys.value]}>
          {item[keys.title]}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
/**
 * This method is used when custom filter field is required
 * @param name
 * @param label
 * @param orderBy
 * @param orderDir
 * @param filters
 * @param filterObject options list - array name key and value key
 * @param keys
 * @param options extra options
 */
export const customFilter = (
  name,
  label,
  orderBy,
  orderDir,
  filters,
  filterObject,
  keys,
  options,
  canFilter,
  canSort
) => ({
  name,
  label,
  options: {
    filter: canFilter !== undefined ? canFilter : true,
    sort: canSort !== undefined ? canSort : true,
    sortDirection: isSorted(name, orderBy, orderDir),
    filterList:
      filters &&
        filters[name] !== null &&
        filters[name] !== undefined &&
        Object.keys(filterObject).indexOf(filters[name].toString()) >= 0
        ? [filters[name].toString()]
        : [],
    filterType: 'custom',
    filterOptions: {
      display: (filterList, onChange, index, column) =>
        objectFilter(filterList, onChange, index, column, filterObject, keys),
    },
    customBodyRender: (value, metaData) => {
      let finalText = [];
      if (!Array.isArray(value)) {
        finalText = getValueString(value, filterObject, keys);
      } else {
        for (let i = 0; i < value.length; i += 1) {
          const valueItem = value[i];
          finalText.push(getValueString(valueItem, filterObject, keys));
        }

        finalText = finalText.join(', ');
      }
      return <>{finalText || 'Not set'}</>;
    },
    ...options,
  },
});

const getValueString = (value, filterObject, keys) => {
  let status = '';
  if (
    value ||
    (typeof value === 'number' ? value >= 0 : false) ||
    (typeof value === 'boolean' ? value === true || value === false : false)
  ) {
    const objectData = filterObject.find(
      (object) =>
        object &&
        (typeof object[keys.value] !== 'boolean'
          ? object[keys.value] === value.toString()
          : object[keys.value] === value)
    );
    if (objectData) {
      status = objectData[keys.title];
    } else {
      status = value;
    }
  }
  return status;
};
// @TODO implement for multi key value element
export const objectFilterMultiple = (filterList, onChange, index, column) => {
  const optionValues = ['Minneapolis', 'New York', 'Seattle'];
  return (
    <FormControl>
      <InputLabel htmlFor="select-multiple-chip">Location</InputLabel>
      <Select
        multiple
        value={filterList[index]}
        renderValue={(selected) => selected.join(', ')}
        onChange={(event) => {
          filterList[index] = event.target.value;
          onChange(filterList[index], index, column);
        }}
      >
        {optionValues.map((item) => (
          <MenuItem key={item} value={item}>
            <Checkbox color="primary" checked={filterList[index].indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MUITable;
