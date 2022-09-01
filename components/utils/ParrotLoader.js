import { Fragment } from "react";
export default function ParrotLoader() {
  return (
    <div className="parrot-loader-wrapper">
      <style jsx>{`
        .parrot-loader-wrapper {
          position: relative;
          width: 350px;
          height: 350px;
        }
        .grey-logo {
          z-index: 1;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .animated-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        .svg-grey {
          stroke: var(--clr-neutral-500);
          strokewidth: 2;
        }

        @-webkit-keyframes animate-svg-stroke-1 {
          0% {
            stroke-dashoffset: 2724.689697265625px;
            stroke-dasharray: 1362.3448486328125px;
          }

          100% {
            stroke-dashoffset: 1362.3448486328125px;
            stroke-dasharray: 1362.3448486328125px;
          }
        }

        @keyframes animate-svg-stroke-1 {
          0% {
            stroke-dashoffset: 2724.689697265625px;
            stroke-dasharray: 1362.3448486328125px;
          }

          100% {
            stroke-dashoffset: 1362.3448486328125px;
            stroke-dasharray: 1362.3448486328125px;
          }
        }

        .svg-elem-1 {
          -webkit-animation: animate-svg-stroke-1 2s
            cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s both infinite alternate;
          animation: animate-svg-stroke-1 2s
            cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s both infinite alternate;
        }

        @-webkit-keyframes animate-svg-stroke-2 {
          0% {
            stroke-dashoffset: 1397.80419921875px;
            stroke-dasharray: 698.902099609375px;
          }

          100% {
            stroke-dashoffset: 698.902099609375px;
            stroke-dasharray: 698.902099609375px;
          }
        }

        @keyframes animate-svg-stroke-2 {
          0% {
            stroke-dashoffset: 1397.80419921875px;
            stroke-dasharray: 698.902099609375px;
          }

          100% {
            stroke-dashoffset: 698.902099609375px;
            stroke-dasharray: 698.902099609375px;
          }
        }

        .svg-elem-2 {
          -webkit-animation: animate-svg-stroke-2 2s
            cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.01s both infinite alternate;
          animation: animate-svg-stroke-2 2s
            cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.01s both infinite alternate;
        }

        @-webkit-keyframes animate-svg-stroke-3 {
          0% {
            stroke-dashoffset: 2724.783935546875px;
            stroke-dasharray: 1362.3919677734375px;
          }

          100% {
            stroke-dashoffset: 1362.3919677734375px;
            stroke-dasharray: 1362.3919677734375px;
          }
        }

        @keyframes animate-svg-stroke-3 {
          0% {
            stroke-dashoffset: 2724.783935546875px;
            stroke-dasharray: 1362.3919677734375px;
          }

          100% {
            stroke-dashoffset: 1362.3919677734375px;
            stroke-dasharray: 1362.3919677734375px;
          }
        }

        .svg-elem-3 {
          -webkit-animation: animate-svg-stroke-3 2s
            cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.02s both infinite alternate;
          animation: animate-svg-stroke-3 2s
            cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.02s both infinite alternate;
        }

        @-webkit-keyframes animate-svg-stroke-4 {
          0% {
            stroke-dashoffset: 513.6935424804688px;
            stroke-dasharray: 256.8467712402344px;
          }

          100% {
            stroke-dashoffset: 256.8467712402344px;
            stroke-dasharray: 256.8467712402344px;
          }
        }

        @keyframes animate-svg-stroke-4 {
          0% {
            stroke-dashoffset: 513.6935424804688px;
            stroke-dasharray: 256.8467712402344px;
          }

          100% {
            stroke-dashoffset: 256.8467712402344px;
            stroke-dasharray: 256.8467712402344px;
          }
        }

        .svg-elem-4 {
          -webkit-animation: animate-svg-stroke-4 2s
            cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.03s both infinite alternate;
          animation: animate-svg-stroke-4 2s
            cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.03s both infinite alternate;
        }

        @-webkit-keyframes animate-svg-stroke-5 {
          0% {
            stroke-dashoffset: 1920.866943359375px;
            stroke-dasharray: 960.4334716796875px;
          }

          100% {
            stroke-dashoffset: 960.4334716796875px;
            stroke-dasharray: 960.4334716796875px;
          }
        }

        @keyframes animate-svg-stroke-5 {
          0% {
            stroke-dashoffset: 1920.866943359375px;
            stroke-dasharray: 960.4334716796875px;
          }

          100% {
            stroke-dashoffset: 960.4334716796875px;
            stroke-dasharray: 960.4334716796875px;
          }
        }

        .svg-elem-5 {
          -webkit-animation: animate-svg-stroke-5 2s
            cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.04s both infinite alternate;
          animation: animate-svg-stroke-5 2s
            cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.04s both infinite alternate;
        }
      `}</style>
      <div className="grey-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="350"
          height="350"
          viewBox="0 0 764.211 812.427"
        >
          <g id="Parrot" transform="translate(2.107 2.137)" opacity="0.6">
            <path
              id="Path_655"
              data-name="Path 655"
              d="M916.392,321.015l-68.763,74.7c-47.3,50.958-46.925,125.694,25.229,234.552,5.792,8.735.53,15.231-8.057,9.743C763.041,574.9,699.985,501.1,663.443,410.8c-28.818-83.883-27.849-200.543,38.379-287.375a68.82,68.82,0,0,1,96.944-4.031L912.392,224.066a68.8,68.8,0,0,1,4,96.949Z"
              transform="translate(-645.421 166.052)"
              fill="none"
              fillRule="evenodd"
              className="svg-grey"
            ></path>
            <path
              id="Path_656"
              data-name="Path 656"
              d="M755.745,121.895c-26.987,29.492-8.248,72.086-81.005,88.549C579.4,231.984,803.865,353.086,906.6,259.87a42.3,42.3,0,0,0-2.654-59.618L815.4,119.207a42.382,42.382,0,0,0-59.653,2.688Z"
              transform="translate(-418.274 415.438)"
              fill="none"
              fillRule="evenodd"
              className="svg-grey"
            ></path>
            <path
              id="Path_657"
              data-name="Path 657"
              d="M676.108,417.372l68.757-74.7c47.3-50.957,46.925-125.694-25.274-234.552-5.786-8.736-.524-15.231,8.107-9.743,101.755,65.106,164.766,138.908,201.314,229.213C957.83,411.511,956.9,528.133,890.673,615A68.853,68.853,0,0,1,793.729,619L680.1,514.321a68.784,68.784,0,0,1-3.994-96.949Z"
              transform="translate(-187.047 -15.527)"
              fill="none"
              fillRule="evenodd"
              className="svg-grey"
            ></path>
            <path
              id="Path_658"
              data-name="Path 658"
              d="M695.853,100.544a40.563,40.563,0,1,1-40.091,41.027,40.637,40.637,0,0,1,40.091-41.027Z"
              transform="translate(-269.852 136.575)"
              fill="none"
              fillRule="evenodd"
              className="svg-grey"
            ></path>
            <path
              id="Path_659"
              data-name="Path 659"
              d="M828.595,353.089c-47.557-27.625-40.463-91.274-142.715-82.95-133.971,10.9,110.911-240.262,284.009-160.15A58.273,58.273,0,0,1,990.9,189.355l-82.91,142.717a58.3,58.3,0,0,1-79.4,21.018Z"
              transform="translate(-575.149 -94.19)"
              fill="none"
              fillRule="evenodd"
              className="svg-grey"
            ></path>
          </g>
        </svg>
      </div>
      <div className="animated-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="350"
          height="350"
          viewBox="0 0 764.211 812.427"
        >
          <g id="Parrot" transform="translate(2.107 2.137)" opacity="0.89">
            <path
              id="Path_655"
              data-name="Path 655"
              d="M916.392,321.015l-68.763,74.7c-47.3,50.958-46.925,125.694,25.229,234.552,5.792,8.735.53,15.231-8.057,9.743C763.041,574.9,699.985,501.1,663.443,410.8c-28.818-83.883-27.849-200.543,38.379-287.375a68.82,68.82,0,0,1,96.944-4.031L912.392,224.066a68.8,68.8,0,0,1,4,96.949Z"
              transform="translate(-645.421 166.052)"
              fill="none"
              stroke="#ffcb07"
              strokeWidth="4"
              fillRule="evenodd"
              className="svg-elem-1"
            ></path>
            <path
              id="Path_656"
              data-name="Path 656"
              d="M755.745,121.895c-26.987,29.492-8.248,72.086-81.005,88.549C579.4,231.984,803.865,353.086,906.6,259.87a42.3,42.3,0,0,0-2.654-59.618L815.4,119.207a42.382,42.382,0,0,0-59.653,2.688Z"
              transform="translate(-418.274 415.438)"
              fill="none"
              stroke="#4dc4ef"
              strokeWidth="4"
              fillRule="evenodd"
              className="svg-elem-2"
            ></path>
            <path
              id="Path_657"
              data-name="Path 657"
              d="M676.108,417.372l68.757-74.7c47.3-50.957,46.925-125.694-25.274-234.552-5.786-8.736-.524-15.231,8.107-9.743,101.755,65.106,164.766,138.908,201.314,229.213C957.83,411.511,956.9,528.133,890.673,615A68.853,68.853,0,0,1,793.729,619L680.1,514.321a68.784,68.784,0,0,1-3.994-96.949Z"
              transform="translate(-187.047 -15.527)"
              fill="none"
              stroke="#faa61a"
              strokeWidth="4"
              fillRule="evenodd"
              className="svg-elem-3"
            ></path>
            <path
              id="Path_658"
              data-name="Path 658"
              d="M695.853,100.544a40.563,40.563,0,1,1-40.091,41.027,40.637,40.637,0,0,1,40.091-41.027Z"
              transform="translate(-269.852 136.575)"
              fill="none"
              stroke="#61863a"
              strokeWidth="4"
              fillRule="evenodd"
              className="svg-elem-4"
            ></path>
            <path
              id="Path_659"
              data-name="Path 659"
              d="M828.595,353.089c-47.557-27.625-40.463-91.274-142.715-82.95-133.971,10.9,110.911-240.262,284.009-160.15A58.273,58.273,0,0,1,990.9,189.355l-82.91,142.717a58.3,58.3,0,0,1-79.4,21.018Z"
              transform="translate(-575.149 -94.19)"
              fill="none"
              stroke="#e92327"
              strokeWidth="4"
              fillRule="evenodd"
              className="svg-elem-5"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
}
