declare module 'react-table';
declare module 'react-apexcharts';
declare module 'react-facebook-login/dist/facebook-login-render-props';
declare module 'lodash';
declare module '@ckeditor/ckeditor5-react';
declare module '@ckeditor/ckeditor5-build-classic';
declare module 'file-saver';
declare module 'react-html-parser';
declare module 'dompurify';
declare module '@tinymce/tinymce-react';
declare module 'pdfmake/build/pdfmake';
declare module 'html2pdf.js';
declare module 'react-to-print' {
  import { ComponentType, ReactInstance } from 'react';

  interface PrintProps {
    trigger: () => React.ReactElement;
    content: () => ReactInstance | null;
    onBeforePrint?: () => void | Promise<void>;
    onAfterPrint?: () => void;
    pageStyle?: string;
    bodyClass?: string;
    copyStyles?: boolean;
    removeAfterPrint?: boolean;
  }

  const ReactToPrint: ComponentType<PrintProps>;

  export default ReactToPrint;
}

import jsPDF from "jspdf";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}