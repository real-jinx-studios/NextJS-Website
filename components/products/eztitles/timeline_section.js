
import { useState, useRef, useEffect } from "react";

export default function TimelineSection() {
  const [trigger, setTrigger] = useState(false);
  const isOriginalAnimation = false;
  const timelineWrapperRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const imageWrapperRef = useRef(null);

  //make intersection observer for timeline
  useEffect(() => {
    imageWrapperRef.current.classList.add("hidden");
    canvasWrapperRef.current.classList.add("hidden");
    const appearOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px 0px 0px",
    };

    const appearOnScroll = new IntersectionObserver(
      (entries, appearOnScroll) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            console.log("not intersecting");
          } else {
            console.log("intersecting");
            imageWrapperRef.current.classList.remove("hidden");
            canvasWrapperRef.current.classList.remove("hidden");
            setTrigger(true);

            // appearOnScroll.unobserve(entry.target);
          }
        }, appearOptions);
      }
    );

    appearOnScroll.observe(timelineWrapperRef.current);
  }, []);

  return (

      <section className="section section-full-width">
        <style jsx>{`
          .marker {
            /*    transform: translateY(50px);
            opacity: 0;*/
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid var(--clr-primary);
          }
          .section-heading {
            text-align: center;
          }
          .one {
            left: 8%;
            top: 29%;
          }
          .two {
            left: 22%;
            top: 35%;
          }
          .three {
            left: 34%;
            top: 51%;
          }
          .four {
            left: 58%;
            top: 68%;
          }
          .five {
            left: 80%;
            top: 30%;
          }
          .timeline {
            position: relative;
            width: 100%;

            height: 500px;
            overflow: hidden;
          }
          .timeline-wrapper-outer {
            position: relative;
            width: inherit;
            height: inherit;
            overflow-x: scroll;
            overflow-y: hidden;
          }
          .timeline-wrapper {
            position: absolute;
            left: 0;
            min-width: 1902px;
            height: 500px;
            user-select: none;
            pointer-events: none;
            transition: all 0.5s var(--cubic-bezier);
          }
          .timeline-wrapper.hidden {
            opacity: 0;
            transform: translateY(100%);
          }
          .canvas-wrapper {
            position: relative;
            opacity: 1;
            z-index: 3;
            width: 100%;
            height: 100%;
            top: 0;
            transition: all 0.5s 0.4s cubic-bezier(0.4, 0, 0.3, 1.25);
          }
          .canvas-wrapper.hidden {
            opacity: 0;
            top: 500px;
          }
          .timeline-inner {
            position: relative;
            width: 100%;
            height: 100%;
          }
          .timeline-image {
            position: relative;
          }
          .timeline-image img {
            position: relative;

            object-fit: initial !important;

            max-width: 100% !important;

            display: block !important;
            width: 100% !important;
            height: 300px !important;
            opacity: 1;
            top: 0;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.3, 1.25);
          }
          .timeline-image img.hidden {
            opacity: 0;
            top: 300px;
          }
        `}</style>

       
       
          <div className="timeline trigger" ref={timelineWrapperRef}>
            <h2 className="section-heading">A Proper Timeline</h2>
            <div className="timeline-wrapper-outer">
              <div className="timeline-wrapper">
                <div className="timeline-inner">
                  <div className="timeline-image" style={{ paddingTop: 25 }}>
                    <div className="canvas-wrapper" ref={canvasWrapperRef}>
                      {" "}
                      <Canvas trigger={trigger} />{" "}
                    </div>
                    <img
                      src="/images/software/eztitles/timeline.png"
                      width="100%"
                      height={250}
                      ref={imageWrapperRef}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
    
      </section>

  );
}

function Canvas({ trigger }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const [canvas, setCanvas] = useState(null);
  //  const [ctx, setCtx] = useState(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setCanvas(canvas);
    draw(ctx, canvas);
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  let offset = 0;
  let offset2 = 0;
  let offset3 = 800;
  let offset4 = 800;
  let offset5 = 800;
  let offset6 = 800;
  //function to draw on canvas
  function draw(context, canvas) {
    //check if canvas or context is undefined
    if (context === null || canvas === null) {
      return;
    }
    //set canvas width and height
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    if (offset > 0) {
      offset -= 25;
    }
    if (offset2 > 0) {
      offset2 -= 20;
    }

    const ctx = context;
    //setup canvas styles
    const radius = 25;
    ctx.font = "16px Arial";
    ctx.strokeStyle = "#288ee2";
    ctx.fillStyle = "#fefefe";
    ctx.lineWidth = 2;
    ctx.scale(1, 1);
    //start drawing first marker
    ctx.beginPath();
    ctx.fillText("Audio graph and subtitles track", 127, 345 + offset);
    ctx.moveTo(120, 350 + offset);
    ctx.lineTo(380, 350 + offset);
    ctx.lineTo(300, 130 + offset);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(292, 107 + offset, radius, 0, Math.PI * 2, true);

    ctx.stroke();
    //end drawing first marker
    //start drawing second marker
    ctx.beginPath();
    ctx.fillText("Snapping warnings", 397, 375 + offset2);
    ctx.moveTo(390, 380 + offset2);
    ctx.lineTo(555, 380 + offset2);
    ctx.lineTo(535, 50 + offset2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(535, radius + offset2, radius, 0, Math.PI * 2, true);
    ctx.stroke();
    //end drawing second marker
    //start drawing third marker
    ctx.beginPath();
    ctx.fillText("Video track", 700, 368);
    ctx.moveTo(760, 270);
    ctx.lineTo(675, 375);
    ctx.lineTo(788, 375);

    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      760 + radius / 1.8,
      270 - radius * 0.84,
      radius,
      0,
      Math.PI * 2,
      true
    );
    ctx.stroke();
    //end drawing third marker
    //start drawing fourth marker
    ctx.beginPath();
    ctx.fillText("Shot changes", 880, 350);
    ctx.moveTo(875, 358);
    ctx.lineTo(998, 358);
    ctx.lineTo(981, 89);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(980, 65, radius, 0, Math.PI * 2, true);
    ctx.stroke();
    //end drawing fourth marker
    //start drawing fifth marker
    ctx.beginPath();
    ctx.fillText("Secondary subtitles track", 1150, 380);
    ctx.moveTo(1145, 388);
    ctx.lineTo(1355, 388);
    ctx.lineTo(1190, 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(1179, 77, radius, 0, Math.PI * 2, true);
    ctx.stroke();
    //end drawing fifth marker
    //start drawing sixth marker
    ctx.beginPath();
    ctx.fillText("Distance to a shot change", 1490, 359);
    ctx.moveTo(1405, 50);
    ctx.lineTo(1476, 367);
    ctx.lineTo(1692, 367);

    ctx.stroke();
    ctx.beginPath();
    ctx.arc(1400, 25, radius, 0, Math.PI * 2, true);
    ctx.stroke();
    //end drawing sixth marker
  }

  function animate() {
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (ctx === null || canvas === null) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw(ctx, canvas);
      animationRef.current = requestAnimationFrame(animate);
    }
  }

  return (
    <>
      <style jsx>{`
        .canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 1902px;
          height: 500px;
          z-index: 15;
          /*outline: 2px solid var(--clr-warn-opacity-50) !important;*/
        }
      `}</style>
      <canvas ref={canvasRef} className="canvas" />
    </>
  );
}
