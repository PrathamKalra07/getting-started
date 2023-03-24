import React, { useEffect, useState } from "react";
import { SignaturePad } from "../components/SignaturePad";

interface Props {
  page: any;
  addDrawing: any;
  signatureData: any;
  isFetchingCordinatesData: any;
  allCordinatesData: any;
}

export const SignatureContainer: React.FC<Props> = ({
  page,
  addDrawing,
  signatureData,
  isFetchingCordinatesData,
  allCordinatesData,
}) => {
  const [currentPageNo, setCurrentPageNo] = useState(0);
  // const [signatureCoordinates, setSignatureCoordinates] = useState([
  //   // {
  //   //   x: 73.4,
  //   //   y: 593.4,
  //   //   height: 40,
  //   //   width: 160,
  //   //   pageNo: 0,
  //   // },
  //   // {
  //   //   x: 233.89999999999998,
  //   //   y: 450.4,
  //   //   height: 40,
  //   //   width: 160,
  //   //   pageNo: 0,
  //   // },
  //   // ###############
  //   // {
  //   //   x: 100,
  //   //   y: 580,
  //   //   height: 50,
  //   //   width: 110,
  //   //   pageNo: 0,
  //   // },
  //   // {
  //   //   x: 350,
  //   //   y: 580,
  //   //   height: 50,
  //   //   width: 110,
  //   //   pageNo: 0,
  //   // },
  //   // {
  //   //   x: 100,
  //   //   y: 350,
  //   //   height: 50,
  //   //   width: 110,
  //   //   pageNo: 1,
  //   // },
  //   // {
  //   //   x: 100,
  //   //   y: 580,
  //   //   height: 50,
  //   //   width: 110,
  //   //   pageNo: 1,
  //   // },
  // ]);

  useEffect(() => {
    page
      .then((data: any) => {
        const { pageIndex } = data;
        setCurrentPageNo(pageIndex);
      })
      .catch((err: any) => {
        console.log(err);
      });
    return () => {};
  }, [page]);

  useEffect(() => {
    var signatureDataPagesWise: any = {};
    allCordinatesData.map((item: any) => {
      if (!signatureDataPagesWise[item.pageNo]) {
        signatureDataPagesWise[item.pageNo] = [];
      }

      signatureDataPagesWise[item.pageNo] = [
        ...signatureDataPagesWise[item.pageNo],
        item,
      ];
    });

    localStorage.setItem(
      "signatureDataPagesWise",
      JSON.stringify(signatureDataPagesWise)
    );

    return () => {};
  }, [isFetchingCordinatesData]);

  return (
    <>
      {allCordinatesData.map((item: any, i: number) => {
        if (item.pageNo == currentPageNo) {
          return (
            <SignaturePad
              key={i}
              {...item}
              addDrawing={addDrawing}
              signatureData={signatureData}
            />
          );
        }
        return null;
      })}
    </>
  );
};
