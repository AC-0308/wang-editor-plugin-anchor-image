import { IModuleConf } from '@wangeditor/core'
import withAnchorImage from './plugin'
import { renderAnchorImageConf } from './render-elem'
import { anchorImageToHtmlConf } from './elem-to-html'
import { parseAnchorImgConf, parseDataImgConf, parseOriginImgConf } from './parse-elem-html'
import {
  insertImageMenuConf,
  deleteImageMenuConf,
  editImageMenuConf,
  viewImageLinkMenuConf,
  imageWidth30MenuConf,
  imageWidth50MenuConf,
  imageWidth100MenuConf,
  uploadImageMenuConf,
} from './menu'

const image: Partial<IModuleConf> = {
  renderElems: [renderAnchorImageConf],
  elemsToHtml: [anchorImageToHtmlConf],
  parseElemsHtml: [parseAnchorImgConf, parseDataImgConf, parseOriginImgConf],
  menus: [
    insertImageMenuConf,
    deleteImageMenuConf,
    editImageMenuConf,
    viewImageLinkMenuConf,
    imageWidth30MenuConf,
    imageWidth50MenuConf,
    imageWidth100MenuConf,
    uploadImageMenuConf,
  ],
  editorPlugin: withAnchorImage,
}

export default image
