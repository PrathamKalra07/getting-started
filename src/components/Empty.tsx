import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";

interface Props {
  loading: boolean;
}
export const Empty: React.FC<Props> = ({ loading }) => (
  <Segment
    data-testid="empty-container"
    placeholder
    loading={loading}
    style={{ height: "80vh" }}
  >
    <Header icon>
      <Icon name="file pdf outline" />
      <br />
      Fetching Data Please Wait...!
    </Header>
  </Segment>
);
