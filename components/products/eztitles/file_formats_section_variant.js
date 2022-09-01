export default function FileFormatsSectionVariant() {
  return (
    <section className="product-section flex-center-center-column gap-2">
      <style jsx>{`
        .product-container {
          padding: 3.8em 3em;
        }
        header {
          margin-bottom: var(--offset-6);
        }
        .table {
          display: flex;
          flex-direction: column;
        }
        .table_header {
          display: flex;
        }
        .table_header-cell {
          flex-basis: 19%;
          height: 600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;

          transition: all 0.3s var(--cubic-bezier);
        }
        .table_header-cell li {
          font-size: 0.8em;
          position: relative;
        }
        .table_header-cell li::before {
          content: "•";
          font-weight: bold;
          color: var(--clr-primary);
          margin-right: 0.5rem;
        }
        .table_header-cell:hover {
          flex-basis: 89%;
        }
        .table_header-cell::before {
          position: absolute;
          content: "";
          top: 0;
          right: 0;
          bottom: 0;
          width: 1px;
          opacity: 0.6;
          transition: all 0.3s var(--cubic-bezier);
          background-color: var(--clr-neutral-50);
        }
        .table_header-cell:hover::before {
          opacity: 1;
        }

        .table_header-cell:hover .table_header-cell-text {
          transform: translateY(-250px);
        }
        .list-wrapper {
          opacity: 0;
          bottom: 0;
          position: absolute;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          transform: translateY(250px);
          transition: all 0.22s var(--cubic-bezier);
        }
        .table_header-cell:hover .list-wrapper {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s var(--cubic-bezier) 0.3s;
        }

        .table_header-cell-text {
          text-align: center;
          font-size: 1.2em;
          font-weight: 400;
          color: var(--clr-neutral-50);
          transition: all 0.22s var(--cubic-bezier) 0.3s;
        }
        .table-body {
          width: 100%;
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: repeat(4, 1fr);
        }
      `}</style>
      <div className="product-container">
        <header>
          <h2 className="section-heading">
            Export your work in any file format used in the industry today
          </h2>
        </header>
        <div className="table">
          <div className="table_header">
            <div className="table_header-cell">
              <span className="table_header-cell-text">Open subtitles</span>

              <div className="list-wrapper">
                <ul>
                  <li>Compressed PAC (.pac)</li>
                  <li>.890 files</li>
                  <li>EBU (.STL)</li>
                  <li>EBU (.STL) for ARTE</li>
                  <li>Windows Media Player SAMI</li>
                  <li>Plain ASCII text</li>
                  <li>Rich Text Format (RTF) files</li>
                  <li>XLS Excel Workbook file</li>
                  <li>DLP Cinema™ Subtitle XML</li>
                  <li>DLP Cinema™ Subtitle XML with quality images</li>
                </ul>
                <ul>
                  <li>Compressed PAC (.pac)</li>
                  <li>.890 files</li>
                  <li>EBU (.STL)</li>
                  <li>EBU (.STL) for ARTE</li>
                  <li>Windows Media Player SAMI</li>
                  <li>Plain ASCII text</li>
                  <li>Rich Text Format (RTF) files</li>
                  <li>XLS Excel Workbook file</li>
                  <li>DLP Cinema™ Subtitle XML</li>
                  <li>DLP Cinema™ Subtitle XML with quality images</li>
                </ul>

                <ul>
                  <li>Compressed PAC (.pac)</li>
                  <li>.890 files</li>
                  <li>EBU (.STL)</li>
                  <li>EBU (.STL) for ARTE</li>
                  <li>Windows Media Player SAMI</li>
                  <li>Plain ASCII text</li>
                  <li>Rich Text Format (RTF) files</li>
                  <li>XLS Excel Workbook file</li>
                  <li>DLP Cinema™ Subtitle XML</li>
                  <li>DLP Cinema™ Subtitle XML with quality images</li>
                </ul>

                <ul>
                  <li>Compressed PAC (.pac)</li>
                  <li>.890 files</li>
                  <li>EBU (.STL)</li>
                  <li>EBU (.STL) for ARTE</li>
                  <li>Windows Media Player SAMI</li>
                  <li>Plain ASCII text</li>
                  <li>Rich Text Format (RTF) files</li>
                  <li>XLS Excel Workbook file</li>
                  <li>DLP Cinema™ Subtitle XML</li>
                  <li>DLP Cinema™ Subtitle XML with quality images</li>
                </ul>
              </div>
            </div>
            <div className="table_header-cell">
              <span className="table_header-cell-text">Closed Captions</span>
            </div>
            <div className="table_header-cell">
              <span className="table_header-cell-text">Timed Text</span>
            </div>
            <div className="table_header-cell">
              <span className="table_header-cell-text">
                Images for DVD authoring & NLE systems
              </span>
            </div>
            <div className="table_header-cell">
              <span className="table_header-cell-text">
                Text-only scripts for Authoring & NLE systems
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
