// Lấy đối tượng button-download
var downloadBtn = document.getElementById("download-btn");

// // Đăng ký sự kiện click cho button-download
// downloadBtn.addEventListener("click", function () {
//     console.log("clicked download");
//     // Lấy nội dung HTML của phần tử có id là invoice-container
//     var invoiceHTML = document.getElementById("invoice-container").innerHTML;

//     // Tạo đối tượng html2pdf và cấu hình
//     var opt = {
//         margin: 20,
//         filename: 'invoice.pdf',
//         image: { type: 'jpeg', quality: 1 },
//         html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
//         jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
//     };

//     // Sử dụng thư viện html2pdf để tạo tệp PDF từ nội dung HTML và CSS
//     html2pdf().from(invoiceHTML).set(opt).save();
// });

function downloadPDF() {
    const invoice = document.querySelector('.invoice-container');
    var opt = {
        margin: 1,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(invoice).save();
}
document.getElementById('download-btn').addEventListener('click', downloadPDF);
