const puppeteer = require("puppeteer");

async function punchTheClock(time) {
  const browser = await puppeteer.launch({ headless: false });
  const [page] = await browser.pages();
  await page.goto("https://www.dimepkairos.com.br");

  // acessar pagina de pedidos
  await page.type("#LogOnModel_UserName", process.env.DIMEP_KAIROS_USERNAME);
  await page.type("#LogOnModel_Password", process.env.DIMEP_KAIROS_PASSWORD);
  await page.click("#btnFormLogin");
  await page.waitForNavigation();
  await page.click("#UserProfilePedidosJustificativas");
  await page.waitForTimeout(1000);

  // marcar
  await page.click("#ApontID6 .LastSlot input");
  await page.type("#ApontID6 .LastSlot input", time);
  await page.click(
    "#ui-datepicker-div > div.ui-datepicker-buttonpane.ui-widget-content > button.ui-datepicker-close.ui-state-default.ui-priority-primary.ui-corner-all"
  );

  // salvar marcações
  await page.click("#ButtonSalvarApontamentos");
  await page.waitForTimeout(1000);
  await page.select(
    "#HorasJustificar select.JustificativaPontoIndex",
    "Home Office - Contingência"
  );
  await page.click("#SaveHorarios");
  await page.waitForNavigation();

  // finalizar
  await page.waitForTimeout(1000);
  const snapshotElement = await page.$("#SemanaApontamentos > .ContentTable");
  await snapshotElement.screenshot({ path: "tmp/screenshot.png" });
}

module.exports = punchTheClock;
