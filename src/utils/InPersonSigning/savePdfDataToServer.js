import axios from "axios";

const generateData = (tempState) => {
    console.log('@@@ tempState: '+ JSON.stringify(tempState));
    const { inPersonCoordinatesList } = tempState;
    let coordinatesData = inPersonCoordinatesList.allCoordinateData;
    const signatoryList = inPersonCoordinatesList.signatoryList;
    coordinatesData = coordinatesData.map((coordData) => {
        if (coordData.fieldType === "Signature") {  
            const matchingSignatory = signatoryList.find(
                (signatory) => signatory.signatoryUUID === coordData.signatoryUUID
            );
                
            console.log('@@@ matchingSignatory: '+ JSON.stringify(matchingSignatory));
            if (matchingSignatory) {
                return {
                    eleId: coordData.eleId,
                    value: matchingSignatory.value,
                };
            }
        }
        return coordData;
    });

    console.log('@@@ coordinatesData: '+ JSON.stringify(coordinatesData));
    return coordinatesData;
}

const savePdfDataToServer = async (tempState, tiUUID) => {
    try {
        
            const coordinatesData = generateData(tempState);
        
            const bodyContent = {
                tiUUID: tiUUID,
                allElementsData: coordinatesData
            };
            console.log('@@@ bodyContent: '+ JSON.stringify(bodyContent));
            const { data } = await axios.request({
                url: `${process.env.REACT_APP_API_URL}/api/common/documents/inPersonSigning/saveSignatures`,
                method: "PATCH",
                data: bodyContent,
            });
        
            const thankYouContainer = document.getElementById("thankyou-container");
            thankYouContainer.innerHTML = `<div
            style="
            position: fixed;
            z-index: 5;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #F4EDE4;
            display:flex;
            justify-content:center;
            "
        >
            <div
            style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                width: 90vw;
                flex-direction: column;
            "
            >
        
                <div class="w-100 d-flex justify-content-center">
                <svg height="100" width="100" viewBox="-2 -2 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2" y="-2" width="24.00" height="24.00" rx="12" fill="#354259" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 5L8 15l-5-4"></path> </g></svg>
                </div>
        
            <span class="my-5">
            
            <h4 class="text-center"><b>Congratulations! you have successfully completed the signature</b></h4>
            
            <h6 class="text-center text-secondary mt-4 text-justify" > We are one step closer to finalizing the document. Please wait for the remaining signatories to complete their signatures.<br/><br/> The final singed pdf will be emailed to you once all signers have finished signing the document. </h6>
        
            <!-- <h6 class="text-center mt-4">For More Information About EwSign  <a target="_blank" href="https://www.eruditeworks.com/ewsign/">Click Here</a> </h6>-->
            </span>
            </div>
        </div>`;
        localStorage.clear();
    } catch (error) {
        console.log("Failed to save PDF.");
        const thankYouContainer = document.getElementById("thankyou-container");
        thankYouContainer.innerHTML = "";
        alert("Something Want Wrong Try Again");
        console.log(error);
    }
}



export { savePdfDataToServer };