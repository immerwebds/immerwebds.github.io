import { useBasicStore } from './BasicElements/BasicStore.jsx';
import {Table, TableBody, TableCell, TableContainer, TableRow, TableHead} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const MyCell = styled(TableCell)({
  // textAlign: 'left',
  fontSize: '9pt',
  padding: '4px 6px',
});

function SourcesTable({props}){
  const isGIFs = useBasicStore((state) => state.isGIFs);

  return(
    <div className="sourcesTable">
      <TableContainer style={{width: 'fit-content'}}>
        <Table  aria-label="a dense table">
          {
            // <caption>
            // &nbsp; DT1. 3D environment & camera movement. <br/>
            // &nbsp; DT2. Intuitive mapping for phenomenon & representation. <br/>
            // &nbsp; DT3. Smoothly(naturally) moving elements. <br/>
            // &nbsp; DT4. Direct manipulation of camera and visualization. <br/>
            // &nbsp; DT5. Realistic Appearance. <br/>
            // &nbsp; DT6. Dynamic dimensionality. <br/>
            // </caption>
          }
          <TableHead>
            <TableRow>
              <MyCell align="left" width={40}>Index</MyCell>
              <MyCell align="left" width={180}>Author(s)</MyCell>
              <MyCell align="left" width={50}>Year</MyCell>
              <MyCell align="left" width={300}>Link</MyCell>
              <MyCell align="center" width={120}>DT1<br/><img style={{margin: '6px'}} src="imgs/DT1.jpg" width="120" /></MyCell>
              <MyCell align="center" width={120}>DT2<br/><img style={{margin: '6px'}} src="imgs/DT2.jpg" width="120" /></MyCell>
              <MyCell align="center" width={120}>DT3<br/><img style={{margin: '6px'}} src="imgs/DT3.jpg" width="120" /></MyCell>
              <MyCell align="center" width={120}>DT4<br/><img style={{margin: '6px'}} src="imgs/DT4.jpg" width="120" /></MyCell>
              <MyCell align="center" width={120}>DT5<br/><img style={{margin: '6px'}} src="imgs/DT5.jpg" width="120" /></MyCell>
              <MyCell align="center" width={270}>DT6<br/><img style={{margin: '6px'}} src="imgs/DT6.jpg" width="213" /></MyCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={"0"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> </MyCell>
              <MyCell></MyCell>
              <MyCell></MyCell>
              <MyCell></MyCell>
              <MyCell colspan={6} style={{fontSize: "7pt"}}>
                &nbsp; DT1. 3D environment & camera movement. <br/>
                &nbsp; DT2. Intuitive mapping for phenomenon & representation. <br/>
                &nbsp; DT3. Smoothly(naturally) moving elements. <br/>
                &nbsp; DT4. Direct manipulation of camera and visualization. <br/>
                &nbsp; DT5. Realistic Appearance. <br/>
                &nbsp; DT6. Dynamic dimensionality. <br/>
              </MyCell>
            </TableRow>
            <TableRow key={"1"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>1</b> </MyCell>
              <MyCell>Pearce, A.</MyCell>
              <MyCell>(2018).</MyCell>
              <MyCell><a target="_blank" href="https://www.nytimes.com/interactive/2018/05/09/nyregion/subway-crisis-mta-decisions-signals-rules.html">How 2 M.T.A. Decisions Pushed the Subway Into Crisis. <i>The New York Times.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"2"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>2</b> </MyCell>
              <MyCell>Collins, K., Diamant, N., Eavis, P., Fleisher, O., Haag, M., Harvey, B., Huang, L., Patanjali, K., Peyton, M., & Taylor, R.</MyCell>
              <MyCell>(2021).</MyCell>
              <MyCell><a target="_blank" href="https://www.nytimes.com/interactive/2021/09/15/nyregion/empire-state-building-reopening-new-york.html">Why the Empire State Building, and New York, May Never Be the Same. <i>The New York Times.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"3"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>3</b> </MyCell>
              <MyCell>Accurat.</MyCell>
              <MyCell>(2018).</MyCell>
              <MyCell><a target="_blank" href="https://buildinghop.es"><i>Google Building Hopes.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"4"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>4</b> </MyCell>
              <MyCell>Conlen, M.</MyCell>
              <MyCell>(2017).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2017/10/satellites">Seeing Earth from Outer Space. <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"5"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>5</b> </MyCell>
              <MyCell>Daniels, M.</MyCell>
              <MyCell>(2018).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2018/12/3d-cities-story">Population Mountains. <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"6"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>6</b> </MyCell>
              <MyCell>Aisch, G., & Cox, A.</MyCell>
              <MyCell>(2015).</MyCell>
              <MyCell><a target="_blank" href="https://www.nytimes.com/interactive/2015/03/19/upshot/3d-yield-curve-economic-growth.html">A 3-D View of a Chart That Predicts The Economic Future: The Yield Curve. <i>The New York Times.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"7"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>7</b> </MyCell>
              <MyCell>Serkez, Y.</MyCell>
              <MyCell>(2021).</MyCell>
              <MyCell><a target="_blank" href="https://www.nytimes.com/interactive/2021/01/28/opinion/climate-change-risks-by-country.html">Every Country Has Its Own Climate Risks. What’s Yours? <i>The New York Times.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"8"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>8</b> </MyCell>
              <MyCell>Daniels, M.</MyCell>
              <MyCell>(2018).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2018/10/city_3d">Human Terrain. <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"9"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>9</b> </MyCell>
              <MyCell>Blinderman, I., & Thomas, A.</MyCell>
              <MyCell>(2018).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2018/03/neighborhoods">A Tale of Two Cities. <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"10"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>10</b> </MyCell>
              <MyCell>Fountain, H., Migliozzi, B., & Popovich, N.</MyCell>
              <MyCell>(2021).</MyCell>
              <MyCell><a target="_blank" href="https://www.nytimes.com/interactive/2021/01/14/climate/hottest-year-2020-global-map.html">Where 2020's Record Heat Was Felt the Most. <i>The New York Times.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"11"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>11</b> </MyCell>
              <MyCell>Parshina-Kottas, Y., Singhvi, A., Burch, A., Griggs, T., Gröndahl, M., Huang, L., Wallace, T., White, J., & Williams, J.</MyCell>
              <MyCell>(2021).</MyCell>
              <MyCell><a target="_blank" href="https://www.nytimes.com/interactive/2021/05/24/us/tulsa-race-massacre.html">What The Tulsa Race Massacre Destroyed. <i>The New York Times.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"12"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>12</b> </MyCell>
              <MyCell>Leahy, I., & Serkez, Y.</MyCell>
              <MyCell>(2021).</MyCell>
              <MyCell><a target="_blank" href="https://www.nytimes.com/interactive/2021/06/30/opinion/environmental-inequity-trees-critical-infrastructure.html">Since When Have Trees Existed Only for Rich Americans? <i>The New York Times.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"13"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>13</b> </MyCell>
              <MyCell>D'souza, D.</MyCell>
              <MyCell>(2018).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2018/07/women-in-congress">We mapped out the road to gender parity in the House of Representatives <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"14"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>14</b> </MyCell>
              <MyCell>Samora, R., & Daniels, M.</MyCell>
              <MyCell>(2018).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2018/02/stand-up">Structure of Stand Up Comedy. <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"15"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>15</b> </MyCell>
              <MyCell>(n.d.).</MyCell>
              <MyCell>(n.d.).</MyCell>
              <MyCell><a target="_blank" href="https://datanibbl.es/tracing-kpop-wave">Tracing the K-POP WAVE. </a></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"16"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>16</b> </MyCell>
              <MyCell>Samora, R., & Kopf, D.</MyCell>
              <MyCell>(2017).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2017/01/making-it-big">The Unlikely Odds of Making It Big. <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"17"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>17</b> </MyCell>
              <MyCell>Lash, N.</MyCell>
              <MyCell>(2021).</MyCell>
              <MyCell><a target="_blank" href="https://www.nytimes.com/interactive/2021/03/10/opinion/covid-vaccine-lines-states.html">Who’s Next in Your State’s Vaccine Line? <i>The New York Times.</i></a></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"18"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>18</b> </MyCell>
              <MyCell>Buchanan, L., Kessel, J.M., Rhyne, E., Throop, N., Ward, J., & White, J.</MyCell>
              <MyCell>(2021).</MyCell>
              <MyCell><a target="_blank" href="https://www.nytimes.com/interactive/2021/07/30/sports/olympics/olympic-running.html">How Speed and Distance Dictate How Olympians Run. <i>The New York Times.</i></a></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"19"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>19</b> </MyCell>
              <MyCell>McGill, A., & Goldenberg, R.</MyCell>
              <MyCell>(2017).</MyCell>
              <MyCell><a target="_blank" href="https://www.theatlantic.com/theplatinumpatients">The Platinum Patients. <i>The Atlantic.</i></a></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"20"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>20</b> </MyCell>
              <MyCell>Samora, R.</MyCell>
              <MyCell>(2017).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2017/04/beer">Craft beer — so hot right now. But what city is the microbrew capital of the US? <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"21"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>21</b> </MyCell>
              <MyCell>Mishkin, P., Samora, R., & Diehm, J.</MyCell>
              <MyCell>(2021).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2021/03/love-and-ai">Nothing Breaks Like A.I. Heart. <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"22"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>22</b> </MyCell>
              <MyCell>Daniels, M.</MyCell>
              <MyCell>(2017).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2017/03/punk">Crowdsourcing the Definition of "Punk". <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
            </TableRow>
            <TableRow key={"23"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
              <MyCell component="th" scope="row"> <b>23</b> </MyCell>
              <MyCell>Dworkin, J., & Blinderman, I.</MyCell>
              <MyCell>(2018).</MyCell>
              <MyCell><a target="_blank" href="https://pudding.cool/2018/08/retraining">Why the tech sector may not solve America’s looming automation crisis. <i>The Pudding.</i></a></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CloseIcon color="disabled" fontSize="small"/></MyCell>
              <MyCell align="center"><CheckIcon fontSize="small"/></MyCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default SourcesTable;
