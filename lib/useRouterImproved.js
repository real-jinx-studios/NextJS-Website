export default function useRouterImproved({ userToken }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
    if (userToken) {
      fetch("/api/rest/WebSite/check-login-token", {
        method: "POST",
        body: JSON.stringify({
          LoginToken: userToken,
        }),
      });
    }
  }, [router.isReady]);

  return {
    isReady,
    router,
  };
}
