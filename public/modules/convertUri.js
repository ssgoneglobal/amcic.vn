import Url from 'url-parse';
import queryString from 'query-string';
function covert(uploadUrl){
  const url = uploadUrl
  const uri = new Url(url)
  const query = queryString.parse(uri.query)

  return query
}
export default covert
