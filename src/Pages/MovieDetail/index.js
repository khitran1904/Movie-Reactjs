import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetailAction } from "../../Action/Movie";
import "./style.css";
export default function MovieDetail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetailAction(props.match.params.movieId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { movieDetail } = useSelector((state) => {
    return state.movieReducer;
  });
  return (
    <div className="detailMovie">
      {console.log(movieDetail)}
      <div className="detailMovieTop"></div>
      <div>
        <ul className="nav nav-pills mb-3" id="pills-tab">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              href="#pills-home"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              href="#pills-profile"
            >
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              href="#pills-contact"
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            aria-labelledby="pills-home-tab"
          >
            asdasdjlkjA asdasdjlkjA
          </div>
          <div className="tab-pane fade" id="pills-profile">
            emmet23
          </div>
          <div className="tab-pane fade" id="pills-contact">
            emmet23
          </div>
        </div>
      </div>
    </div>
  );
}
