import LegalPage from "../../components/LegalPage";
import { TERMS } from "../../lib/legal";
import { SITE_NAME } from "../../lib/seo";

const title = `${TERMS.title} | ${SITE_NAME}`;

export const metadata = {
  title: title,
  description: TERMS.description,
  alternates: { canonical: TERMS.path },
  openGraph: {
    type: "website",
    url: TERMS.path,
    siteName: SITE_NAME,
    title,
    description: TERMS.description,
    locale: "en_US",
  },
  twitter: { title, description: TERMS.description },
};

export default function Page() {
  return <LegalPage doc={TERMS} />;
}
