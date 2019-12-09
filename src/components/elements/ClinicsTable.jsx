import React from "react";
import { Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import ClearIcon from '@material-ui/icons/Clear';

import { getClinics, addClinic, deleteClinic } from "../../actions/clinicActions";
import { ConfirmDeleteDialog } from '../elements/MyDialogs'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  alizarinColor: {
    color: theme.palette.customeColors && theme.palette.customeColors.alizarin
      ? theme.palette.customeColors.alizarin : '#e74c3c'
  },
}));






export default function Orders() {
  const classes = useStyles();

  const [dataRows, setDataRows] = React.useState([]);
  const [addRowAnchor, setAddRowAnchor] = React.useState(null);
  const [texts, setTexts] = React.useState({ addRow: '' });
  const [modals, setModals] = React.useState({ deleteClinic: null })

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
            <TableCell>حذف</TableCell>
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

              <TableCell>
                <IconButton
                  onClick={() => {
                    setModals({ ...modals, deleteClinic: row._id })
                  }}
                >
                  <ClearIcon className={classes.alizarinColor} />
                </IconButton>
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
                      setDataRows([...dataRows, data.result])
                    }
                  }).catch(err => { })
              }
            }}
          >
            <AddIcon />
          </Button>
        </FormControl>
      </Popover>



      <ConfirmDeleteDialog
        open={Boolean(modals.deleteClinic)}
        onClose={() => {
          setModals({ ...modals, deleteClinic: null })
        }}
        onAccept={() => {
          deleteClinic({ clinicID: modals.deleteClinic }, { autoErrorControl: true }).then(data => {
            const clinicID = (data.result && data.result._id) ? data.result._id : modals.deleteClinic
            const deletedIndex = dataRows.findIndex(dataRow => dataRow._id === clinicID)

            if (deletedIndex !== -1) {
              setDataRows([...dataRows.slice(0, deletedIndex), ...dataRows.slice(deletedIndex + 1)])
            }
            setModals({ ...modals, deleteClinic: null })
          }).catch(err => { })
        }}
      />



    </>
  );
}
