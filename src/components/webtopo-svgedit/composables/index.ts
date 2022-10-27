import { useGlobalStore } from '../store/global';
import { calculateRotatedPointCoordinate } from '../utils';

export const useSetPointCoordinate = () => {
  const globalStore = useGlobalStore();
  if (globalStore.handle_svg_info) {
    const item_point = globalStore.handle_svg_info.info;
    globalStore.handle_svg_info.info.point_coordinate = {
      tl: calculateRotatedPointCoordinate(
        item_point.point_coordinate.tl,
        item_point.client,
        -item_point.rotate
      ),
      tc: calculateRotatedPointCoordinate(
        item_point.point_coordinate.tc,
        item_point.client,
        -item_point.rotate
      ),
      tr: calculateRotatedPointCoordinate(
        item_point.point_coordinate.tr,
        item_point.client,
        -item_point.rotate
      ),
      l: calculateRotatedPointCoordinate(
        item_point.point_coordinate.l,
        item_point.client,
        -item_point.rotate
      ),
      r: calculateRotatedPointCoordinate(
        item_point.point_coordinate.r,
        item_point.client,
        -item_point.rotate
      ),
      bl: calculateRotatedPointCoordinate(
        item_point.point_coordinate.bl,
        item_point.client,
        -item_point.rotate
      ),
      bc: calculateRotatedPointCoordinate(
        item_point.point_coordinate.bc,
        item_point.client,
        -item_point.rotate
      ),
      br: calculateRotatedPointCoordinate(
        item_point.point_coordinate.br,
        item_point.client,
        -item_point.rotate
      )
    };
  }
};
