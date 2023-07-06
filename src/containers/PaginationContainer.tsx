import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//
import { TextPad } from "../components/TextPad";
import { changeTextData, setTextData } from "../redux/slices/textReducer";

interface Props {
  page: any;
  // allCordinatesData: any;
  allPages: any;
  goToPage: (pageNo: number) => void;
}

export const PaginationContainer: React.FC<Props> = ({
  page,
  allPages,
  // allCordinatesData,
  goToPage,
}) => {
  const dispatch = useDispatch();

  const totalPages = allPages.length;

  //
  const [currentPageNo, setCurrentPageNo] = useState<any>(1);
  const [leftArrowShown, setLeftArrowShown] = useState(currentPageNo > 1);
  const [rightArrowShown, setRightArrowShown] = useState(
    currentPageNo != totalPages
  );

  useEffect(() => {
    page
      .then((data: any) => {
        const { pageIndex } = data;
        setCurrentPageNo(pageIndex + 1);
      })
      .catch((err: any) => {
        console.log(err);
      });

    return () => {};
  }, [page]);

  useEffect(() => {
    if (currentPageNo) {
      goToPage(currentPageNo);

      setLeftArrowShown(currentPageNo > 1);
      setRightArrowShown(currentPageNo != totalPages);
    }

    return () => {};
  }, [currentPageNo]);

  //
  const handleTextChange = (e: any) => {
    try {
      const value = e.target.value;

      var oldValue = currentPageNo;

      if (value == "") {
        setCurrentPageNo("");
        return;
      }

      if (value != 0 && value <= totalPages) {
        setCurrentPageNo(parseInt(value));
      } else {
        setCurrentPageNo(oldValue);
      }

      // dispatch(
      //   changeTextData({
      //     elementIndex: targetElementIndex,
      //     textValue: value,
      //     currentPageNo: currentPageNo,
      //   })
      // );
    } catch (err) {
      console.log(err);
    }
  };
  //
  const handleArrowKeyPress = (e: any) => {
    try {
      const { keyCode } = e;

      if (keyCode == 38) {
        if (currentPageNo < totalPages) {
          setCurrentPageNo(currentPageNo + 1);
        }

        // handle up arrow key
      } else if (keyCode == 40) {
        // handle down arrow key

        if (currentPageNo > 1) {
          setCurrentPageNo(currentPageNo - 1);
        }
      }

      // var oldValue = currentPageNo;

      // if (value != 0 && value <= totalPages) {
      //   setCurrentPageNo(value);
      // } else {
      //   setCurrentPageNo(oldValue);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const navigateController = (type: string) => {
    switch (type) {
      case "back":
        setCurrentPageNo(currentPageNo - 1);
        break;
      case "next":
        setCurrentPageNo(currentPageNo + 1);
        break;
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination-inner-container shadow">
        <div
          className="px-1"
          style={{ cursor: leftArrowShown ? "pointer" : "no-drop" }}
          onClick={() => {
            if (leftArrowShown) {
              navigateController("back");
            }
          }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ color: leftArrowShown ? "white" : "gray" }}
          ></i>
        </div>

        <input
          className="currentpage-shown-container form-control"
          value={currentPageNo}
          onChange={handleTextChange}
          onKeyDown={handleArrowKeyPress}
          max={totalPages}
          min={1}
        />
        <span className="text-light">/</span>
        <span className="text-light">{totalPages}</span>

        <div
          className="px-1"
          style={{ cursor: rightArrowShown ? "pointer" : "no-drop" }}
          onClick={() => {
            if (rightArrowShown) {
              navigateController("next");
            }
          }}
        >
          <i
            className="fa-solid fa-chevron-right"
            style={{ color: rightArrowShown ? "white" : "gray" }}
          ></i>
        </div>
      </div>
    </div>
  );
};
