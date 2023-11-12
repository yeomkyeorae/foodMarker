import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import noImage from '../../assets/noImage.jpeg';

interface Props {
  restaurantImgUrls: string[];
  representIx: number;
}

const ImageListBody = ({ restaurantImgUrls, representIx }: Props): React.ReactElement => {
  const sortByRepresentIx = () => {
    const representArray = [restaurantImgUrls[representIx]];
    const exceptRepresentArray = restaurantImgUrls.filter((_, ix) => ix !== representIx);

    return representArray.concat(exceptRepresentArray);
  };

  return (
    <ol style={{ listStyle: 'none', width: '100%', padding: '0px' }}>
      <Row>
        {sortByRepresentIx().map((url: string, index: number) => {
          return (
            <Col key={'modalImage' + index} sm={12} md={12} lg={12} style={{ paddingBottom: '10px' }}>
              <Card style={{ width: '100%', height: '100%' }}>
                <Card.Body style={{ padding: '0px' }}>
                  <div style={{ width: '100%', display: 'flex' }}>
                    <Card.Img
                      className='responsive-image'
                      variant='top'
                      src={url}
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = noImage;
                      }}
                      style={{
                        width: '100%',
                        minHeight: '360px',
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </ol>
  );
};

export default ImageListBody;
