import React from "react";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import * as LinkM from "@material-ui/core/Link";
import { fade, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Title from "./Title";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AddIcon from '@material-ui/icons/Add';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';

import { getClinics, addClinic } from "../../actions/clinicActions";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },

  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0
  },
  inputRoot: {
    color: 'inherit',
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 5,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
}));

const menuId = 'primary-search-account-menu';
const mobileMenuId = 'primary-search-account-menu-mobile';


export default function Orders() {
  const classes = useStyles();

  const [dataRows, setDataRows] = React.useState([]);
  const [addRowAnchor, setAddRowAnchor] = React.useState(null);
  const [texts, setTexts] = React.useState({ addRow: '' });

  React.useEffect(() => {
    getClinics({}, { autoErrorControl: true })
      .then(data => {
        if (data.success) {
          setDataRows(data.result);
        } else {
          setDataRows([]);
          throw data
        }
      })
      .catch(error => { });
  }, []);

  return (
    <>

      <Toolbar >

        <Typography color='primary' className={classes.title} variant="h6" noWrap>
          کلینیک‌ها
        </Typography>

        <div className={classes.grow} />

        <div>

          <IconButton
            color='secondary'
            onClick={e =>
              setAddRowAnchor(e.currentTarget)
            }
          >
            <AddIcon />
          </IconButton>
        </div>

      </Toolbar>









      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>نام</TableCell>
            <TableCell>آخرین ویرایش</TableCell>
            <TableCell>ویرایش توضیحات</TableCell>
            <TableCell>ویرایش الگوریتم</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows.map(row => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>

              <TableCell>{row.lastUpdate ? row.lastUpdate : "---"}</TableCell>

              <TableCell>
                <Link to={`/edit/${row._id}`}>
                  <DescriptionOutlinedIcon color='secondary' />
                </Link>
              </TableCell>

              <TableCell>
                <Link to={`/algo/${row._id}`}>
                  <AccountTreeOutlinedIcon color='secondary' />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>











      <Popover
        style={{ padding: "2px 10px" }}
        open={Boolean(addRowAnchor)}
        anchorEl={addRowAnchor}
        onClose={() => setAddRowAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <FormControl>
          <TextField
            label="نام کلینیک"
            className={classes.textField}
            autoFocus
            value={texts.addRow}
            onChange={(e, d) =>
              setTexts({ ...texts, addRow: e.target.value })
            }
          />
          <Button
            onClick={() => {
              if (
                texts.addRow !== ''
              ) {
                addClinic({ clinicName: texts.addRow }, { autoErrorControl: true })
                  .then(data => {

                    setAddRowAnchor(null)
                    if (data.success) {
                      let tempDataRows = [...dataRows]
                      tempDataRows.push(data.result)
                      setDataRows(tempDataRows)
                    }
                  }).catch(err => { })
              }
            }}
          >
            <AddIcon />
          </Button>
        </FormControl>
      </Popover>




    </>
  );
}
