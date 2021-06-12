import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import request from "request-promise-native";

const url = 'http://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar/padrao-tiss-marco-2021'
const urlBase = 'http://www.ans.gov.br';
let linkList: any;

const getWebsiteLinks = async (url: string) => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    $('div.table-responsive').each(function (i, elem) {
     const link = $(elem).find('a').attr('href')
      linkList = (urlBase + link).toString()
    });


  } catch (error) {
    console.error(error)
  }
}
const downloadPDF = async (pdfURL: string, outputFilename: number | fs.PathLike) => {
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
 
 