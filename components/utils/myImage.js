import Image from "next/image";

const myLoader = ({ src, width, quality }) => {
  return `https://master.d2174uzsw3epqk.amplifyapp.com${src}?w=${width}&q=${
    quality || 75
  }`;
};

const MyImage = (props) => {
  return (
    <Image
      priority={props.priority || false}
      // loader={myLoader}
      src={props.src || ""}
      alt={props.alt || ""}
      width={props.width}
      height={props.height}
      layout={props.layout || "responsive"}
    />
  );
};
export default MyImage;
