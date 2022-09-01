import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer_main}>
      <div className={styles.container}>
        <div className={styles.row_wrapper}>
          <div className={styles.row_inner}>
            <div className={styles.col_1}>
              <Link href="/">
                <a>
                  <img src="/images/footer-logo.svg" alt="" />
                </a>
              </Link>
              <div className={styles.social_media}>
                <ul>
                  <li>
                    <Link href="https://www.facebook.com/pages/EZTitles-Development-Studio/213557865368609">
                      <a target="_blank">
                        <img src="/images/icons/Facebook.svg" alt="" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://twitter.com/EZTitles">
                      <a target="_blank">
                        <img src="/images/icons/Twitter.svg" alt="" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.youtube.com/channel/UC4tApQNydy-9XaCbZy_9Www">
                      <a target="_blank">
                        <img src="/images/icons/youtube-icon.svg" alt="" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.col_1}>
              <h3>Products</h3>
              <ul className={styles.footer_links}>
                <li>
                  <Link href="/subtitle">
                    <a>EZTitles</a>
                  </Link>
                </li>
                <li>
                  <Link href="/covert">
                    <a>EZConvert</a>
                  </Link>
                </li>
                <li>
                  <Link href="/3d">
                    <a>3DTitles</a>
                  </Link>
                </li>
                <li>
                  <Link href="/plugin">
                    <a>EZTitles Plug-ins</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.col_1}>
              <h3>Downloads</h3>
              <ul className={styles.footer_links}>
                <li>
                  <Link href="/demo">
                    <a>Demos</a>
                  </Link>
                </li>
                <li>
                  <Link href="https://eztitstorage.blob.core.windows.net/eztitles-storage/HardID.exe">
                    <a>Free Trials</a>
                  </Link>
                </li>
                <li>
                  <Link href="/user-guide">
                    <a>User Guides</a>
                  </Link>
                </li>
                <li>
                  <Link href="/video-tutorial">
                    <a>Video Tutorials</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.col_1}>
              <h3>Support</h3>
              <ul className={styles.footer_links}>
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/support">
                    <a>Support</a>
                  </Link>
                </li>
                <li>
                  <Link href="/legal">
                    <a>Legal</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us">
                    <a>Contact Us</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footer_bottom}>
          <div className={styles.footer_bottom_inner}>
            © 2002 - 2022 EZTitles Development Studio
          </div>
          <div className={styles.footer_bottom_inner}>
            <small style={{ color: "#ffffff66" }}>site ver.: 0.1.1</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
