import ReactDom from 'react-dom'
import React, { useState, useLayoutEffect } from 'react'
import Main1 from './DS1/BaseStructure/Main.jsx'
import Main2 from './DS2/BaseStructure/Main.jsx'
import Main3 from './DS3/BaseStructure/Main.jsx'
import Main4 from './DS4/BaseStructure/Main.jsx'
import GIFsTable from './gifs.jsx'
import SourcesTable from './sources.jsx'
import Teaser from './teaser.jsx'
import './index.css';
import { If } from './BasicElements/BasicElements.jsx';
import { Static, Animated, Immersive, Sources, GIFs, DSs, Abstract } from './BasicElements/Constants.jsx';
import { useBasicStore } from './BasicElements/BasicStore.jsx'
import { useStore } from './DS4/BaseStructure/Store.jsx'

import {Button, Table, TableBody, TableCell, TableContainer, TableRow, TableHead} from '@mui/material';
import { styled } from '@mui/material/styles';

const MyButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 12,
  padding: '4px 6px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
});

const MyCell = styled(TableCell)({
  textAlign: 'center',
  padding: '4px 6px',
});

function Main({props}){
  const [isMain1, setIsMain1] = useState(true);
  const [isMain2, setIsMain2] = useState(false);
  const [isMain3, setIsMain3] = useState(false);
  const [isMain4, setIsMain4] = useState(false);
  const type = useBasicStore((state) => state.type);
  const setType = useBasicStore((state) => state.setType);
  const rightMode = useBasicStore((state) => state.rightMode);
  const setRightMode = useBasicStore((state) => state.setRightMode);

  const initStore = useStore((state) => state.initStore);

  useLayoutEffect(() => {
    document.documentElement.style.backgroundColor = isMain3?"rgb(0, 0, 0)":"rgb(245, 245, 245)";
  }, [])

  function fetchStory(e, ds, cond){
    if(document.getElementById("scroller")){
      document.getElementById("scroller").scrollTo(0, 0);
    }else{
      initStore();
    }
    let mains = [isMain1, isMain2, isMain3, isMain4];
    if(ds==6){
      setRightMode(Abstract)
    }else if(ds==5){
      setRightMode(Sources);
    }else if((mains[ds] && type==cond) || ds==4){
      setRightMode(GIFs);
    }else{
      setRightMode(DSs);
    }
    setIsMain1(ds == 0);
    setIsMain2(ds == 1);
    setIsMain3(ds == 2);
    setIsMain4(ds == 3);
    setType(cond);
    document.documentElement.style.backgroundColor = ds == 2? "rgb(0, 0, 0)" : "rgb(245, 245, 245)";
  }

  return(
    <>
      <div className="sidebar" id="mySidebar">
        <h2> Understanding the Impact of Spatial Immersion in Web Data Stories </h2>
        {/* <p>
          Seon Gyeom Kim, Juhyeong Park, Yutaek Song, Donggun Lee, Yubin Lee, Ryan Rossi, Jane Hoffswell, Eunyee Koh, Tak Yeon Lee
        </p> */}
        <p>
          Authors: Anonymized For Review
        </p>
        <center><MyButton variant={rightMode==Abstract? "contained" : "outlined"} onClick={(e) => fetchStory(e, 6, 0)}>See Abstract</MyButton></center>
        <br/>

        <h3>Literature Review</h3>
        <p>
          For better understanding of We surveyed existing 23 web data stories which evoked spatial immersion.
          Please click the ''Show 23 Data Stories'' button to see list of all data stories and which design techniques were used. <br/>
        </p>
        <center><MyButton variant={rightMode==Sources? "contained" : "outlined"} onClick={(e) => fetchStory(e, 5, 0)}>Show 23 Data Stories</MyButton></center>
        <br/>

        <h3> Data Stories </h3>
        <p>
          We developed four data stories that demonstrate varying design techniques.
        </p>
        <p>
          The <b><i>Static</i></b> condition provides a classic representation of a data story that interleaves basic charts and blocks of text.<br/>
          The <b><i>Animated</i></b> condition has one fixed canvas for the visualizations in the story, with animations for graphic transitions between 2D views.<br/>
          The <b><i>Immersive</i></b> condition is designed using the techniques introduced in Literature Review<br/>
        </p>
        <TableContainer className="table-container">
          <center>
          <Table style={{width: 'fit-content'}} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <MyCell><b>DS</b></MyCell>
                <MyCell align="center">&nbsp;</MyCell>
                <MyCell align="center"><b>Conditions</b></MyCell>
                <MyCell align="center">&nbsp;</MyCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={"0"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
                <MyCell component="th" scope="row"> <b>1</b> </MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain1 && type==Static     ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 0, Static)}>STT</MyButton></MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain1 && type==Animated   ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 0, Animated)}>ANM</MyButton></MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain1 && type==Immersive  ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 0, Immersive)}>IMM</MyButton></MyCell>
              </TableRow>
              <TableRow key={"1"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
                <MyCell component="th" scope="row"> <b>2</b> </MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain2 && type==Static     ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 1, Static)}>STT</MyButton></MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain2 && type==Animated   ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 1, Animated)}>ANM</MyButton></MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain2 && type==Immersive  ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 1, Immersive)}>IMM</MyButton></MyCell>
              </TableRow>
              <TableRow key={"2"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
                <MyCell component="th" scope="row"> <b>3</b> </MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain3 && type==Static     ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 2, Static)}>STT</MyButton></MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain3 && type==Animated   ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 2, Animated)}>ANM</MyButton></MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain3 && type==Immersive  ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 2, Immersive)}>IMM</MyButton></MyCell>
              </TableRow>
              <TableRow key={"3"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
                <MyCell component="th" scope="row"> <b>4</b> </MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain4 && type==Static     ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 3, Static)}>STT</MyButton></MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain4 && type==Animated   ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 3, Animated)}>ANM</MyButton></MyCell>
                <MyCell><MyButton variant={rightMode==DSs && isMain4 && type==Immersive  ? "contained" : "outlined"} onClick={(e) => fetchStory(e, 3, Immersive)}>IMM</MyButton></MyCell>
              </TableRow>
              <TableRow key={"4"} sx={{'&:last-child td, &:last-child th':{border: 0}}}>
                <MyCell component="th" scope="row"> <b>All</b> </MyCell>
                <MyCell colSpan={3}><MyButton variant={rightMode==GIFs? "contained" : "outlined"} onClick={(e) => fetchStory(e, 4, 0)}>All 12 Versions</MyButton></MyCell>
              </TableRow>
            </TableBody>
          </Table>
          </center>
        </TableContainer>
      </div>
      
      <div className="right">
        <If if={rightMode==Abstract}>
          <Teaser />
        </If>
        <If if={rightMode==GIFs}>
          <GIFsTable />
        </If>
        <If if={rightMode==Sources}>
          <SourcesTable />
        </If>
        <If if={rightMode==DSs}>
          <If if={isMain1}>
            <Main1 />
          </If>
          <If if={isMain2}>
            <Main2 />
          </If>
          <If if={isMain3}>
            <Main3 />
          </If>
          <If if={isMain4}>
            <Main4 />
          </If>
        </If>
      </div>
    </>
  )
}

ReactDom.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
)

