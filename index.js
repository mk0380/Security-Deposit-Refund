document.addEventListener("DOMContentLoaded", function () {
    const inputFields = document.querySelectorAll('.input-data input');

    inputFields.forEach(input => {
        input.addEventListener('input', function () {
            const label = this.parentNode.querySelector('label');
            if (this.value.trim() !== '') {
                label.classList.add('focused');
            } else {
                label.classList.remove('focused');
            }
        });
    });
});


import { PDFDocument, rgb } from 'https://cdn.skypack.dev/pdf-lib'


const generatePDF = async (year, hallNo, name, rollNO, mobileNo, email, con1, con2, con3, amount1, amount2, bankName, accNo, ifscNo, programme) => {

    const exBytes = await fetch("./Security_Deposit_Refund.pdf").then((res) =>
        res.arrayBuffer()
    );

    const exFont = await fetch("./Sanchez-Regular.ttf").then((res) =>
        res.arrayBuffer()
    );

    const ticFont = await fetch("./DejaVuSans.ttf").then((res) =>
        res.arrayBuffer()
    );


    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);

    const myFont = await pdfDoc.embedFont(exFont)
    const tickFont = await pdfDoc.embedFont(ticFont)

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const font_size = 10;

    firstPage.drawText(year, {
        x: 295,
        y: 564,
        size: font_size+1,
        font: myFont,
        color: rgb(0, 0, 0),
    });

    firstPage.drawText(hallNo, {
        x: hallNo === 'Girls-Hostel-1'.toUpperCase() ? 466 : 475,
        y: hallNo === 'Girls-Hostel-1'.toUpperCase() ? 535 : 546,
        size: font_size,
        font: myFont,
        color: rgb(0, 0, 0),
    });

    firstPage.drawText(name, {
        x: 400,
        y: 298,
        size: font_size,
        font: myFont,
        color: rgb(0, 0, 0),
    });

    firstPage.drawText(rollNO, {
        x: 400,
        y: 281,
        size: font_size+1,
        font: myFont,
        color: rgb(0, 0, 0),
    });

    firstPage.drawText(mobileNo, {
        x: 400,
        y: 263,
        size: font_size+1,
        font: myFont,
        color: rgb(0, 0, 0),
    });

    firstPage.drawText("_", {
        x: programme=="ug"?149:programme=="ug"?167:10000,
        y: programme==" "?10000:572,
        size: 35,
        font: tickFont,
        color: rgb(0, 0, 0),
    });

    firstPage.drawText(email, {
        x: 400,
        y: 246,
        size: font_size,
        font: myFont,
        color: rgb(0, 0, 0),
    });

    if(con1){
        firstPage.drawText("✓", {
            x: 83,
            y: 448,
            size: 35,
            font: tickFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(amount1, {
            x: 265,
            y: 458,
            size: font_size+1,
            font: myFont,
            color: rgb(0, 0, 0),
        });
    }
    if(con2){
        firstPage.drawText("✓", {
            x: 83,
            y: 422,
            size: 35,
            font: tickFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(amount2, {
            x: 239,
            y: 432,
            size: font_size+1,
            font: myFont,
            color: rgb(0, 0, 0),
        });
    }
    if(con3){
        firstPage.drawText("✓", {
            x: 83,
            y: 392,
            size: 35,
            font: tickFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(bankName.toUpperCase(), {
            x: bankName.length<21?111:95,
            y: bankName.length<21?356:342,
            size: font_size+1,
            font: myFont,
            color: rgb(0, 0, 0),
        });

        firstPage.drawText(accNo, {
            x:306,
            y:356,
            size: font_size+1,
            font: myFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(ifscNo, {
            x:456,
            y:356,
            size: font_size+1,
            font: myFont,
            color: rgb(0, 0, 0),
        });
    }




        const pdfBytes = await pdfDoc.save();

        var file = new File(
        [pdfBytes],
        "Security_Deposit_Refund.pdf",
        {
          type: "application/pdf;charset=utf-8",
        }
      );
     saveAs(file);


    // const uri = await pdfDoc.saveAsBase64({ dataUri: true })

    // document.querySelector('#mypdf').src = uri
};

const submitBtn = document.getElementById('btn')

const name = document.querySelector("#studentInput")
const roll = document.querySelector("#rollInput")
const hallNo = document.querySelector("#hallInput")
const email = document.querySelector("#emailInput")
const mobile = document.querySelector("#mobileInput")
const programme = document.querySelector("#programmeInput")
const year = document.querySelector("#yearInput")
const amount1 = document.querySelector("#amt1")
const amount2 = document.querySelector("#amt2")
const bankName = document.querySelector("#bankNameInput")
const accNo = document.querySelector("#accInput")
const ifscCode = document.querySelector("#ifscInput")


const con1 = document.querySelector("#con1")
const con2 = document.querySelector("#con2")
const con3 = document.querySelector("#con3")

submitBtn.addEventListener('click', (ev) => {

    ev.preventDefault()

    if(year.value.length==0 || hallNo.value.length==0 || name.value.length==0 || roll.value.length==0 || mobile.value.length==0 || email.value.length==0 || programme.value.length==0){
        alert("Please fill all the required details before submitting")
        return
    }

    if(!con1.checked && !con2.checked && !con3.checked){
        alert("Please ensure at least one condition is checked regarding how your refund will be handled.")
        return
    }

    if((con1.checked && amount1.value.length==0) || (con2.checked && amount2.value.length==0)){
        alert("Please fill the amount for your selected option")
        return
    }

    if(con3.checked && (bankName.value.length==0 || accNo.value.length==0 || ifscCode.value.length==0)){
        alert("Please fill your bank details")
        return
    }

    generatePDF(year.value, hallNo.value.toUpperCase(), name.value.toUpperCase(), roll.value, mobile.value, email.value, con1.checked, con2.checked, con3.checked, amount1.value, amount2.value, bankName.value.toUpperCase(), accNo.value, ifscCode.value.toUpperCase(), programme.value)
})






