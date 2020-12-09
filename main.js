const isValidElement = element => {
    return element.id && element.value;
};

const isValidValue = element => {
    return (!['checkbox', 'radio'].includes(element.type) || element.checked);
};

const isCheckbox = element => element.type === 'checkbox';

const isMultiSelect = element => element.options && element.multiple;

const getSelectValues = options => [].reduce.call(options, (values, option) => {
    return option.selected ? values.concat(option.value) : values;
}, []);

const formToJSON = elements => [].reduce.call(elements, (data, element) => {

    if (isValidElement(element) && isValidValue(element)) {
        if (isCheckbox(element)) {
            data[element.id] = (data[element.id] || []).concat(element.value);
        } else if (isMultiSelect(element)) {
            data[element.id] = getSelectValues(element);
        } else {
            data[element.id] = element.value;
        }
    }

    return data;
}, {});

const handleFormSubmit = event => {

    event.preventDefault();

    const data = formToJSON(form.elements);

    console.log(data)
    console.log('stringify', JSON.stringify(data, null, "  "));

    let allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
    allEntries.push({...data, id: allEntries.length + 1});
    localStorage.setItem("allEntries", JSON.stringify(allEntries));
    updateTable()
};

const cutName = name => {
    let nameArr = name.split(" ");
    return `${nameArr[0]} ${nameArr[1][0]}. ${nameArr[2][0]}.`;
}

const updateTable = () => {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    let allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
    console.log(allEntries)
    allEntries.forEach(item => generateRow(item))
}

const generateRow = item => {
    let row = `
             <tr>
                <th scope="row">${item.id}</th>
                <td>${cutName(item.firstUser)}</td>
                <td>м. ${item.firstUserCity}, ${item.firstUserStreet}, буд. ${item.firstUserBuilding}, кв. ${item.firstUserApt}</td>
                <td>${cutName(item.secondUser)}</td>
                <td>м. ${item.secondUserCity}, ${item.secondUserStreet}, буд. ${item.secondUserBuilding}, кв. ${item.secondUserApt}</td>
                <td>${item.carBrand}, ${item.carYear}, ${item.carNumber}</td>
                <td>
                    <button class="btn btn-outline-secondary" onclick="generateDocument(${item.id})">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-printer" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 2H5a1 1 0 0 0-1 1v2H3V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h-1V3a1 1 0 0 0-1-1zm3 4H2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v1H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z"></path>
                            <path fill-rule="evenodd"
                                  d="M11 9H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM5 8a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5z"></path>
                            <path d="M3 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
                        </svg>
                    </button>
                </td>
            </tr>
    `;
    let tbody = document.getElementById("tbody");
    tbody.innerHTML += row;
}

const generateDocument = id => {
    let allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
    let item = allEntries.find(item => item.id === id);
    let generated = `<div class="article">
<p class="MsoTitle" style="text-align: center; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="font-size: 14pt; font-weight: normal;"><span style="font-family: Times New Roman CYR;"><span style="color: #000000;">ДОВІРЕНІСТЬ</span></span></span></p>
<p class="MsoTitle" style="text-align: center; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="font-size: 14pt; font-weight: normal;"><span style="font-family: Times New Roman CYR;"><span style="color: #000000;">НА РОЗПОРЯДЖЕННЯ ТРАНСПОРТНИМ ЗАСОБОМ</span></span></span></p>
<p class="MsoTitle" style="text-align: center; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="font-size: 14pt; font-weight: normal; mso-ansi-language: RU;" lang="RU"><span style="font-family: Times New Roman CYR; color: #000000;">&nbsp;</span></span></p>
<p class="MsoTitle" style="text-align: center; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><em style="mso-bidi-font-style: normal;"><span style="font-size: 14pt;"><strong><span style="font-family: Times New Roman CYR;"><span style="color: #000000;">Д О В І Р Е Н І С Т Ь</span></span></strong></span></em></p>
<p class="MsoNormal" style="text-align: center; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;" align="center"><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';"><span style="color: #000000;">&nbsp;</span></span></p>
<p class="MsoNormal" style="text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><em style="mso-bidi-font-style: normal;"><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';"><span style="color: #000000;"><span style="mso-spacerun: yes;">&nbsp;&nbsp; </span>Місто ${item.cityCreated}, ${item.dateCreated}.<strong style="mso-bidi-font-weight: normal;"> </strong></span></span></em></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;"><span style="color: #000000;">Я, <strong style="mso-bidi-font-weight: normal;">${item.firstUser}</strong>,<strong style="mso-bidi-font-weight: normal;"> </strong>проживаю в м.${item.firstUserCity}, ${item.firstUserStreet}, буд. ${item.firstUserBuilding}, кв. ${item.firstUserApt}, реєстраційний номер облікової картки платника податків ${item.firstUserTaxNumber}, діючи добровільно і перебуваючи при здоровому розумі та ясній пам’яті, розуміючи значення своїх дій, ознайомлена з вимогами чинного законодавства щодо недійсності правочинів, уповноважую</span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman; color: #000000;">${item.secondUser}</span></span></strong><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;"><span style="color: #000000;">, який(а) проживає в м. ${item.secondUserCity}, <br>${item.secondUserStreet}, буд. ${item.secondUserBuilding}, кв. ${item.secondUserApt}, </span></span></span><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';"><span style="color: #000000;">представляти мої інтереси з питань</span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="color: #000000;"><strong style="mso-bidi-font-weight: normal;"><em style="mso-bidi-font-style: normal;"><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';">ВОЛОДІННЯ, КОРИСТУВАННЯ, ЕКСПЛУАТАЦІЇ ТА РОЗПОРЯДЖЕННЯ</span></em></strong><em style="mso-bidi-font-style: normal;"><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';"> <strong style="mso-bidi-font-weight: normal;">(з правом здійснення продажу, міни, передачі в заставу, в тому числі як майновим поручителем, надання в оренду тощо)</strong></span></em><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';"> належним мені автомобілем марки </span><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-bidi-font-family: 'Times New Roman';" lang="EN-US">${item.carBrand}</span><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';" lang="EN-US"> </span><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-bidi-font-family: 'Times New Roman';" lang="EN-US">NOTE</span><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';">, тип транспортного засобу – ${item.carType}, ${item.carYear} року випуску, номер шасі (кузова, рами) ${item.carBodyNumber}, pеєстраційний номер ${item.carNumber}, зареєстрованим в ${item.carAuthWhere} ${item.carAuthYear} року (свідоцтво про реєстрацію транспортного засобу ${item.carNumber}, видане в ${item.carAuthWhere} ${item.carAuthYear} року).</span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;"><span style="color: #000000;">Для чого уповноваженим представникам надається право: </span></span></span></strong></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">керувати вищевказаним автомобілем;</span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">підписувати та подавати від мого імені заяви, в тому числі заяви про належність майна на праві особистої приватної власності тощо; </span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">подавати та отримувати необхідні довідки та документи, отримати реєстраційний номер автомобіля в разі необхідності (номерні знаки);</span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">зняти автомобіль з обліку, поставити його на облік в органах Державної автомобільної інспекції; якщо в тому буде потреба, отримати транзитні номери;</span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">підписувати відповідні договори, правочини, отримувати за укладеними договорами, правочинами грошові кошти та/або майнові цінності;</span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">визначати на свій розсуд місце стоянки автомобіля;</span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">проходити державний технічний огляд автомобіля; </span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">представляти мої інтереси в усіх установах, підприємствах, організаціях будь-якої організаційно-правової форми та форми власності, перед усіма фізичними і юридичними особами, в тому числі в органах Державної автомобільної інспекції, на станціях технічного обслуговування та ремонту, страхових компаніях тощо з питання укладення договору страхування автомобіля, страхування цивільної відповідальності третіх осіб, отримати поліс обов’язкового страхування цивільної відповідальності тощо, отримання страхового відшкодування, з питання технічного обслуговування, ремонту автомобіля;</span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">здійснювати переобладнання автомобіля, проводити заміну деталей автомобіля, зміну типу автомобіля, моделі автомобіля, кольору кузова, заміну двигуна, кузова та інших деталей;</span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;"><span style="mso-spacerun: yes;">&nbsp;</span>укладати договори про відшкодування заподіяної автотранспорту шкоди; </span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">сплачувати державне мито, податки та інші збори, пов’язані з користуванням та розпорядженням вищевказаним автомобілем;</span></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm; mso-list: l0 level1 lfo1;"><span style="color: #000000;"><span style="font-family: Symbol; font-size: 14pt; mso-ansi-language: UK; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;"><span style="mso-list: Ignore;">-<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman;">бути моїм представником і вести справи в судових органах усіх інстанцій, з питання захисту моїх прав та інтересів, з правом вчинення усіх процесуальних дій, наданих мені чинним законодавством, а також виконувати всі дії, пов’язані з виконанням цієї довіреності.</span></span></span></p>
<p class="MsoBodyText" style="text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><strong style="mso-bidi-font-weight: normal;"><em style="mso-bidi-font-style: normal;"><span style="font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; font-size: 14pt;"><span style="color: #000000;">&nbsp;</span></span></em></strong></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="font-size: x-small;"><span style="color: #000000;"><em style="mso-bidi-font-style: normal;"><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';">Довіритель заявляє, що не має жодних обмежень за будь-якими зобов’язаннями щодо права надання у володіння, користування та розпорядження третім особам вищезазначеного автомобіля.</span></em><em style="mso-bidi-font-style: normal;"></em></span></span></p>
<p class="MsoBodyText" style="text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><strong style="mso-bidi-font-weight: normal;"><em style="mso-bidi-font-style: normal;"><span style="font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; font-size: 14pt;"><span style="color: #000000;">&nbsp;</span></span></em></strong></p>
<p class="MsoBodyText" style="text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="color: #000000;"><strong style="mso-bidi-font-weight: normal;"><em style="mso-bidi-font-style: normal;"><span style="font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; font-size: 14pt;">Нотаріусом роз’яснено зміст статей 237 – 241, 247-250 Цивільного кодексу України, </span></em></strong><span style="font-family: Times New Roman CYR;"><strong style="mso-bidi-font-weight: normal;"><em style="mso-bidi-font-style: normal;"><span style="font-size: 14pt;">статей 60-65 Сімейного кодексу України, ст. 44 Цивільного процесуального кодексу України.</span></em></strong><strong style="mso-bidi-font-weight: normal;"><em style="mso-bidi-font-style: normal;"></em></strong></span></span></p>
<p class="MsoBodyText" style="text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><strong style="mso-bidi-font-weight: normal;"><em style="mso-bidi-font-style: normal;"><span style="font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; font-size: 14pt;"><span style="color: #000000;">Кожен з уповноважених представників за цією довіреністю має право діяти і виконувати надані йому повноваження самостійно.</span></span></em></strong></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="font-family: Times New Roman;"><span style="color: #000000;"><strong style="mso-bidi-font-weight: normal;"><em style="mso-bidi-font-style: normal;"><span style="font-size: 14pt; mso-ansi-language: UK;">Довіреність видана без права передоручення, з правом виїзду за кордон, строком на ${item.documentTerm} і дійсна до</span></em></strong><strong style="mso-bidi-font-weight: normal;"><em style="mso-bidi-font-style: normal;"><span style="font-size: 14pt; mso-ansi-language: RU;" lang="RU"> ${item.expiresAt}.</span></em></strong><strong style="mso-bidi-font-weight: normal;"><em style="mso-bidi-font-style: normal;"></em></strong></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman; color: #000000;">&nbsp;</span></span></strong></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><em style="mso-bidi-font-style: normal;"><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';"><span style="font-size: x-small;"><span style="color: #000000;">Довіритель свідчить, що дана довіреність видається ним відповідно до його вільного волевиявлення, що відповідає його внутрішній волі, без будь – якого застосування фізичного чи психічного тиску і не носить характеру фіктивного або удаваного правочину.</span></span></span></em></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';"><span style="color: #000000; font-size: x-small;">&nbsp;</span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';"><span style="color: #000000;">ПІДПИС: <em style="mso-bidi-font-style: normal;"><span style="text-decoration: underline;">ПІДПИС (${cutName(item.firstUser)})</span></em></span></span></p>
<p class="MsoNormal" style="text-align: justify; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;"><span style="font-family: &quot;Times New Roman CYR&quot;,&quot;serif&quot;; font-size: 14pt; mso-ansi-language: UK; mso-bidi-font-family: 'Times New Roman';"><span style="color: #000000;">&nbsp;</span></span></p>
<p class="MsoNormal" style="text-align: center; text-indent: 1cm; margin: 0cm 5.5pt 0pt 0cm;" align="center"><span style="color: #000000;"><span style="font-family: Times New Roman;"><span style="font-size: 14pt; mso-ansi-language: UK;">ПОСВІДЧУВАЛЬНИЙ НАПИС НОТАРІУСА</span></span></span></p>
<p class="MsoNormal" style="margin: 0cm -0.05pt 0pt 0cm;"><span style="font-size: 14pt; mso-ansi-language: UK;"><span style="font-family: Times New Roman; color: #000000;">&nbsp;</span></span></p>
</div>`;
    let result = document.getElementById('result');
    document.getElementById('main').style.display = "none";
    result.innerHTML = generated;
    window.print();
    document.getElementById('main').style.display = "block";
    result.innerHTML = "";
}

const form = document.getElementsByClassName('car-form')[0];
console.log('form', form)
form.addEventListener('submit', handleFormSubmit);
updateTable();