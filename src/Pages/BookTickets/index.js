/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetailAction } from "../../Action/Movie";
import { getListSeat } from "../../Action/Seat";
import { bookingTicket } from "../../Action/Booking";

// import Home from "../../Pages/Home";

export default function BookTickets(props) {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const { taiKhoan } = JSON.parse(localStorage.getItem("user"));
  const { movieDetail } = useSelector((state) => {
    return state.movieReducer;
  });
  const { listSeat, thongTinPhim } = useSelector(
    (state) => state.ListSeatReducer
  );
  const { ticket, error } = useSelector((state) => state.BookingTicketsReducer);

  const [listPickedSeat, setListPickedSeat] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    dispatch(getMovieDetailAction(props.match.params.movieId));
    dispatch(getListSeat(props.match.params.calendarID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //     dispatch(getMovieDetailAction(props.match.params.movieId));
  //     dispatch(getListSeat(props.match.params.calendarID))
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ticket]);

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

  const pickSeat = (seat) => {
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
  // const user = localStorage.getItem("user");
  // if (user === null) {
  //     alert("Vui lòng đăng nhập để mua vé !")
  //     return < Home/>;
  // }
  return (
    <div className="">
      <div className="my-4">
        <img className="logo__film" src={movieDetail.hinhAnh} />
        <span className="title__film"> {movieDetail.tenPhim} </span>
      </div>
      <div className="row container-fluid my-4">
        <div className="col-sm-8 screen">
          <img
            className="col-9 d-block"
            src="https://tix.vn/app/assets/img/icons/screen.png"
          />
          <div className="listSeat">
            {listSeat.map((item) => {
              return (
                <button
                  className="col-1 seat__item"
                  id={item.maGhe}
                  disabled={item.daDat}
                  onClick={() => pickSeat(item)}
                >
                  {item.stt}
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
            <span className="movie__score">
              {movieDetail.danhGia} <i className="fa fa-star"></i>
            </span>
            <span className="movie__name ">{movieDetail.tenPhim}</span>
            <span className="info__nameTheater ">{thongTinPhim.tenCumRap}</span>
            <span className="info__nameTheater ">
              {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} -{" "}
              {thongTinPhim.tenRap}
            </span>
          </div>
          <hr />
          <span className="tickets__list">
            {" "}
            Ghế :{" "}
            {listPickedSeat.map((item) => {
              return <span className="ticket__item"> {item.stt}</span>;
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
