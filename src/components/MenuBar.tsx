import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";

interface Props {
  uploadNewPdf: () => void;
  addText: () => void;
  addImage: () => void;
  addDrawing: () => void;
  isPdfLoaded: boolean;
  savingPdfStatus: boolean;
  savePdf: () => void;
}

const whiteText = { color: "white" };

export const MenuBar: React.FC<Props> = ({
  uploadNewPdf,
  addDrawing,
  addText,
  addImage,
  isPdfLoaded,
  savingPdfStatus,
  savePdf,
}) => (
  <Menu
    pointing
    style={{
      backgroundColor: "#005CB9",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      borderRadius: 0,
      zIndex: 5,
    }}
  >
    <Menu.Item header style={whiteText}>
      Select The Sign Field To Create And Add Your Signature
    </Menu.Item>
    <Menu.Menu position="right">
      {isPdfLoaded && (
        <>
          <Menu.Item
            data-testid="save-menu-item"
            name={savingPdfStatus ? "Submiting..." : "Submit"}
            disabled={savingPdfStatus}
            onClick={savePdf}
            className="submit-btn"
          />
        </>
      )}
    </Menu.Menu>
  </Menu>
);
