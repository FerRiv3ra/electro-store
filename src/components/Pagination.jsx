import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';

const Pagination = () => {
  const { pages } = useDashboard();
  const { search } = useLocation();

  const id = search.slice(5);

  let pagesArr = [];

  for (let i = 1; i <= pages; i++) {
    pagesArr.push({
      number: i,
    });
  }

  return (
    <div className="flex justify-center flex-1 mt-4">
      <nav aria-label="Page">
        <ul className="inline-flex -space-x-px">
          <li>
            <Link
              to={
                Number(id) > 1
                  ? { search: `?pag=${Number(id) - 1}` }
                  : { search: `?pag=${id}` }
              }
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </Link>
          </li>
          {pagesArr.map((page) => (
            <li key={page.number}>
              <Link
                to={`/store?pag=${page.number}`}
                className={
                  Number(id) === page.number
                    ? 'py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }
              >
                {page.number}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={
                pages > Number(id)
                  ? { search: `?pag=${Number(id) + 1}` }
                  : { search: `?pag=${id}` }
              }
              className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
