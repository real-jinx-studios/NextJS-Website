import Link from "next/link";
export default function ScrollDownArrow({ destination }) {
  return (
    <>
      <style jsx>{`
        .scroll_down_svg {
          margin: 0 auto;
          padding-top: 60px;
          width: max-content;
          max-width: 100%;
        }
        .scroll_down_svg svg {
          fill: #fefefe66;
          transition: 0.3s;
          transform: rotate(90deg) scaleY(2.3) scaleX(1.6);
        }
        .scroll_down_svg:hover svg {
          fill: #fefefe;
          transition: 0.3s;
          transform: rotate(90deg) scaleY(2.5) scaleX(1.9);
        }
      `}</style>
      <div className="scroll_down_svg">
        <Link href={destination}>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 50 50"
              height="48px"
              viewBox="0 0 50 50"
              width="48px"
              fill="#FFFFFF"
            >
              <path d="M15.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15  c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L15.563,39.422  C15.172,39.813,15.172,40.446,15.563,40.836z" />
            </svg>
          </a>
        </Link>
      </div>
    </>
  );
}
