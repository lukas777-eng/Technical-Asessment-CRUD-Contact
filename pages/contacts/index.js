import Link from 'next/link'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../Navbar'

import Button from '@mui/material/Button';
import { useRouter } from 'next/router'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, lastName, email, phone) {
  return { name, lastName, email, phone};
}


export default function Home({ info, page, currentPage, totalPages }) {

  const router = useRouter();

console.log(currentPage)
console.log(totalPages)
  return (
  <>
  <Navbar />
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">LastName</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info.map((data) => (
              <>
              <StyledTableRow key={data._id}>
                <StyledTableCell align="left">{data.firstName}</StyledTableCell>
                <StyledTableCell align="left">{data.lastName}</StyledTableCell>
                <StyledTableCell align="left">{data.email}</StyledTableCell>
                <StyledTableCell align="left">{data.phone}</StyledTableCell>
                <StyledTableCell><Link href={"/contacts/[id]"} as={`/contacts/${data._id}`} ><Button variant="outlined" color="success" >
                        Change it
                    </Button></Link>
                </StyledTableCell>
              </StyledTableRow>
              </>
            ))}
          </TableBody>
      </Table>
  </TableContainer>
  <Button variant="outlined" color="primary" onClick={() => router.push(`/contacts/?page=${page - 1}`)} disabled={page <= 1}>previous</Button>
  <Button variant="outlined" color="primary" onClick={() => router.push(`/contacts/?page=${page + 1}`)} disabled={page >= totalPages}>next</Button>
</>
  )
}

export async function getServerSideProps({ query: {page = 1}}) {
  const res = await fetch(`https://bkbnchallenge.herokuapp.com/contacts?page=${page}`)
  const info = await res.json();
  return {
    props: {
      info: info.results,
      currentPage: info.currentPage,
      totalPages: info.totalPages,
      page: +page,
    }
  }
}
