import React from "react";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import * as LinkM from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Title from "./Title";

import { getClinics, getClinicDescription } from "../../actions/clinicActions";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function Orders() {
  const classes = useStyles();

  const [dataRows, setDataRows] = React.useState([]);

  React.useEffect(() => {
    getClinics()
      .then(data => {
        // if (data) {
        if (data.success) {
          setDataRows(data.result);
          data.result.map(row => {
            let t = new Date(row.lastUpdate);
            // console.log(t.getTime());
          });
        } else {
          setDataRows([]);
        }
        // }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>سفارش‌های اخیر</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>موضوع</TableCell>
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
                  <EditIcon />
                </Link>
              </TableCell>

              <TableCell>
                <Link to={`/algo/${row._id}`}>
                  <EditIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
