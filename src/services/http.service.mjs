import axios from 'axios';
import https from 'https';

async function searchProductsByKeyword(keyword) {
  if (!keyword) {
    return '';
  }
  const res = await axios.get(`${process.env.BASE_URL}/products`, {
    params: {
      q: keyword,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
  const productRes = res.data.products.map((product) => ({
    title: product.title,
    images: product.images,
  }));
  return JSON.stringify(productRes);
}

export default searchProductsByKeyword;
