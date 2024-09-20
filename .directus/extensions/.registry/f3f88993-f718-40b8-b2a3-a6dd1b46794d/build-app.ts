import 'uno.css'
import interfaceGroupColumn from './src/interface-group-column'
import interfaceGroupSection from './src/interface-group-section'
import interfaceImageUpload from './src/interface-image-upload'
import interfaceInfo from './src/interface-info'
import interfaceMetaTemplate from './src/interface-meta-template'
import interfaceRadioButton from './src/interface-radio-button'
import interfaceSEOAnalyzer from './src/interface-seo-analyzer'
import interfaceSocialPreview from './src/interface-social-preview'
import moduleSEOSettings from './src/module-seo-settings'

const interfaces = [
    interfaceGroupColumn,
    interfaceGroupSection,
    interfaceImageUpload,
    interfaceInfo,
    interfaceMetaTemplate,
    interfaceRadioButton,
    interfaceSEOAnalyzer,
    interfaceSocialPreview
]
const displays = [];
const layouts = [];
const modules = [
    moduleSEOSettings
]
// const modules = [modulePepsiLD, modulePepsiHR];
const panels = [];
const operations = [];

export {displays, interfaces, layouts, modules, operations, panels};
