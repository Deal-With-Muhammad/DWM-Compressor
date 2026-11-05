import LegalPage from "../../components/LegalPage";
import { PRIVACY } from "../../lib/legal";
import { SITE_NAME } from "../../lib/seo";

const title = `${PRIVACY.title} | ${SITE_NAME}`;

export const metadata = {
  title: title,
  description: PRIVACY.description,
  alternates: { canonical: PRIVACY.path },
  openGraph: {
    type: "website",
    url: PRIVACY.path,
    siteName: SITE_NAME,
    title,
    description: PRIVACY.description,
    locale: "en_US",
  },
  twitter: { title, description: PRIVACY.description },
};

export default function Page() {
  return <LegalPage doc={PRIVACY} />;
}
