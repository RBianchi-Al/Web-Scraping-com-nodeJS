const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require("request-promise-native");
// const utf8 = require('utf8')
const url = 'http://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar/padrao-tiss-marco-2021'
const urlBase = 'http://www.ans.gov.br';

const getWebsiteLinks = async (url) => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    $('div.table-responsive').each(function (i, elem) {
      link = $(elem).find('a').attr('href')
      linkList = (urlBase + link).toString()
      // utf8.encode(linkList)      

      // console.log('aquiiiiii   '+ linkList)

    });


  } catch (error) {
    console.error(error)
  }
}
const downloadPDF = async (pdfURL, outputFilename) => {
  let pdfBuffer = await request.get({ uri: pdfURL, encoding: null });
  console.log("Writing downloaded PDF file to " + outputFilename + "...");
  fs.writeFileSync(outputFilename, pdfBuffer);
}


(async () => {
  try {
    await getWebsiteLinks(url)
    await downloadPDF(encodeURI(linkList),  'C:/Users/Usuario/Documents/procSeletivo/somePDF.pdf')
  }catch(err){
   console.log('Error happend while connecting to the DB: ', err.message)
  }
 })()
 
 