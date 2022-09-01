export default function customLog(message = [], type = "log") {
  if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
    console.log(...message);
  }
}
