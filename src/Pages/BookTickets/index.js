/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetailAction } from "../../Action/Movie";
// import Home from "../../Pages/Home";


export default function BookTickets(props) {
    
    // eslint-disable-next-line no-unused-vars
    const [listSeat, setListSeat] = useState([{seatID:"A1",price:70000,isChoose:false,isSelected:false},{seatID:"A2",price:70000,isChoose:false,isSelected:false},
    {seatID:"A3",price:70000,isChoose:false,isSelected:false},{seatID:"A4",price:70000,isChoose:false,isSelected:false},{seatID:"A5",price:70000,isChoose:false,isSelected:false},
    {seatID:"A6",price:70000,isChoose:false,isSelected:false},{seatID:"A7",price:70000,isChoose:false,isSelected:false},{seatID:"A8",price:70000,isChoose:false,isSelected:false},
    {seatID:"A9",price:70000,isChoose:false,isSelected:false},{seatID:"A10",price:70000,isChoose:false,isSelected:false},{seatID:"A11",price:70000,isChoose:false,isSelected:false},
    {seatID:"B1",price:70000,isChoose:false,isSelected:false},{seatID:"B2",price:70000,isChoose:false,isSelected:false},{seatID:"B3",price:70000,isChoose:false,isSelected:false},
    {seatID:"B4",price:70000,isChoose:false,isSelected:false},{seatID:"B5",price:70000,isChoose:false,isSelected:false},{seatID:"B6",price:70000,isChoose:false,isSelected:false},
    {seatID:"B7",price:70000,isChoose:false,isSelected:false},{seatID:"B8",price:70000,isChoose:false,isSelected:false},{seatID:"B8",price:70000,isChoose:false,isSelected:false},
    {seatID:"B10",price:70000,isChoose:false,isSelected:false},{seatID:"B11",price:70000,isChoose:false,isSelected:false},
    {seatID:"C1",price:70000,isChoose:false,isSelected:false},{seatID:"C2",price:70000,isChoose:false,isSelected:false},{seatID:"C3",price:70000,isChoose:false,isSelected:false},
    {seatID:"C4",price:70000,isChoose:false,isSelected:false},{seatID:"C5",price:70000,isChoose:false,isSelected:false},{seatID:"C6",price:70000,isChoose:false,isSelected:false},
    {seatID:"C7",price:70000,isChoose:false,isSelected:false},{seatID:"C8",price:70000,isChoose:false,isSelected:false},{seatID:"C9",price:70000,isChoose:false,isSelected:false},
    {seatID:"C10",price:70000,isChoose:false,isSelected:false},{seatID:"C11",price:70000,isChoose:false,isSelected:false},
    {seatID:"D1",price:70000,isChoose:false,isSelected:false},{seatID:"D2",price:70000,isChoose:false,isSelected:false},{seatID:"D3",price:70000,isChoose:false,isSelected:false},
    {seatID:"D4",price:70000,isChoose:false,isSelected:false},{seatID:"D5",price:70000,isChoose:false,isSelected:false},{seatID:"D6",price:70000,isChoose:false,isSelected:false},
    {seatID:"D7",price:70000,isChoose:false,isSelected:false},{seatID:"D8",price:70000,isChoose:false,isSelected:false},{seatID:"D9",price:70000,isChoose:false,isSelected:false},
    {seatID:"D10",price:70000,isChoose:false,isSelected:false},{seatID:"D11",price:70000,isChoose:false,isSelected:false},
    {seatID:"E1",price:70000,isChoose:false,isSelected:false},{seatID:"E2",price:70000,isChoose:false,isSelected:false},{seatID:"E3",price:70000,isChoose:false,isSelected:false},
    {seatID:"E4",price:70000,isChoose:false,isSelected:false},{seatID:"E5",price:70000,isChoose:false,isSelected:false},{seatID:"E6",price:70000,isChoose:false,isSelected:false},
    {seatID:"E7",price:70000,isChoose:false,isSelected:false},{seatID:"E8",price:70000,isChoose:false,isSelected:false},{seatID:"E9",price:70000,isChoose:false,isSelected:false},
    {seatID:"E10",price:70000,isChoose:false,isSelected:false},{seatID:"E11",price:70000,isChoose:false,isSelected:false},
    {seatID:"F1",price:70000,isChoose:false,isSelected:false},{seatID:"F2",price:70000,isChoose:false,isSelected:false},{seatID:"F3",price:70000,isChoose:false,isSelected:false},
    {seatID:"F4",price:70000,isChoose:false,isSelected:false},{seatID:"F5",price:70000,isChoose:false,isSelected:false},{seatID:"F6",price:70000,isChoose:false,isSelected:false},
    {seatID:"F7",price:70000,isChoose:false,isSelected:false},{seatID:"F8",price:70000,isChoose:false,isSelected:false},{seatID:"F9",price:70000,isChoose:false,isSelected:false},
    {seatID:"F10",price:70000,isChoose:false,isSelected:false},{seatID:"F11",price:70000,isChoose:false,isSelected:false},
    {seatID:"H1",price:70000,isChoose:false,isSelected:false},{seatID:"H2",price:70000,isChoose:false,isSelected:false},{seatID:"H3",price:70000,isChoose:false,isSelected:false},
    {seatID:"H4",price:70000,isChoose:false,isSelected:false},{seatID:"H5",price:70000,isChoose:false,isSelected:false},{seatID:"H6",price:70000,isChoose:false,isSelected:false},
    {seatID:"H7",price:70000,isChoose:false,isSelected:false},{seatID:"H8",price:70000,isChoose:false,isSelected:false},{seatID:"H9",price:70000,isChoose:false,isSelected:false},
    {seatID:"H10",price:70000,isChoose:false,isSelected:false},{seatID:"H11",price:70000,isChoose:false,isSelected:false},
    {seatID:"G1",price:70000,isChoose:false,isSelected:false},{seatID:"G2",price:70000,isChoose:false,isSelected:false},{seatID:"G3",price:70000,isChoose:false,isSelected:false},
    {seatID:"G4",price:70000,isChoose:false,isSelected:false},{seatID:"G5",price:70000,isChoose:false,isSelected:false},{seatID:"G6",price:70000,isChoose:false,isSelected:false},
    {seatID:"G7",price:70000,isChoose:false,isSelected:false},{seatID:"G8",price:70000,isChoose:false,isSelected:false},{seatID:"G9",price:70000,isChoose:false,isSelected:false},
    {seatID:"G10",price:70000,isChoose:false,isSelected:false},{seatID:"G11",price:70000,isChoose:false,isSelected:false},
    {seatID:"M1",price:70000,isChoose:false,isSelected:false},{seatID:"M2",price:70000,isChoose:false,isSelected:false},{seatID:"M3",price:70000,isChoose:false,isSelected:false},
    {seatID:"M4",price:70000,isChoose:false,isSelected:false},{seatID:"M5",price:70000,isChoose:false,isSelected:false},{seatID:"M6",price:70000,isChoose:false,isSelected:false},
    {seatID:"M7",price:70000,isChoose:false,isSelected:false},{seatID:"M8",price:70000,isChoose:false,isSelected:false},{seatID:"M9",price:70000,isChoose:false,isSelected:false},
    {seatID:"M10",price:70000,isChoose:false,isSelected:false},{seatID:"M11",price:70000,isChoose:false,isSelected:false},])

    const dispatch = useDispatch();

    const { movieDetail } = useSelector((state) => {
        return state.movieReducer;
    });
    // const {calendarID} = props.match.params;

    useEffect(() => {
        dispatch(getMovieDetailAction(props.match.params.movieId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const user = localStorage.getItem("user");
    // if (user === null) {
    //     alert("Vui lòng đăng nhập để mua vé !")
    //     return < Home/>;
    // }

    const pickSeat = (seatID) =>{
        // eslint-disable-next-line array-callback-return
        listSeat.map(item =>{
            if(item.seatID === seatID)
            {
                item.isSelected=!item.isSelected
            }
        })
    }

    return (
        <div >
            <div className="my-5" >
                <img className="logo__film" src={movieDetail.hinhAnh} />
                <span className="title__film" > {movieDetail.tenPhim} </span>
            </div>
            <div className="col-sm-8 screen" >
                <img className="col-9 d-block" src="https://tix.vn/app/assets/img/icons/screen.png" />
                <div className="listSeat" >
                {
                    listSeat.map((item)=>{
                        return(
                            <button className="col-1 seat__item" disabled={item.isChoose} onClick={()=> pickSeat(item.seatID) } >{ item.seatID }</button>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}
