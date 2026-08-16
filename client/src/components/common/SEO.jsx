import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image }) => (
  <Helmet>
    <title>{title} | શ્રી મહેંદી</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={`${title} | શ્રી મહેંદી`} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={image} />}
    <meta property="og:type" content="website" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
  </Helmet>
);

export default SEO;
