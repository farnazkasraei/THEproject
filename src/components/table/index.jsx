import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import P from '../translate';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { setUser } from '@/store/slices/users';
import { toggleSideBar } from '@/store/slices/sideBar';

const DynamicTable = ({ headers, className, ...rest }) => {
  const dispatch = useDispatch();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Adjust as needed

  const data = useSelector(state => state.users.users);

  // Sort data first
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Then paginate
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className='w-full'>
      <Table className={`w-full border rounded-lg ${className || ''}`} {...rest}>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>#</TableHead>
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className='cursor-pointer text-center'
                onClick={() => handleSort(header)}
              >
                <P translate>{header}</P>
                {sortConfig.key === header ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
              </TableHead>
            ))}
            <TableHead className='text-center'>
              <P translate>actions</P>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell className='text-center'>{rowIndex + 1}</TableCell>
              {headers.map((header, colIndex) => (
                <TableCell key={colIndex} className='text-center'>
                  {' '}
                  {header === 'dob'
                    ? format(new Date(row[header]), 'yyyy-MM-dd')
                    : row[header] ?? '-'}
                </TableCell>
              ))}
              <TableCell className='text-center'>
                <Button
                  variant='outline'
                  size='icon'
                  className='text-blue-500'
                  onClick={() => {
                    dispatch(toggleSideBar('update'));
                    dispatch(setUser(row));
                  }}
                >
                  <Pencil className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  className='text-red-500'
                  onClick={() => dispatch(deleteUser(row.id))}
                >
                  <Trash className='h-4 w-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className='mt-4'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            <PaginationItem>
              <span className='px-4'>
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default DynamicTable;
