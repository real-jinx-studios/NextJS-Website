import styles from "./wallet_management.module.css";
import CustomInputDropdown from "../../inputs/customInputDropdown";
import CustomInput from "../../inputs/customInput";
import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveAs } from "file-saver";
import { useTable, usePagination, useSortBy } from "react-table";
import { promiseResolver } from "../../../lib/promiseResolver";
export default function ActivityReports(props) {
  const [tableData, setTableData] = useState([{}]);
  const [sortOptions, setSortOptions] = useState({
    "wallet-key": "",
    "date-from": "",
    "date-to": "",
  });
  const handleSortOptions = (e) => {
    setSortOptions({
      ...sortOptions,
      [e.target.name]: e.target.value,
    });
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    //replace the dates in the sortOptions object with the date format that the API expects
    const formattedSortOptions = {
      ...sortOptions,
      "date-from": sortOptions["date-from"].split("-").reverse().join("."),
      "date-to": sortOptions["date-to"].split("-").reverse().join("."),
    };

    const [dataFetched, error] = await promiseResolver(
      fetch("/api/rest/SubtitlingAssistant/sa-report-projects", {
        method: "POST",
        body: JSON.stringify({
          LoginToken: Cookies.get("uat"),
          ...formattedSortOptions,
        }),
      }),
      { endpoint: "sa-report-projects" }
    );
    if (dataFetched.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    }
    if (dataFetched.status === 400) {
      const err = await dataFetched.json();
      if (err.error === "Invalid token") {
        toast.error(err.error, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
        dispatch({ type: "LOGOUT" });
      }
      return;
    }
    const dataExtracted = await dataFetched.json();
    setTableData(dataExtracted);
  };
  const reformatDate = (date) => {
    let dateArray = date.split("-");
    let newDate = dateArray[2] + "." + dateArray[1] + "." + dateArray[0];
    return newDate;
  };
  useEffect(() => {
    const fetchData = async () => {
      const [data, error] = await promiseResolver(
        fetch("/api/rest/SubtitlingAssistant/sa-report-projects", {
          method: "POST",
          body: JSON.stringify({
            LoginToken: Cookies.get("uat"),
          }),
        })
      );
      if (data.status === 500) {
        router.replace({
          pathname: "/500",
          query: { err: "internal server error" },
        });
      }
      if (data.status === 400) {
        const err = await data.json();
        if (err.error === "Invalid token") {
          toast.error(err.error, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false);
          dispatch({ type: "LOGOUT" });
        }
        return;
      }
      if (error) {
        toast.error(error.message);
      } else {
        const [data1, error] = await promiseResolver(data.json());
        if (error) {
          toast.error(error.message);
        } else {
          //extract movements from data1 array items
          const movements = data1.projects.map((item) => {
            return {
              walletName: item.wallet.name,
              date: item.movement["date-start"],
              duration: item.movement.duration,
              spent: item.movement["tokens-spent"],
            };
          });
          return movements;
        }
      }
    };

    fetchData().then((movements) => {
      setTableData(movements);
    });
  }, []);

  const wallets = props.wallets;
  const data = useMemo(() => tableData, []);

  const columns = useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      { Header: "Wallet Name", accessor: "walletName" },
      { Header: "Duration", accessor: "duration" },
      { Header: "Tokens Spent", accessor: "spent" },
    ],
    []
  );
  const handleDownloadReport = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/services-portal/export-sheets", {
      method: "POST",
      body: JSON.stringify({ data: data, columns: columns }),
      headers: { "Content-Type": "application/json" },
    });

    const file = await res.blob();
    saveAs(file, "file.xlsx");
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, useSortBy, usePagination);
  return (
    <div className={styles.content}>
      <div className={styles.title_wrapper}>
        <h2 className={styles.activity_reports_title}>
          <small
            className={styles.activity_reports_title_step}
            onClick={() => props.setIsActivityReports(false)}
          >
            wallet management
          </small>
          &nbsp;/ Activity Reports
        </h2>
      </div>
      <div className={styles.content_inner_activity_reports}>
        <div className={styles.activity_reports_filter}>
          <div className={styles.filter_report_type}>
            <p>Report Type</p>
            <CustomInputDropdown
              fieldName="report-type"
              handleChange={handleSortOptions}
            >
              <option value="Current Status">Current Status</option>
              <option value="Projects">Projects</option>
              <option value="Wallet Transactions">Wallet Transactions</option>
            </CustomInputDropdown>
          </div>
          <div className={styles.filter_report_date_range}>
            <p>from</p>
            <CustomInput
              type="date"
              fieldName="date-from"
              value={handleSortOptions["date-from"]}
              handleChange={handleSortOptions}
            />
            <p>to</p>
            <CustomInput
              type="date"
              fieldName="date-to"
              value={handleSortOptions["date-to"]}
              handleChange={handleSortOptions}
            />
          </div>
          <div className={styles.filter_report_wallet}>
            <p>wallet</p>
            <CustomInputDropdown
              fieldName="wallet-key"
              value={handleSortOptions["wallet-key"]}
              handleChange={handleSortOptions}
            >
              <option value={""}>None</option>
              {wallets.map((wallet) => (
                <option value={wallet.hash} key={wallet.hash}>
                  {wallet.name}
                </option>
              ))}
            </CustomInputDropdown>
          </div>
          <div className={styles.filter_report_actions}>
            <button
              className="button button_basic_long_on_light_bg"
              onClick={handleSearch}
            >
              SEARCH
            </button>
            <div className={styles.download_report_wrapper}>
              <button
                className="button button_basic_long_on_light_bg"
                onClick={handleDownloadReport}
              >
                DOWNLOAD
              </button>
              <br />
              <code>.xlsx</code>
            </div>
          </div>
        </div>
        <div className={styles.activity_reports_results}>
          <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <br />
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={styles.sort_icon}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={styles.sort_icon}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          )
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.sort_icon}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          style={{
                            padding: "11px",

                            border: "solid 1px gray",

                            background: "papayawhip",
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[9, 18, 27, 36, 45].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
