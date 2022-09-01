export default function ExpandIcon({ expanded }) {
  return (
    <>
      <style jsx>{`
        .expand_icon {
          font-size: var(--fs-500);
          color: var(--clr-neutral-50);
          transition: all 0.6s cubic-bezier(0.5, 0.14, 0.39, 1.15);
        }
        .shrink_icon {
          transform: rotate(180deg);
        }
        #top_arrow.expanded {
          transform-origin: 43px;
          transform: translateY(27px) rotate(360deg);
        }
        #bottom_arrow.expanded {
          transform-origin: 43px;
          transform: translateY(-27px) rotate(0deg);
        }
        #left_arrow.expanded {
          transform-origin: 43px;
          transform: rotate(180deg) translateX(53px);
        }
        #right_arrow.expanded {
          transform-origin: 43px;
          transform: rotate(180deg) translateX(-1px);
        }

        #top_arrow,
        #bottom_arrow,
        #left_arrow,
        #right_arrow {
          transition: all 0.2s ease-in-out;
        }
      `}</style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 60 60"
        fill="none"
        className={`expand_icon ${expanded ? "shrink_icon" : ""}`}
      >
        <g id="expand">
          <g id="top_arrow" className={expanded ? "expanded" : ""}>
            <path
              id="line_long"
              d="M30 23L30 10"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              id="line_short_left"
              d="M25 16L30 10"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              id="line_short_right"
              d="M35 16L30 10"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
          </g>
          <g id="left_arrow" className={expanded ? "expanded" : ""}>
            <path
              id="line_long_2"
              d="M23 30L10 30"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              id="line_short_left_2"
              d="M16 35L10 30"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              id="line_short_right_2"
              d="M16 25L10 30"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
          </g>
          <g id="bottom_arrow" className={expanded ? "expanded" : ""}>
            <path
              id="line_long_3"
              d="M30 37L30 50"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              id="line_short_left_3"
              d="M35 44L30 50"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              id="line_short_right_3"
              d="M25 44L30 50"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
          </g>
          <g id="right_arrow" className={expanded ? "expanded" : ""}>
            <path
              id="line_long_4"
              d="M37 30L50 30"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              id="line_short_left_4"
              d="M44 25L50 30"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              id="line_short_right_4"
              d="M44 35L50 30"
              stroke="#FEFEFE"
              stroke-width="5"
              stroke-linecap="round"
            />
          </g>
          <path
            id="Ellipse 3"
            d="M56.5 30C56.5 44.6355 44.6355 56.5 30 56.5C15.3645 56.5 3.5 44.6355 3.5 30C3.5 15.3645 15.3645 3.5 30 3.5C44.6355 3.5 56.5 15.3645 56.5 30Z"
            stroke="#FEFEFE"
            stroke-width="5"
          />
        </g>
      </svg>
    </>
  );
}
