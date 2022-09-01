import { useState } from "react";
export default function FileFormatsSection() {
  const [selectedTab, setSelectedTab] = useState("1");
  return (
    <section className="product-section flex-center-center-column gap-2">
      <style jsx>{`
        .product-container {
          padding: 3.8em 3em;
        }
        .table {
          display: flex;
          flex-direction: column;
        }
        .table_header {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
        }
        .table_header-cell {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: var(--clr-neutral-800);
          background-color: #fefefe00;
          color: var(--clr-neutral-200);
          padding: 0.5rem;
          border: 1px solid var(--clr-neutral-50);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .table_header-cell:hover {
          color: var(--clr-neutral-50);
        }
        .table_header-cell.selected {
          /* make inverse of the selected cell */
          background-color: var(--clr-neutral-200);
          color: var(--clr-neutral-800);
        }

        .table_header-cell-text {
          text-align: center;
          font-size: 1.2em;
          font-weight: 400;
          color: var(--clr-neutral-50);
        }
        .table-body {
          width: 100%;
        }
        .table-panel {
          display: flex;
          width: 100%;
          height: 100%;
          border: 1px solid var(--clr-neutral-50);

          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;

          border-top: 0;
          padding: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .table-panel.hidden {
          visibility: hidden;
          opacity: 0;
          display: none;
        }
        .table-panel ul {
          flex: 1 1 auto;
          position: relative;

          text-align: left;
          padding: 0.8em 1.6em;
          margin: 0;
          flex-direction: column;
          display: flex;
          justify-content: center;

          gap: 1.3em;
        }
        .table-panel ul li {
          position: relative;
          color: var(--clr-neutral-50);
        }

        .table-panel ul li:before {
          content: "";
          position: absolute;
          top: 50%;
          left: calc(0% - 5px);
          width: 3px;
          height: 3px;
          transform: translateY(-50%) translateX(-100%);
          background-color: var(--clr-neutral-50);
          border-radius: 998px;

          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
            <button
              className={`table_header-cell ${
                selectedTab === "1" ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedTab("1");
              }}
            >
              Open subtitles
              <span className="table_header-cell-text"></span>
            </button>
            <button
              className={`table_header-cell ${
                selectedTab === "2" ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedTab("2");
              }}
            >
              Closed Captions
              <span className="table_header-cell-text"></span>
            </button>
            <button
              className={`table_header-cell ${
                selectedTab === "3" ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedTab("3");
              }}
            >
              Timed Text
              <span className="table_header-cell-text"></span>
            </button>
            <button
              className={`table_header-cell ${
                selectedTab === "4" ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedTab("4");
              }}
            >
              Images for DVD authoring & NLE systems
              <span className="table_header-cell-text"></span>
            </button>
            <button
              className={`table_header-cell ${
                selectedTab === "5" ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedTab("5");
              }}
            >
              Text-only scripts for Authoring & NLE systems
              <span className="table_header-cell-text"></span>
            </button>
          </div>
          <div className="table-body">
            <div
              className={`table-panel ${selectedTab !== "1" ? "hidden" : ""}`}
              aria-hidden={selectedTab !== "1" ? "true" : "false"}
            >
              <ul>
                <li>Compressed PAC (.pac)</li>
                <li>.890 files</li>
                <li>EBU (.STL)</li>
                <li>EBU (.STL) for ARTE</li>
                <li>Windows Media Player SAMI</li>
                <li>Plain ASCII text</li>
                <li>Rich Text Format (RTF) files</li>
                <li>XLS Excel Workbook file</li>
                <li>DLP Cinema™ Subtitle XML </li>
                <li>DLP Cinema™ Subtitle XML with quality images</li>
              </ul>
              <ul>
                <li>DCDM SMPTE 428-7-2007 XML Subtitles</li>
                <li>QuickTime Text and .SMIL files</li>
                <li>SubRip (.srt) subtitles</li>
                <li>MicroDVD (.sub) subtitles</li>
                <li>WebVTT (.vtt) subtitles</li>
                <li>Videotron Lambda CAP (.cap)</li>
                <li>Unicode PAC (.fpc)</li>
                <li>Win2020 text files</li>
                <li>DAS</li>
              </ul>
              <ul>
                <li>Softitler .TXT</li>
                <li>Avid® DS Nitris™ Subtitles Files</li>
                <li>OVR</li>
                <li>VDPC</li>
                <li>Timed Text (TTML XML)</li>
                <li>Ooyala Timed Text XML</li>
                <li>IMSC1 &amp; IMSC 1.1 XML</li>
                <li>Netflix Timed Text (NFLX-TT)</li>
              </ul>
              <ul>
                <li>EBU Timed Text (EBU-TT and EBU-TT-D)</li>
                <li>EBU-TT and EBU-TT-D for BBC</li>
                <li>SMPTE-TT Subtitles</li>
                <li>Inscriber CG (.txt)</li>
                <li>Apple iTunes Timed Text (.itt)</li>
                <li>SubStation Alpha (.SSA, .ASS)</li>
                <li>Swift Interchange Format (.sif)</li>
                <li>Universal Subtitling Format (.usf)</li>
              </ul>
            </div>
            <div
              className={`table-panel ${selectedTab !== "2" ? "hidden" : ""}`}
              aria-hidden={selectedTab !== "2" ? "true" : "false"}
            >
              <ul>
                <li>SMPTE-TT captions with tunnel CEA-608 data (.xml)</li>
                <li>Scenarist Closed Caption Format (SCC)</li>
                <li>CPC-715 Online Caption Format (.onl)</li>
                <li>Captions Inc. Files (.cin)</li>
              </ul>
              <ul>
                <li>Cheetah CAP</li>
                <li>Cheetah ASC</li>

                <li>NCI caption files (.cap)</li>
              </ul>
              <ul>
                <li>Ultech caption files (.ult)</li>
                <li>TDS captions files</li>
                <li>ECF captions files</li>
              </ul>
              <ul>
                <li>ProCAP Closed Captions (.txt)</li>
                <li>NCI Timed Roll to Captions (.flc)</li>
                <li>MCC CEA-708 captions (.mcc)</li>
              </ul>
            </div>
            <div
              className={`table-panel ${selectedTab !== "3" ? "hidden" : ""}`}
              aria-hidden={selectedTab !== "3" ? "true" : "false"}
            >
              <ul>
                <li>
                  Generates ETSI EN 300 743 compatible DVB subtitling elementary
                  stream for muxing with ProMedia Carbon or Manzanita MP2TSME
                  multiplexers. There is an option to export Generic DVB
                  Elementary Stream as well.
                </li>
              </ul>
            </div>
            <div
              className={`table-panel ${selectedTab !== "4" ? "hidden" : ""}`}
              aria-hidden={selectedTab !== "4" ? "true" : "false"}
            >
              <ul>
                <li>Sonic Scenarist HDMV (Blu-ray)</li>
                <li>Sonic Scenarist Advanced Content (HD-DVD)</li>
                <li>Sonic Scenarist and Sonic Reel DVD</li>
              </ul>
              <ul>
                <li>Apple® DVD Studio Pro®</li>
                <li>Adobe® Encore® DVD</li>
                <li>Spruce Technologies DVD Maestro</li>
              </ul>
              <ul>
                <li>Final Cut Pro® X and earlier</li>
                <li>DoStudio Authoring Suite</li>
                <li>Ultech DV2000/3000 .USF File Format and .yuc images</li>
              </ul>
              <ul>
                <li>Pinnacle Impression DVD</li>
                <li>Toshiba Authoring System</li>
                <li>Panasonic Blu-Ray Authoring SPI</li>
              </ul>
            </div>
            <div
              className={`table-panel ${selectedTab !== "5" ? "hidden" : ""}`}
              aria-hidden={selectedTab !== "5" ? "true" : "false"}
            >
              <ul>
                <li>Apple® DVD Studio Pro® text script</li>
                <li>Final Cut Pro® XML Interchange Format</li>
                <li>Adobe® Encore® DVD text script</li>
              </ul>
              <ul>
                <li>Spruce Technologies DVD Maestro STL Text Script</li>
                <li>Sony DVD Architect Subtitle Script</li>
              </ul>
              <ul>
                <li>Roxio DVDIt Pro Subtitle Script</li>
                <li>Avid® DS Nitris® Subtitles Files</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
