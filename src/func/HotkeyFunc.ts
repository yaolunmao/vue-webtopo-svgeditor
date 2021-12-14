import { IComponentInfo, ISvgDataLists, ISvgCanvas, ILeftImgLists, IMouseInfo, ISelectSvg } from "../Model";
/**
 * 组件上移
 * @param svgLists 
 * @param select_svg 
 */
export function moveUp(svgLists: ISvgDataLists[], select_svg: ISelectSvg) {
    svgLists[select_svg.index].svgPositionY -= 1;
}
/**
 * 组件下移
 * @param svgLists 
 * @param select_svg 
 */
export function moveDown(svgLists: ISvgDataLists[], select_svg: ISelectSvg) {
    svgLists[select_svg.index].svgPositionY += 1;
}
/**
 * 组件左移
 * @param svgLists 
 * @param select_svg 
 */
export function moveLeft(svgLists: ISvgDataLists[], select_svg: ISelectSvg) {
    svgLists[select_svg.index].svgPositionX -= 1;
}
/**
 * 组件右移
 * @param svgLists 
 * @param select_svg 
 */
export function moveRight(svgLists: ISvgDataLists[], select_svg: ISelectSvg) {
    svgLists[select_svg.index].svgPositionX += 1;
}
/**
 * 组件复制
 * @param svgLists 
 * @param select_svg 
 */
export function hotkeyCopy(svgLists: ISvgDataLists[], select_svg: ISelectSvg) {
    svgLists.push({
        ...(JSON.parse(JSON.stringify(svgLists[select_svg.index]))),
        id: `${new Date().getTime()}`,
        svgPositionX: svgLists[select_svg.index].svgPositionX + 10,
        svgPositionY: svgLists[select_svg.index].svgPositionY + 10,
        title: svgLists[select_svg.index].title + `-copy`
    })
}
/**
 * 组件删除
 * @param svgLists 
 * @param select_svg 
 */
export function hotkeyDel(svgLists: ISvgDataLists[], select_svg: ISelectSvg) {
    svgLists.splice(select_svg.index, 1);
}
/**
 * 组件置于顶层
 * @param svgLists 
 * @param select_svg 
 */
export function hotkeyPutOnTop(svgLists: ISvgDataLists[], select_svg: ISelectSvg) {
    const temp = svgLists[select_svg.index];
    svgLists.splice(select_svg.index, 1);
    svgLists.push(temp);
    select_svg.index = svgLists.length - 1;
}
/**
 * 组件置于底层
 * @param svgLists 
 * @param select_svg 
 */
export function hotkeyPutOnButtom(svgLists: ISvgDataLists[], select_svg: ISelectSvg) {
    const temp = svgLists[select_svg.index];
    svgLists.splice(select_svg.index, 1);
    svgLists.unshift(temp);
    select_svg.index = 0;
}
/**
 * 组件上移一层
 * @param svgLists 
 * @param select_svg 
 */
export function hotkeyPutOnUp(svgLists: ISvgDataLists[], select_svg: ISelectSvg) {
    if (svgLists.length === 1 || select_svg.index === svgLists.length - 1) {
        return;
    }
    const temp = svgLists[select_svg.index];
    svgLists[select_svg.index] = svgLists[select_svg.index + 1];
    svgLists[select_svg.index + 1] = temp;
    select_svg.index += 1;
}
/**
 * 组件下移一层
 * @param svgLists 
 * @param select_svg 
 */
export function hotkeyPutOnDown(svgLists: ISvgDataLists[], select_svg: ISelectSvg) {
    if (svgLists.length === 1 || select_svg.index === 0) {
        return;
    }
    const temp = svgLists[select_svg.index];
    svgLists[select_svg.index] = svgLists[select_svg.index - 1];
    svgLists[select_svg.index - 1] = temp;
    select_svg.index -= 1;
}