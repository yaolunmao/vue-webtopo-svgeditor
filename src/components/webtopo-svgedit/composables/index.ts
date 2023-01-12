import { IDoneJson } from '@/store/global/types';
import { calculateRotatedPointCoordinate } from '@/utils';

export const useSetPointCoordinate = (item: IDoneJson) => {
  item.point_coordinate = {
    tl: calculateRotatedPointCoordinate(item.point_coordinate.tl, item.client, -item.rotate),
    tc: calculateRotatedPointCoordinate(item.point_coordinate.tc, item.client, -item.rotate),
    tr: calculateRotatedPointCoordinate(item.point_coordinate.tr, item.client, -item.rotate),
    l: calculateRotatedPointCoordinate(item.point_coordinate.l, item.client, -item.rotate),
    r: calculateRotatedPointCoordinate(item.point_coordinate.r, item.client, -item.rotate),
    bl: calculateRotatedPointCoordinate(item.point_coordinate.bl, item.client, -item.rotate),
    bc: calculateRotatedPointCoordinate(item.point_coordinate.bc, item.client, -item.rotate),
    br: calculateRotatedPointCoordinate(item.point_coordinate.br, item.client, -item.rotate)
  };
  console.log(item, 1515);
};
