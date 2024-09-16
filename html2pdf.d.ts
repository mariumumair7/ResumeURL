declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: string | number;
        filename?: string;
        image?: { type: string; quality: number };
        html2canvas?: any;
        jsPDF?: any;
        [key: string]: any;
    }

    function html2pdf(element: HTMLElement, options?: Html2PdfOptions): void;

    export = html2pdf;
}
