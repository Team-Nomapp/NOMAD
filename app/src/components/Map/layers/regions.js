import { IconLayer } from '@deck.gl/layers';

const ICON_MAPPING = {
  marker: {x: 128, y: 0, width: 128, height: 128, mask: true}
};

export default (show, data, { onHover, onClick }) => {

  return [
    new IconLayer({
      id: 'icon-layer',
      data: show ? data : [],
      billboard: true,
      pickable: true,
      iconAtlas: 'https://deck.gl/images/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
      sizeScale: 10,
      getPosition: d => [
        Number(d.x),
        Number(d.y)
      ],
      getSize: d => 10,
      getColor: d => [145, 213, 255],
      onHover,
      onClick: onClick('region')
    })
  ];
};