import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import LayerTile from 'ol/layer/Tile.js';
import SourceOSM from 'ol/source/OSM.js';
import { useEffect, useRef } from 'react';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { defaults as defaultControls } from 'ol/control.js';
import { Box, Stack, Typography } from '@mui/material';

const LocationPicker = ({ location = { lon: 0, lat: 0 }, disabled = false, subtitle }) => {
  const mapRef = useRef();

  useEffect(() => {
    const defaultCenter = fromLonLat([95.7129, 37.0902]); // USA Default Center
    const initialCenter = location.lon && location.lat ? fromLonLat([location.lon, location.lat]) : defaultCenter;
    const zoom = 1;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new LayerTile({
          source: new SourceOSM({
            attributions: [
              '© <a href="https://geocode.maps.co/">Map data contributors</a>.',
              '© OpenStreetMap contributors.',
            ],
          }),
        }),
      ],
      controls: defaultControls({
        attribution: false,
        rotate: false,
        attributionOptions: { collapsed: true, collapsible: false },
      }),
      view: new View({
        center: initialCenter,
        zoom,
      }),
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
    });

    map.addLayer(vectorLayer);
    addMarkers(map, vectorLayer, location);
    return () => {
      map.setTarget(null);
    };
  }, [location]);

  if (disabled) {
    return null;
  }
  return (
    <Stack
      sx={{
        height: { xs: '10vh', sm: '10vh' },
        width: { xs: '100%', sm: '15vh' },
      }}
    >
      <Typography variant="caption">{subtitle}</Typography>
      <Box sx={{ height: 'inherit', width: 'inherit', boxShadow: 1, borderRadius: 2 }}>
        <Box sx={{ height: '100%', width: '100%' }} ref={mapRef} />
      </Box>
    </Stack>
  );
};

/**
 * Add markers to the vector layer and center the map view.
 *
 * @param {Object} map The OpenLayers map instance
 * @param {Object} vectorLayer The OpenLayers vector layer to add markers to
 * @param {Object} location The location to add a marker for
 */
const addMarkers = (map, vectorLayer, location) => {
  const { lon, lat } = location;
  if (lon && lat) {
    const geometry = new Point(fromLonLat([lon, lat]));
    const feature = new Feature({
      geometry,
      notesInfo: location,
    });

    const markerStyle = new Style({
      image: new Icon({
        src: '/blueLocation.svg',
        scale: 0.4,
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        crossOrigin: 'anonymous',
      }),
    });

    feature.setStyle(markerStyle);
    vectorLayer.getSource().addFeature(feature);
    map.getView().setCenter(fromLonLat([lon, lat]));
    map.getView().setZoom(10);
  }
};

export default LocationPicker;
