/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListSeat } from "../../Action/Seat";
import { bookingTicket } from "../../Action/Booking";
import LoadingPage from "../../Components/Loading";
import "./style.css";

export default function BookTickets(props) {
  const dispatch = useDispatch();
  const { taiKhoan } = JSON.parse(localStorage.getItem("user"));
  const { listSeat, movieInfo, loading } = useSelector(
    (state) => state.ListSeatReducer
  );
  const { ticket, error } = useSelector((state) => state.BookingTicketsReducer);

  const [listSeatState, setListSeatState] = useState(listSeat);

  const [listPickedSeat, setListPickedSeat] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // dispatch(getMovieDetailAction(props.match.params.movieId));
    dispatch(getListSeat(props.match.params.calendarID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getListSeat(props.match.params.calendarID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pickUp = (callback) => {
    if (listPickedSeat.length === 0) {
      alert("Vui lòng chọn vé !");
    } else {
      let values = {
        maLichChieu: props.match.params.calendarID,
        danhSachVe: listPickedSeat,
        taiKhoanNguoiDung: taiKhoan,
      };
      dispatch(bookingTicket(values));
      callback();
    }
  };

  const handleSelectSeat = (seat) => {
    // let removeObj = null;

    // listPickedSeat.every((seat) => {
    //   if (selectedSeat.maGhe === seat.maGhe) {
    //     removeObj = seat;

    //     return false;
    //   } else return true;
    // });
    // let obj = listPickedSeat.filter((seat, index) => {
    //   return seat.maGhe !== removeObj?.maGhe;
    // });
    // console.log(obj);

    // if (removeObj) {
    //   return (document.getElementById(removeObj.maGhe).style.backgroundColor =
    //     "rgb(27, 30, 34)");
    // }
    // document.getElementById(selectedSeat.maGhe).style.backgroundColor = "red";
    // setListPickedSeat([...listPickedSeat, selectedSeat]);
    // console.log(removeObj);
    // listPickedSeat.every((seat, index) => {
    //   if (seat.maGhe === selectedSeat.maGhe) {
    //     listPickedSeat.splice(index, 1);
    //     setListPickedSeat(listPickedSeat);
    //     document.getElementById(selectedSeat.maGhe).style.backgroundColor =
    //       "rgb(27, 30, 34)";
    //     return false;
    //   } else return true;
    // });

    // let listPickedSeatTemp = [...listPickedSeat, selectedSeat];
    // setListPickedSeat(listPickedSeatTemp);
    // document.getElementById(selectedSeat.maGhe).style.backgroundColor = "red";
    for (let i in listPickedSeat) {
      if (listPickedSeat[i].stt === seat.stt) {
        listPickedSeat.splice(i, 1);
        setListPickedSeat(listPickedSeat);
        let temp1 = price - seat.giaVe;
        setPrice(temp1);
        document.getElementById(seat.maGhe).style.backgroundColor =
          "rgb(27, 30, 34)";
        return;
      }
    }
    const b = [...listPickedSeat, seat];
    setListPickedSeat(b);
    let temp2 = price + seat.giaVe;
    setPrice(temp2);
    document.getElementById(seat.maGhe).style.backgroundColor = "red";
  };

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="">
      {console.log(listPickedSeat)}
      <div className="my-4">
        <img className="logo__film" src={movieInfo.hinhAnh} />
        <span className="title__film"> {movieInfo.tenPhim} </span>
      </div>
      <div className="row container-fluid my-4">
        <div className="col-sm-8 screen">
          <img
            className="col-9 d-block"
            src="https://tix.vn/app/assets/img/icons/screen.png"
          />
          <div className="listSeat">
            {listSeat.map((seat) => {
              return (
                <button
                  className="col-1 seat__item"
                  key={seat.maGhe}
                  id={seat.maGhe}
                  disabled={seat.daDat}
                  onClick={() => {
                    handleSelectSeat(seat);
                  }}
                >
                  {seat.stt}
                </button>
              );
            })}
          </div>
          <div className="my-2 " style={{ marginLeft: "10%" }}>
            <span style={{ float: "left" }}>Ghế đã được mua </span>
            <div className="isSelected__seat "></div>
            <span style={{ float: "left", marginLeft: "20px" }}>
              Ghế có thể mua{" "}
            </span>
            <div className="empty__seat "></div>
            <span style={{ float: "left", marginLeft: "20px" }}>
              Ghế đang chọn{" "}
            </span>
            <div className="isChoose__seat "></div>
          </div>
        </div>
        <div className="col-sm-3 center">
          <div className="tickets__price">{price}</div>
          <hr />
          <div className="mx-2 ">
            <span className="movie__name ">{movieInfo.tenPhim}</span>
            <span className="info__nameTheater ">{movieInfo.tenCumRap}</span>
            <span className="info__nameTheater ">
              {movieInfo.ngayChieu} - {movieInfo.gioChieu} - {movieInfo.tenRap}
            </span>
          </div>
          <hr />
          <span className="tickets__list">
            {" "}
            Ghế :{" "}
            {listPickedSeat.map((item) => {
              return (
                <span key={item.maGhe} className="ticket__item">
                  {" "}
                  {item.stt}
                </span>
              );
            })}
          </span>
          <button
            className="Datve"
            onClick={() =>
              pickUp(() => {
                console.log("ưqe");
              })
            }
          >
            Đặt Vé
          </button>
        </div>
      </div>
    </div>
  );
}
