import { useState } from "react";
export default function Convert() {
  //make state that sets element number to generate
  const [elementNumber, setElementNumber] = useState([]);
  const [buttonNumber, setButtonNumber] = useState(0);
  return (
    <div className="section offset-top">
      <style jsx>{`
        .convert_wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .convert_wrapper > * {
          color: var(--clr-neutral-50);
          position: relative;
        }
        .convert_wrapper *::after {
          content: attr(data-info);
          position: absolute;
          top: 50%;
          right: -50%;
          transform: translateY(-50%) translateX(50%);

          color: var(--clr-neutral-50);
          font-size: 0.75rem;
          font-weight: bold;
          text-align: center;
          padding: 0.5rem;

          pointer-events: none;
          opacity: 0.6;
          transition: opacity 0.3s ease-in-out;
        }
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 5rem;
        }
        .add-item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: max-content;
          height: max-content;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 50px;
          border: 1px solid var(--clr-neutral-50);
        }
        .add-item > svg {
          fill: var(--clr-neutral-150);
        }
        .add-item:hover {
          background-color: var(--clr-neutral-50);
        }
        .add-item:hover > svg {
          fill: var(--clr-neutral-700);
        }
      `}</style>
      <div className="container">
        <HeroSection
          text={
            "The world’s only proper subtitles and captions conversion software"
          }
          size={35}
          weight={300}
          caps={false}
          spacing={"1"}
        />
        <HeroSection
          text={"EZConvert"}
          size={88}
          weight={600}
          caps={true}
          spacing={"-1.5"}
        />

        <HeroSection
          text={"EZConvert"}
          size={88}
          weight={600}
          caps={true}
          spacing={"-1.5"}
          btn={true}
        />

        {elementNumber.map((element, index) => (
          <HeroSection key={index} />
        ))}
        <div
          className="add-item"
          onClick={() =>
            setElementNumber([...elementNumber, elementNumber.length])
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path d="M39 15.75v-4.5h-4.5v-3H39v-4.5h3v4.5h4.5v3H42v4.5ZM6 44q-.85 0-1.425-.575Q4 42.85 4 42V31.05q0-1.25.875-2.125T7 28.05h1.35v-9.1q0-1.25.875-2.125t2.125-.875h9.15v-3.2q-1-.7-1.525-1.525-.525-.825-.525-1.975 0-.75.275-1.425T19.5 6.65L22 4l2.5 2.65q.5.5.8 1.175.3.675.3 1.425 0 1.15-.55 1.975-.55.825-1.55 1.525v3.2h9.15q1.25 0 2.125.875t.875 2.125v9.1H37q1.25 0 2.125.875T40 31.05V42q0 .85-.575 1.425Q38.85 44 38 44Zm5.35-15.95h21.3v-9.1h-21.3ZM7 41h30v-9.95H7Zm4.35-12.95h21.3ZM7 41h30Zm30-12.95H7h30Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ size, weight, caps, spacing, text, cnt, btn }) {
  const [heroFontSize, setHeroFontSize] = useState(size || 16);
  const [heroFontWeight, setHeroFontWeight] = useState(weight || 400);
  const [heroAllCaps, setHeroAllCaps] = useState(caps || false);
  const [heroLetterSpacing, setHeroLetterSpacing] = useState(spacing || 0);
  const [heroLineHeight, setHeroLineHeight] = useState(1.5);
  const [heroText, setHeroText] = useState(text || "Hero Text");
  const [constricted, setConstricted] = useState(cnt || false);
  const [isButton, setIsButton] = useState(btn || false);
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div className="hero_section">
      <style jsx>{`
        .hero_section {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .hero_section__inner {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .hero_title_text, .button{
          font-size: ${heroFontSize}px;
          font-weight: ${heroFontWeight};
          letter-spacing: ${heroLetterSpacing}px;
          text-align: ${!constricted ? "center" : "left"};
          text-transform: ${heroAllCaps ? "uppercase" : "none"};
        }
        .hero_title_text.constricted{
          max-width: 500px;

        }
        .hero_title_text.mobile{
          position: relative;
          max-width: 375px;
          height: 812px;
        
        
          padding: 1rem;
          padding-top: 3rem;
      
        }
        .hero_title_text.mobile::before{
          content: "";
          background-image: url("/images/apple12.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 1;
          
        }

        .hero_font_adjust_input{
          position: relative;
          width: 100%;
          height: 2rem;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem;
          background-color: var(--clr-neutral-50);
          color: var(--clr-neutral-900);
          font-size: 1rem;
          font-weight: bold;
          text-align: center;
        }
        .hero_font_adjust_input_wrapper{
          position: relative;
          width: 100%;
          flex: 1 1 auto;
          height: 2rem;

        }
        .hero_font_adjust_input_wrapper::after{
          content: attr(data-info);
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%) translateX(-25%);
          color: var(--clr-neutral-500);
          font-size: 0.75rem;
          font-weight: bold;
          text-align: center;

          pointer-events: none;
      
        }
        .hero_section__title{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          max-width: 750px;
        }
        .hero_title_text{
          position: relative;
        }
    
        .section-text-actions{
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .trigger_all-caps{
          border:1px solid var(--clr-neutral-50);
          width: min-content;
          height: min-content;
          cursor: pointer;
          padding: 0.2rem;
          line-height: 0;
          border-radius: 0.5rem;

        }
        .trigger_all-caps > svg{
          

          fill: var(--clr-neutral-150);
        }
        .trigger_all-caps:hover > svg{
          fill: var(--clr-neutral-50);
        }
        .trigger_all-caps.active{
          background-color: var(--clr-neutral-50);
        }
        .trigger_all-caps.active > svg{
          fill: var(--clr-neutral-800);
        }
        .section-text-actions_wrapper{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          width: 100%;
          max-width: 800px;
        }

      }`}</style>
      <div className="hero_section__inner">
        <div className="hero_section__title">
          <h1
            className={`${isButton ? "button" : "hero_title_text"} ${
              isMobile ? "mobile" : constricted ? "constricted" : ""
            }`}
            data-font={`${heroFontSize}px`}
          >
            {heroText}
          </h1>
          <div className="section-text-actions_wrapper">
            <div className="section-text-actions">
              <div
                className="hero_font_adjust_input_wrapper"
                data-info="weight"
              >
                <input
                  className="hero_font_adjust_input"
                  type="text"
                  placeholder="Font weight"
                  value={heroFontWeight}
                  onChange={(e) => setHeroFontWeight(e.target.value)}
                />
              </div>
              <div
                className="hero_font_adjust_input_wrapper"
                data-info="size(px)"
              >
                <input
                  className="hero_font_adjust_input"
                  type="text"
                  placeholder="Font Size"
                  value={heroFontSize}
                  onChange={(e) => setHeroFontSize(e.target.value)}
                />
              </div>
              <div
                className="hero_font_adjust_input_wrapper"
                data-info="spacing(px)"
              >
                <input
                  className="hero_font_adjust_input"
                  type="text"
                  placeholder="Font weight"
                  value={heroLetterSpacing}
                  onChange={(e) => setHeroLetterSpacing(e.target.value)}
                />
              </div>
              <div
                className={`trigger_all-caps ${isMobile ? "active" : ""}`}
                onClick={() => setIsMobile(!isMobile)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path d="M7 23q-.825 0-1.412-.587Q5 21.825 5 21V3q0-.825.588-1.413Q6.175 1 7 1h10q.825 0 1.413.587Q19 2.175 19 3v18q0 .825-.587 1.413Q17.825 23 17 23Zm0-5v3h10v-3Zm5 2.5q.425 0 .713-.288.287-.287.287-.712t-.287-.712Q12.425 18.5 12 18.5t-.712.288Q11 19.075 11 19.5t.288.712q.287.288.712.288ZM7 16h10V6H7ZM7 4h10V3H7Zm0 14v3ZM7 4V3v1Z" />
                </svg>
              </div>
            </div>
            <div className="section-text-actions">
              <div className="hero_font_adjust_input_wrapper" data-info="text">
                <input
                  className="hero_font_adjust_input"
                  type="text"
                  placeholder="Text input"
                  value={heroText}
                  onChange={(e) => setHeroText(e.target.value)}
                />
              </div>
              <div
                className={`trigger_all-caps ${heroAllCaps ? "active" : ""}`}
                onClick={() => setHeroAllCaps(!heroAllCaps)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path d="M7 20V7H2V4h13v3h-5v13Zm9 0v-8h-3V9h9v3h-3v8Z" />
                </svg>
              </div>
              <div
                className={`trigger_all-caps ${!constricted ? "active" : ""}`}
                onClick={() => setConstricted(!constricted)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                  >
                    <path d="M3 19v-2h18v2Zm0-4v-2h18v2Zm0-4V9h18v2Zm0-4V5h18v2Z" />
                  </svg>
                </svg>
              </div>
              <div
                className={`trigger_all-caps ${isButton ? "active" : ""}`}
                onClick={() => setIsButton(!isButton)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path d="M5 22q-1.25 0-2.125-.875T2 19q0-.425.288-.712Q2.575 18 3 18t.713.288Q4 18.575 4 19t.287.712Q4.575 20 5 20q.375 0 .838-.225.462-.225.962-.65.5-.425.988-.962.487-.538.962-1.163.95-1.275 1.6-2.625Q11 13.025 11 12V3q0-.425.288-.713Q11.575 2 12 2t.713.287Q13 2.575 13 3v9q0 1.025.65 2.375T15.25 17q.475.625.962 1.163.488.537.988.962.5.425.963.65.462.225.837.225.425 0 .712-.288Q20 19.425 20 19t.288-.712Q20.575 18 21 18t.712.288Q22 18.575 22 19q0 1.25-.875 2.125T19 22q-.6 0-1.362-.35-.763-.35-1.563-.975-.8-.625-1.587-1.463Q13.7 18.375 13 17.4q-.375-.525-.587-.712Q12.2 16.5 12 16.5q-.2 0-.412.188-.213.187-.588.712-.7.975-1.488 1.812-.787.838-1.587 1.463-.8.625-1.562.975Q5.6 22 5 22Zm.5-3.225L3.25 16.95q-.35-.275-.55-.662-.2-.388-.2-.838 0-.45.175-.85.175-.4.525-.675.25-.2.55-.187.3.012.5.262t.188.562q-.013.313-.263.513-.05.05-.113.15-.062.1-.062.225 0 .1.037.187.038.088.138.163l2.525 2q-.35.325-.65.575-.3.25-.55.4Zm2.65-2.55L4.75 13.5q-.35-.275-.55-.675-.2-.4-.2-.85 0-.45.175-.863.175-.412.525-.687.25-.2.563-.175.312.025.512.275t.175.55q-.025.3-.275.5-.075.05-.125.175-.05.125-.05.25 0 .1.037.188.038.087.138.162L9 15q-.2.325-.412.625-.213.3-.438.6ZM9.875 13 6.25 10.075q-.35-.275-.55-.7-.2-.425-.2-.875 0-.475.2-.875t.55-.7q.225-.2.538-.175.312.025.512.275t.175.55q-.025.3-.275.5-.05.05-.125.175Q7 8.375 7 8.525q0 .05.2.375l2.8 2.275V12q0 .25-.037.5-.038.25-.088.5ZM10 8.35 7.7 6.425q-.35-.275-.525-.663Q7 5.375 7 4.95q0-.8.575-1.375T8.95 3q.4 0 .725.125.325.125.325.625t-.325.625Q9.35 4.5 8.95 4.5q-.2 0-.325.15t-.125.325q0 .1.038.175.037.075.112.125L10 6.4ZM14.125 13q-.05-.25-.087-.5Q14 12.25 14 12v-.825L16.8 8.9q.1-.075.2-.375 0-.15-.075-.275-.075-.125-.125-.175-.25-.2-.275-.5-.025-.3.175-.55.2-.25.513-.275.312-.025.562.175.35.3.537.712.188.413.188.863t-.2.862q-.2.413-.55.688ZM14 8.35V6.4l1.35-1.125q.075-.05.113-.125.037-.075.037-.175 0-.2-.125-.338-.125-.137-.325-.137-.4 0-.725-.125Q14 4.25 14 3.75t.325-.625Q14.65 3 15.05 3q.8 0 1.375.575T17 4.95q0 .425-.175.812-.175.388-.525.663Zm1.85 7.875q-.225-.3-.437-.613-.213-.312-.413-.637l3.3-2.65q.075-.05.175-.375 0-.05-.15-.375-.25-.2-.275-.513-.025-.312.175-.562.2-.25.5-.275.3-.025.55.175.35.275.537.687.188.413.188.863t-.2.862q-.2.413-.55.688Zm2.65 2.55q-.25-.15-.55-.4-.3-.25-.65-.575l2.525-2q.075-.05.175-.35 0-.125-.05-.225t-.1-.15q-.25-.2-.275-.513-.025-.312.175-.562.2-.25.5-.262.3-.013.55.187.35.275.525.675.175.4.175.85 0 .45-.188.838-.187.387-.537.662Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
