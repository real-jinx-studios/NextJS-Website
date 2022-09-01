import Link from "next/link";
import ProductFeatureBlock from "./product_feature_block";
export default function ProductFeatureSection() {
  const features = [
    {
      isAnimated: false,
      hasDemo: true,
      displayOption: "description-media",
      id: 0,
      description: {
        title: "Subtitling Assistant",
        description: [
          "EZTitles uses the power of AI to create subtitles automatically.\n" +
            "The Assistant recognizes characters' speech and generates\n" +
            "captions in accordance with your criteria.",
          "<strong>Accurate. Secure. Effective.</strong>",
        ],
        actions: [
          { name: "learn more", href: "#", type: "link" },
          { name: "watch demo", href: "", type: "button" },
        ],
      },
      media: {
        image: "/animations/tt.gif",
        video: "/videos/sub_ass_anim.webm",
        alt: "subtitling assistant",
      },
    },
    {
      isAnimated: false,
      hasDemo: true,

      displayOption: "media-description",
      id: 1,
      description: {
        title: "Production scripts import",
        description: [
          "<strong>Import CCSL, CDSL, Dialogue Lists and other tabular formats without effort.</strong>",
          "EZTtitles has a new solution for easy handling of production scripts. Import them through the facilitated form with an option to Auto-detect the columns. You could also identify the columns manually and choose the filter criteria for the imported text to skip the parts that doesn't belong to the subtitles.",
        ],
        actions: [
          { name: "how to use", href: "#", type: "link" },
          { name: "watch demo", href: "", type: "button" },
        ],
      },
      media: {
        image: "/animations/SA animation 20.gif",
        video: "/videos/prod_scripts_anim.webm",
        alt: "Production scripts import alt",
      },
    },
    {
      isAnimated: false,
      displayOption: "description-description",
      id: 3,
      description: {
        title: "Macros",
        description: [
          "Record frequently repeated operations or code-in little\n" +
            "programs which will<strong> save you tons of time.</strong>",
          "Execute them anytime with a quick shortcut.",
        ],
        actions: [
          { name: "watch demo", href: "#", type: "button" },
          { name: "how to use", href: "", type: "link" },
        ],
      },
      media: {
        title: "Backup & Recovery",
        description: [
          "Never lose the work you have put into your projects, no matter the circumstances.",
          "EZTitles has a complete and comprehensive" +
            "<strong> file backup and recovery solution.</strong>",
        ],
        actions: [
          { name: "watch demo", href: "#", type: "button" },
          { name: "how to use", href: "", type: "link" },
        ],
      },
    },
    {
      isAnimated: false,
      displayOption: "description-media",
      id: 4,
      description: {
        title: "Dragon Integration",
        description: [
          "EZTitles now works with Dragon Speech Recognition.",
          "Rest your wrists and<strong> type captions with your voice.</strong> Fix mistakes and execute commands hands-free.",
        ],
        actions: [{ name: "how to use", href: "", type: "link" }],
      },
      media: {
        image: "/animations/SA animation 40.gif",
        video: "/videos/dragon_anim.webm",
        alt: "dragon alt",
      },
    },
    {
      isAnimated: false,
      displayOption: "media-description",
      id: 5,
      description: {
        title: "Split text to subtitles",
        description: [
          "Split any block of text into perfect subtitles which comply with all your requirements.",
        ],
        actions: [
          { name: "learn more", href: "#", type: "link" },
          { name: "how to use", href: "", type: "link" },
        ],
      },
      media: {
        image: "/animations/Split text animation 20.gif",
        video: "/animations/split_text_anim.json",
        alt: "split alt",
      },
    },
    {
      isAnimated: false,
      displayOption: "description-media",
      id: 6,
      description: {
        title: "East Asian Scripts",
        description: [
          "With EZTitles you can input <strong> Vertical text</strong> common\n" +
            "for the Chinese, Japanese and Korean language scripts.\n" +
            "<strong> Horizontal groups, Rubies and Bouten </strong>are also\n" +
            "an easy task for our subtitling software.",
        ],
        actions: [
          { name: "learn more", href: "#", type: "link" },
          { name: "how to use", href: "", type: "link" },
        ],
      },
      media: {
        image: "/animations/Split text animation 40.gif",
        video: "/images/software/eztitles/subassi.png",
        alt: "east asian script alt",
      },
    },
    {
      isAnimated: false,
      displayOption: "media-description",
      id: 7,
      description: {
        title: "Subtitles and Captions Conversion",
        description: [
          "EZTitles is a powerful subtitles and captions conversion tool.\n" +
            "It allows you to convert a single file between different <a href='#'>file formats</a>\n" +
            "and also to perform an accurate <a href='#' class='link-underlined'>Frame Rate and Timecode conversions.</a>\n" +
            "If you do a large scale bulk conversions and look for an automated tool,\n" +
            "then you need <a href='/convert' class='link-underlined'>EZConvert</a>. It’s a separate professional conversion software\n" +
            "that provides an arsenal of automations like Quality Control, Watch Folders,\n" +
            "Workflows and Command Line execution.",
        ],
        actions: [
          { name: "learn more", href: "#", type: "link" },
          { name: "how to use", href: "", type: "link" },
        ],
      },
      media: {
        image: "/images/software/eztitles/subassi.png",
        video: "/images/software/eztitles/subassi.png",
        alt: "conversion alt",
      },
    },
    {
      isAnimated: false,
      displayOption: "description-media",
      id: 8,
      description: {
        title: "Adobe Premiere Compliant",
        description: [
          "You could easily use your professinally created subtitles in Adobe Premiere\n" +
            "without using any plug-ins. EZTitles allows you to export the captions\n" +
            "as images and preview them in Premiere the exact way they were created\n" +
            "in EZTitles. This great feature is part of the EZTitles Ultimate edition.\n" +
            "You cold check and compare the different <a href='#' class='link-underlined'>EZTitles editions here.</a>",
        ],
        actions: [
          { name: "learn more", href: "#", type: "link" },
          { name: "how to use", href: "", type: "link" },
        ],
      },
      media: {
        image: "/images/software/eztitles/subassi.png",
        video: "/images/software/eztitles/subassi.png",
        alt: "premiere alt",
      },
    },
  ];

  const features_jsx = features.map((feature) => {
    return <ProductFeatureBlock feature={feature} />;
  });

  return (
    <section className="product-section flex-center-center-column gap-2">
      <style jsx>{`
        .product-container {
          margin-bottom: 2rem;
        }
        .link-underlined {
          font-size: var(--fs-450);
        }
      `}</style>
      <div className="product-container">{features_jsx}</div>
      <div className="link-container">
        <Link href="/subtitle/features">
          <a className="link-underlined">
            Check more interesting EZTitles features here
          </a>
        </Link>
      </div>
    </section>
  );
}
