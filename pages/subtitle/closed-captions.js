import Link from "next/link";
import ScrollDownArrow from "../../components/utils/ScrollDownArrow";
import ClosedCaptionsFeature from "../../components/products/closed_captions/ClosedCaptionsFeature";
export default function ClosedCaptionsPage() {
  const fileFormatsArray = [
    "Scenarist Closed Caption Format (SCC)",
    "SMPTE-TT Captions with tunnel CEA-608 data (.xml)",
    "MCC CEA-708 captions (.mcc)",
    "CPC-715 Online Caption Format (.onl)",
    "Captions Inc. Files (.cin)",
    "Cheetah CAP",
    "Cheetah ASC",
    "TDS Captions",
    "ECF Captions",
    "NCI Captions (.cap)",
    "NCI Timed Roll Up Captions (.flc)",
    "ProCap Captions (.txt)",
    "Ultech ULT Captions (.ult)",
    "CFF-TT Captions",
  ];
  const closedCaptionsFeaturesArray = [
    {
      title: "Subtitling Assistant",
      text: "EZTitles has a dedicated Closed Captions mode build into the software. This profile preset packs all the additional features and options related to the Closed Captions creation. Turn it on and the software will change its interface to focus on the tools you would need the most to get your Closed Captions job done.",
      border: false,
    },
    {
      title: "Continuous Typing Workflow",
      text: "You can efficiently subtitle long speech segments and continuous dialogue. Just type the text in and EZTitles will take care of the rest. As a result, you get splendid separate captions with the correct timecodes set automatically. This feature is designed for roll-up closed captions but can also be applied to other type of captions.",
      border: false,
    },
    {
      title: "Precise text positioning",
      text: "Place your subtitles anywhere on the screen. You can have one line justified to the left and the other justified to the right if you are doing a dialogue. And you can also change the horizontal position if needed.",
      border: false,
    },
    {
      title: "Quality Check",
      text: "EZTitles has dedicated Quality Check options for Closed Captions. The software could automatically calculate if there is enough time for the captions text and control codes to display; if there are Roll-up captions on multiple lines; and more.",
      border: false,
    },
    {
      title: "Automated Closed Captioning",
      text: "EZTitles has a feature for automatic Closed Captions and subtitles creation - Subtitling Assistant. It recognizes the speech in the video and generates Closed Captions according to your requirements. The Subtitling Assistant is easy to configure and use, and will speed up your captioning significantly.",
      border: true,
      action: "/subtitle#automated-closed-captioning",
    },
    {
      title:
        "<span style='width:100%; display:block; text-align:center;'>Learn more about working with Closed Captions in EZTitles</span>",
      border: false,
      action: "/Webhelp/EZTitles/index.html",
    },
  ];

  return (
    <div className="section-wrapper">
      <style jsx>{`
        .section-wrapper {
          z-index: 1;
          position: relative;
        }
        .hero-video-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          z-index: -1;
        }
        .title,
        .subtitle {
          text-align: center;
          font-size: var(--fs-650);
          font-weight: 200;
          color: var(--clr-neutral-50);
        }
        .subtitle {
          font-size: var(--fs-600);
          padding: 0 2em;
        }
        .container {
          gap: 3.5em;
        }
        .actions-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2em;
        }
        .main-content {
          background-color: var(--clr-main);
        }
        .section-title {
          padding: 0 2em 2em;
        }
        #section-title {
          font-size: var(--fs-650);
          line-height: 1.2;
          font-weight: 900;
          color: var(--clr-neutral-50);
          background: linear-gradient(45deg, #0161a8, #3fc2ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-content {
          margin-bottom: var(--offset-7);
          display: grid;
          grid-gap: 2em;
          grid-column-gap: 5em;
          grid-template-rows: masonry;
        }
        .section-content-alternate {
          margin-bottom: var(--offset-7);
        }
        .file-formats-list {
          width: 100%;
          padding-left: calc(2em + 0.9em + 0.45em);
        }
        .file-formats-list li {
          position: relative;
          font-weight: 200;
          font-size: var(--fs-400);
        }
        .file-formats-list li::before {
          content: "";
          position: absolute;
          left: -0.9em;
          top: 50%;
          width: 0.45em;
          height: 0.45em;
          border-radius: 50%;
          background-color: var(--clr-neutral-50);
          transform: translate(-50%, -50%);
        }
        @media (min-width: 49em) {
          .actions-wrapper {
            flex-direction: row;
            gap: 5em;
          }
          .section-content {
            grid-template-columns: repeat(auto-fit, minmax(35%, 1fr));
          }
          .file-formats-list {
            column-count: 2;
          }
        }
        .section-footer {
          text-align: center;
        }
        .section-footer_title {
          font-size: var(--fs-550);
          font-weight: 400;
          color: var(--clr-neutral-50);
          margin-bottom: var(--offset-4);
          line-height: 1.3;
        }
        .container-break {
          background: rgb(4, 11, 19);
          background: linear-gradient(
            53deg,
            rgba(4, 11, 19, 1) 0%,
            rgba(40, 78, 109, 1) 66%,
            rgba(0, 97, 171, 1) 100%
          );
          padding: 2em;
          margin-bottom: var(--offset-7);
        }
        .container-break_title {
          font-size: var(--fs-550);
          font-weight: 500;
          color: var(--clr-neutral-50);
        }
      `}</style>
      <video autoPlay loop className="hero-video-background">
        <source src="/videos/hero-eztitles.webm" type="video/webm" />
      </video>
      <section className="section offset-top" aria-labelledby="title">
        <div className="container flex-center-center-column">
          <h1 className="title" id="title">
            Professional Closed Captioning Software
          </h1>
          <p className="subtitle">
            EZTitles provides the full functionality for creating perfect Closed
            Captions
          </p>
          <div className="actions-wrapper">
            <Link href="/products/free-trial?destination=products/free-trial">
              <a className="button button_basic_long">Free Trial</a>
            </Link>
            <Link href="/subtitle#license-editions">
              <a className="button button_basic_long">License Editions</a>
            </Link>
          </div>
          <div className="scroll-to-content-arrow">
            <ScrollDownArrow destination="#anchor" />
          </div>
        </div>
      </section>
      <section className="section main-content" id="anchor">
        <div className="container">
          <div className="section-title">
            <h2 id="section-title">
              Cover all Closed Captioning standards
              <br />
              Roll-up, Pop-on, 608, 708 and more
            </h2>
          </div>
          <div className="section-content" style={{ "margin-bottom": "2em" }}>
            {[
              {
                title: "Accuracy",
                text: "US Congress requires video programming distributors to close caption their television programs. The Federal Communications Commission has strict guidelines for Closed Captions creation. With EZTitles generating accurate Closed Captions that comply with the FFC requirements is an easy task.",
                border: false,
              },
              {
                title: "Display Modes",
                text: "<strong>Roll-up, Pop-on and Paint-on</strong> display modes can be applied easier than ever with the global command for all captions or the regular command for single captions. And for a better subtitling experience Roll-up captions can be previewed exactly as they will be displayed on the TV screen.",
                border: false,
              },
            ].map((features, index) => (
              <ClosedCaptionsFeature key={index} {...features} />
            ))}
          </div>
          <div className="section-content-alternate">
            <ClosedCaptionsFeature
              key={"whatever"}
              title="File Formats"
              text="With the advantage of using digital video as a standard, you can prepare closed captions off-line stunningly fast. And you can deliver them to your clients without having to leave your home or office, since you have all the popular closed captions file formats at your fingertips:"
              border={false}
            />
            <ul className="file-formats-list">
              {fileFormatsArray.map((format, index) => (
                <li key={index + format}>{format}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-break">
          <div className="container">
            <h3 className="container-break_title">
              Working with Closed Captions often needs a different approach to
              the whole subtitling and captioning process. EZTitles provides
              many additional features to address exactly the Closed Captioning
              requirements.
            </h3>
          </div>
        </div>
        <div className="container">
          <div className="section-content">
            {closedCaptionsFeaturesArray.map((features, index) => (
              <ClosedCaptionsFeature key={index} {...features} />
            ))}
          </div>
          <div className="section-footer">
            <h4 className="section-footer_title">
              Working with Closed Captions files in EZTitls is available with
              the Standard and Ultimate editions. Check License editions and
              prices below.
            </h4>
            <Link href="/subtitle#license-editions">
              <a className="button button_basic_long">License Editions</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
