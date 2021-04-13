import React, { useEffect } from 'react'
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAccountInfo } from "../../Action/Account";
import LoadingPage from "../../Components/Loading";

export default function TicketInfo() {
    const { currentUser } = useSelector(state => state.accountReducer)
    // const [UserCurrent, setUserCurrent] = useState(currentUser)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log( currentUser)
        dispatch(getAccountInfo());
        // setUserCurrent(currentUser)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])


    if (currentUser.thongTinDatVe ===  undefined) {
        return <LoadingPage />;
        
    }
    
    return (
        <div className="account my-5 row" >
            <div className="col-3 account__left" >
                <p>TÀI KHOẢN CINEMA</p>
                <ul>
                    <li className=""><Link to="/account">Thông tin chung </Link></li>
                    <li className=""><Link to="/ticketInfo">Lịch sử giao dịch</Link></li>
                </ul>
            </div>
            <div className="account__right col-9" >
                <p className="w-100 title__right" >Thông tin đặt vé</p>
                <table>
                    <tbody>
                        <tr>
                            <th>Tên rạp</th>
                            <th>Tên phim</th>
                            <th>Ngày</th>
                            <th>Phòng chiếu</th>
                            <th>Số ghế</th>
                            <th>Giá vé</th>
                        </tr>
                        {
                            currentUser.thongTinDatVe.map(item => {
                                let temp;
                                let tenGhe ;
                                let tenRap;
                                // eslint-disable-next-line array-callback-return
                                item.danhSachGhe.map(item1 => {
                                    temp=  item1.tenHeThongRap ;
                                    tenGhe = item1.tenGhe;
                                    tenRap = item1.tenRap;
                                });
                                console.log(temp)
                                return (
                                    <tr>
                                        <td>{temp}</td>
                                        <td>{item.tenPhim}</td>
                                        <td>{item.ngayDat}</td>
                                        <td> {tenRap} </td>
                                        <td> {tenGhe} </td>
                                        <td> {item.giaVe } </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}
