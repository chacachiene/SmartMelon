import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux"
import { deleteValue } from 'database/http/deleteData';
import { useSelector } from "react-redux"
import { useEffect } from "react"                                   
import { setPumpTime, setLightTime } from "state/clock"

export default function ScheduleDataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  // this is data for render table
  const pumpClock = useSelector((state) => state.clock.pump)
  const lightClock = useSelector((state) => state.clock.light)
  const dispatch = useDispatch()

  console.log("at setup page pump: ", pumpClock)
  console.log("at setup page light: ", lightClock)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id,feed_key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id,feed_key);
      }
    });
  };

  const deleteApi = async (id,feed_key) => {
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    const valdel = await deleteValue(feed_key,id);
    dispatch(setPumpTime(pumpClock.filter((item) => item.id !== id)))
    dispatch(setLightTime(lightClock.filter((item) => item.id !== id)))
    
  };

  const currentTime = new Date();

  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
         <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{ padding: "20px" }}
          >
            Schedule
          </Typography>
      <TableContainer sx={{ maxHeight: '600px' }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: '150px' }}>
                    Kind
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '200px' }}>
                    Date Creating
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '150px' }}>
                    Start
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '150px' }}>
                    End
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '50px' }}>
                    Levelx
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '80px' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(pumpClock.concat(lightClock))
                  .filter(row => {
                    // Compare the time end value with the current time
                    let givenDate = new Date(row.to);
                    return givenDate > currentTime;
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {

                    let formattedFeedKey = row.feed_key.replace("-time", "");

                    let createdDate = new Date(row.created_at);

                    // Format date to "YYYY-MM-DD HH:mm:ss"
                    let formattedDate = createdDate.toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      timeZone: 'UTC' // Assuming the original date string is in UTC
                    });

                    
                    let FromDate = new Date(row.from);

                    // Format date to "YYYY-MM-DD HH:mm" without seconds
                    let formattedFrom = FromDate.toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: 'UTC' // Assuming the original date string is in UTC
                    });


                    let toDate = new Date(row.to);

                    // Format date to "YYYY-MM-DD HH:mm" without seconds
                    let formattedTo = toDate.toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: 'UTC' // Assuming the original date string is in UTC
                    });
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell align="left">{formattedFeedKey}</TableCell>
                        <TableCell align="left">{formattedDate}</TableCell>
                        <TableCell align="left">{formattedFrom}</TableCell>
                        <TableCell align="left">{formattedTo}</TableCell>
                        <TableCell align="left">{row.value}</TableCell>
                        <TableCell align="left">
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id, row.feed_key);
                              }}
                            />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={pumpClock.length + lightClock.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

    
    </>

  );
}